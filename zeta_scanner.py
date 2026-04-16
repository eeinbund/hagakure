#!/usr/bin/env python3
"""
zeta_scanner.py  —  Hagakure ζ-Field Weather Market Scanner
============================================================
Runs as an async background process. Every SCAN_INTERVAL seconds it:

  1. Fetches live Kalshi weather markets (top by 24h volume)
  2. Pulls candlestick history for each market
  3. Applies FFT-based spectral analysis in logit-probability space:
       z(t) = logit(p(t))        — map probabilities to the real line
       Z(ω) = FFT(z(t))          — spectral decomposition (the ζ-field)
       Ẑ(ω) = top-K components   — dominant periodicity
       ẑ(t) = IFFT(Ẑ(ω))        — reconstructed signal
       p̂    = logistic(ẑ[-1])   — spectral fair value at t=now
  4. Compares current market price against the spectral fair value
  5. Detects regime shifts via high-frequency power spikes (analogue of
     zeros of the Riemann ζ-function marking phase transitions)
  6. Fires a macOS notification + prints to terminal when a discrepancy
     or regime shift is detected

No Kalshi auth required — reads public market data only.

Usage
-----
    pip install httpx numpy
    python zeta_scanner.py

Tune the constants below to adjust sensitivity.
"""

import asyncio
import subprocess
import time
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

import httpx
import numpy as np

# ── Configuration ──────────────────────────────────────────────────────────────

KALSHI_BASE       = "https://api.elections.kalshi.com/trade-api/v2"

SCAN_INTERVAL     = 120    # seconds between full scans
ALERT_THRESHOLD   = 0.07   # |market − ζ-fair| in cents (0–1 scale) to notify
REGIME_THRESHOLD  = 0.55   # high-freq power fraction that flags a regime shift
TOP_N_MARKETS     = 20     # how many markets to analyse per cycle (by 24h vol)
MIN_CANDLES       = 16     # minimum candles required for a reliable FFT
TOP_K_COMPONENTS  = 5      # dominant spectral components used for reconstruction
CANDLE_MINUTES    = 60     # Kalshi candlestick period (minutes)
HISTORY_HOURS     = 24     # hours of history to pull per market

# Weather series tickers (same set watched by the Hagakure site)
WEATHER_SERIES = [
    "KXHIGHNY",  "KXHIGHLA",  "KXHIGHCHI", "KXHIGHSF",
    "KXHIGHPHX", "KXHIGHATL", "KXHIGHBOS", "KXHIGHLV",
    "KXHIGHSEA",
    "KXLOWNYC",  "KXLOWSF",   "KXLOWSEA",  "KXLOWDAL",
    "KXLOWDC",   "KXLOWMIN",  "KXLOWDEN",  "KXLOWATL",
    "KXLOWNO",   "KXLOWLV",
    "KXRAINHOU", "KXRAINNYC", "KXRAINDEN",
    "KXSNOWNYC", "KXSNOWCHI",
]


# ── Data types ─────────────────────────────────────────────────────────────────

@dataclass
class SpectralResult:
    ticker: str
    title: str
    series: str
    current_price: float          # live mid-market probability (0–1)
    spectral_fair_value: float    # ζ-field reconstruction of fair value
    discrepancy: float            # current_price − spectral_fair_value
    dominant_periods_h: list      # hours per dominant spectral cycle
    regime_shift: bool            # True if high-freq power spike detected
    regime_ratio: float           # fraction of spectral power in high freq
    n_candles: int


# ── Math helpers ───────────────────────────────────────────────────────────────

def logit(p: np.ndarray) -> np.ndarray:
    """Map probabilities → real line (inverse sigmoid)."""
    p = np.clip(p, 1e-9, 1 - 1e-9)
    return np.log(p / (1 - p))


def logistic(z: np.ndarray) -> np.ndarray:
    """Map real line → (0, 1)."""
    return 1.0 / (1.0 + np.exp(-np.asarray(z, dtype=float)))


# ── Notification ───────────────────────────────────────────────────────────────

def notify(title: str, body: str) -> None:
    """Send a macOS system notification and echo to the terminal."""
    script = (
        f'display notification "{body}" '
        f'with title "{title}" '
        f'sound name "Ping"'
    )
    try:
        subprocess.run(["osascript", "-e", script], check=False, timeout=5)
    except Exception:
        pass
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"[{ts}]  *** ALERT ***  {title}")
    print(f"          {body}")


# ── Kalshi API helpers ─────────────────────────────────────────────────────────

async def fetch_json(client: httpx.AsyncClient, url: str, params: dict | None = None) -> dict:
    r = await client.get(url, params=params or {}, timeout=20)
    r.raise_for_status()
    return r.json()


async def get_open_markets(client: httpx.AsyncClient, series_ticker: str) -> list[dict]:
    data = await fetch_json(
        client,
        f"{KALSHI_BASE}/markets",
        {"series_ticker": series_ticker, "status": "open", "limit": 100},
    )
    return data.get("markets", [])


async def get_candlesticks(
    client: httpx.AsyncClient,
    series_ticker: str,
    market_ticker: str,
) -> list[dict]:
    now   = int(time.time())
    start = now - HISTORY_HOURS * 3600
    try:
        data = await fetch_json(
            client,
            f"{KALSHI_BASE}/series/{series_ticker}/markets/{market_ticker}/candlesticks",
            {
                "start_ts":                   start,
                "end_ts":                     now,
                "period_interval":            CANDLE_MINUTES,
                "include_latest_before_start": "true",
            },
        )
        return data.get("candlesticks", [])
    except Exception:
        return []


# ── Price extraction ───────────────────────────────────────────────────────────

def extract_price_series(candles: list[dict]) -> np.ndarray:
    """
    Build a mid-price series from Kalshi candlestick payloads.
    Prefers (yes_bid.close + yes_ask.close) / 2; falls back to price.close.
    """
    prices = []
    for c in candles:
        bid_obj   = c.get("yes_bid") or {}
        ask_obj   = c.get("yes_ask") or {}
        price_obj = c.get("price")   or {}

        bid   = bid_obj.get("close")
        ask   = ask_obj.get("close")
        close = price_obj.get("close")

        try:
            if bid is not None and ask is not None:
                prices.append((float(bid) + float(ask)) / 2.0)
            elif close is not None:
                prices.append(float(close))
        except (TypeError, ValueError):
            pass

    return np.array(prices, dtype=float)


# ── ζ-Field spectral analysis ──────────────────────────────────────────────────

def spectral_analysis(price_series: np.ndarray, current_price: float) -> dict:
    """
    Core ζ-Field computation.

    The intuition mirrors how the Riemann ζ-function decomposes arithmetic
    structure via prime-indexed components: here the market probability path
    is decomposed into its dominant frequency components.  The reconstructed
    signal is the "spectral fair value" — what the periodic structure of the
    market implies the price should be right now.

    Steps
    -----
    1.  z(t) = logit(p(t))          — work on the real line, not [0,1]
    2.  Z(ω) = FFT(z(t))            — full spectral decomposition
    3.  Ẑ(ω) = keep top-K by power  — dominant cycles only
    4.  ẑ(t) = IFFT(Ẑ(ω))          — reconstruct the smooth periodic signal
    5.  p̂    = logistic(ẑ[-1])     — map back to probability space

    Regime shift
    ------------
    A sudden spike in high-frequency spectral power (periods < 2 h) relative
    to total power indicates the market has entered a new regime — analogous
    to non-trivial zeros of ζ(s) marking transitions in prime distribution.
    """
    z = logit(price_series)
    n = len(z)

    # Full FFT
    Z     = np.fft.rfft(z)
    freqs = np.fft.rfftfreq(n)          # cycles per sample (1 sample = CANDLE_MINUTES)
    power = np.abs(Z) ** 2

    # ── Reconstruction from dominant components ────────────────────────────
    top_idx = np.argsort(power)[::-1]
    Z_top   = np.zeros_like(Z)
    Z_top[top_idx[:TOP_K_COMPONENTS]] = Z[top_idx[:TOP_K_COMPONENTS]]
    z_hat   = np.fft.irfft(Z_top, n=n)
    spectral_fair_value = float(logistic(z_hat[-1]))

    # ── Dominant periods (exclude DC component at index 0) ─────────────────
    dominant_idx       = top_idx[1 : TOP_K_COMPONENTS + 1]
    dominant_periods_h = []
    for i in dominant_idx:
        if freqs[i] > 0:
            period_h = (1.0 / freqs[i]) * CANDLE_MINUTES / 60.0
            dominant_periods_h.append(round(period_h, 1))

    # ── Regime shift: high-freq power fraction ─────────────────────────────
    # "High freq" = periods shorter than 2 hours → freq > 1/(2h) in samples
    hf_cutoff   = 1.0 / (2.0 * 60.0 / CANDLE_MINUTES)   # cycles per sample
    total_power = float(np.sum(power[1:]))                # exclude DC
    hf_power    = float(np.sum(power[freqs > hf_cutoff]))
    regime_ratio = hf_power / total_power if total_power > 0 else 0.0

    return {
        "spectral_fair_value": spectral_fair_value,
        "discrepancy":         current_price - spectral_fair_value,
        "dominant_periods_h":  dominant_periods_h,
        "regime_shift":        regime_ratio > REGIME_THRESHOLD,
        "regime_ratio":        regime_ratio,
    }


# ── Single scan ────────────────────────────────────────────────────────────────

async def scan_once(client: httpx.AsyncClient) -> list[SpectralResult]:
    """Fetch markets → candlesticks → spectral analysis.  Returns all results."""

    # 1. Gather open markets for every watched series concurrently
    batches = await asyncio.gather(
        *[get_open_markets(client, s) for s in WEATHER_SERIES],
        return_exceptions=True,
    )

    # 2. Flatten, sort by 24h volume, take top N
    flat: list[tuple[str, dict]] = []
    for series_ticker, batch in zip(WEATHER_SERIES, batches):
        if isinstance(batch, Exception):
            continue
        for m in batch:
            flat.append((series_ticker, m))

    flat.sort(key=lambda x: float(x[1].get("volume_24h_fp", 0) or 0), reverse=True)
    flat = flat[:TOP_N_MARKETS]

    if not flat:
        return []

    # 3. Fetch candlestick history concurrently
    candle_batches = await asyncio.gather(
        *[get_candlesticks(client, series, m["ticker"]) for series, m in flat],
        return_exceptions=True,
    )

    # 4. Run spectral analysis
    results: list[SpectralResult] = []
    for (series, market), candles in zip(flat, candle_batches):
        ticker = market.get("ticker", "?")
        title  = market.get("title", ticker)

        # Determine live mid-price
        bid  = market.get("yes_bid_dollars")  or market.get("yes_bid")
        ask  = market.get("yes_ask_dollars")  or market.get("yes_ask")
        last = market.get("last_price_dollars") or market.get("last_price")
        try:
            if bid is not None and ask is not None:
                current_price = (float(bid) + float(ask)) / 2.0
            elif last is not None:
                current_price = float(last)
            else:
                continue
        except (TypeError, ValueError):
            continue

        # Skip markets that are nearly resolved (price hugging 0 or 1)
        if not (0.03 < current_price < 0.97):
            continue

        if isinstance(candles, Exception) or len(candles) < MIN_CANDLES:
            continue

        price_series = extract_price_series(candles)
        if len(price_series) < MIN_CANDLES:
            continue

        analysis = spectral_analysis(price_series, current_price)

        results.append(SpectralResult(
            ticker              = ticker,
            title               = title,
            series              = series,
            current_price       = current_price,
            spectral_fair_value = analysis["spectral_fair_value"],
            discrepancy         = analysis["discrepancy"],
            dominant_periods_h  = analysis["dominant_periods_h"],
            regime_shift        = analysis["regime_shift"],
            regime_ratio        = analysis["regime_ratio"],
            n_candles           = len(price_series),
        ))

    return results


# ── Terminal display ───────────────────────────────────────────────────────────

def print_summary(results: list[SpectralResult]) -> None:
    ts = datetime.now().strftime("%H:%M:%S")
    bar = "─" * 72
    print(f"\n{bar}")
    print(f"  [{ts}]  ζ-Field scan  —  {len(results)} markets analysed")
    print(bar)
    header = f"  {'Ticker':<30} {'Mkt':>6}  {'ζ-Fair':>6}  {'Gap':>7}  {'HF%':>5}  Dominant cycles"
    print(header)
    print(f"  {'─'*30} {'──────':>6}  {'──────':>6}  {'───────':>7}  {'─────':>5}  ───────────────")

    for r in sorted(results, key=lambda x: abs(x.discrepancy), reverse=True):
        periods_str = ", ".join(f"{p}h" for p in r.dominant_periods_h[:3])
        regime_flag = "  ⚡ REGIME" if r.regime_shift else ""
        gap_flag    = "  ★" if abs(r.discrepancy) >= ALERT_THRESHOLD else ""
        print(
            f"  {r.ticker:<30} {r.current_price:6.3f}  "
            f"{r.spectral_fair_value:6.3f}  {r.discrepancy:+7.3f}  "
            f"{r.regime_ratio:5.1%}  {periods_str}"
            f"{regime_flag}{gap_flag}"
        )

    alerts = [r for r in results if abs(r.discrepancy) >= ALERT_THRESHOLD or r.regime_shift]
    if not alerts:
        print(f"\n  No discrepancies above threshold ({ALERT_THRESHOLD:.0%})")
    print()


# ── Main loop ──────────────────────────────────────────────────────────────────

async def main() -> None:
    print("=" * 72)
    print("  Hagakure  ζ-Field Weather Market Scanner")
    print("=" * 72)
    print(f"  Alert threshold  : {ALERT_THRESHOLD:.0%} gap between market and ζ-fair value")
    print(f"  Regime threshold : {REGIME_THRESHOLD:.0%} high-frequency spectral power fraction")
    print(f"  Scan interval    : {SCAN_INTERVAL}s")
    print(f"  Markets per scan : top {TOP_N_MARKETS} by 24h volume")
    print(f"  Spectral depth   : {TOP_K_COMPONENTS} dominant components, {HISTORY_HOURS}h history")
    print(f"  Series watched   : {len(WEATHER_SERIES)}")
    print()
    print("  Starting first scan…")

    # Track seen alerts to suppress repeats until the price meaningfully moves
    notified: set[str] = set()

    async with httpx.AsyncClient() as client:
        while True:
            try:
                results = await scan_once(client)
                print_summary(results)

                for r in results:
                    abs_gap   = abs(r.discrepancy)
                    is_alert  = abs_gap >= ALERT_THRESHOLD or r.regime_shift
                    # Key includes rounded gap so re-alerts fire if price drifts further
                    alert_key = f"{r.ticker}|{round(r.discrepancy, 2)}|{r.regime_shift}"

                    if is_alert and alert_key not in notified:
                        notified.add(alert_key)

                        if r.regime_shift:
                            notify(
                                f"ζ-Field: Regime Shift — {r.ticker}",
                                (
                                    f"High-freq spectral power: {r.regime_ratio:.0%}. "
                                    f"Market @ {r.current_price:.1%}, "
                                    f"ζ-fair @ {r.spectral_fair_value:.1%}. "
                                    f"Dominant cycles: {', '.join(str(p)+'h' for p in r.dominant_periods_h[:2])}"
                                ),
                            )
                        else:
                            side = "RICH" if r.discrepancy > 0 else "CHEAP"
                            notify(
                                f"ζ-Field: {side} — {r.ticker}",
                                (
                                    f"{r.title[:55]}. "
                                    f"Gap {r.discrepancy:+.3f} "
                                    f"(mkt {r.current_price:.1%} vs ζ-fair {r.spectral_fair_value:.1%})"
                                ),
                            )

                # Prune stale alert keys so the set doesn't grow forever
                if len(notified) > 300:
                    notified.clear()

            except Exception as exc:
                ts = datetime.now().strftime("%H:%M:%S")
                print(f"[{ts}]  Scan error: {exc}")

            await asyncio.sleep(SCAN_INTERVAL)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nScanner stopped.")
