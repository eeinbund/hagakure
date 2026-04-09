import requests
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import numpy as np
import pandas as pd

API_KEY  = 'd6bdd4fb-5e3d-4fa6-8478-225f1a717b80'
BASE_URL = 'https://api.elections.kalshi.com/trade-api/v2/'

WEATHER_KEYWORDS = [
    'weather', 'temperature', 'temp', 'rain', 'rainfall',
    'snow', 'snowfall', 'wind', 'precipitation', 'storm', 'climate',
    'hurricane', 'tornado', 'flood', 'drought', 'heat', 'cold',
    'frost', 'ice', 'hail', 'humidity', 'celsius', 'fahrenheit',
]
WEATHER_PATTERN = re.compile(
    r'\b(' + '|'.join(WEATHER_KEYWORDS) + r')\b', re.IGNORECASE
)


def is_weather(text: str) -> bool:
    return bool(WEATHER_PATTERN.search(text))


def fetch_page(url, params=None, retries=5):
    for attempt in range(retries):
        response = requests.get(url, params=params, timeout=30)
        if response.status_code == 429:
            time.sleep(2 ** attempt)
            continue
        response.raise_for_status()
        return response.json()
    raise Exception("Max retries exceeded due to rate limiting")


def fetch_weather_series():
    series_list = []
    cursor = None
    while True:
        params = {'limit': 200}
        if cursor:
            params['cursor'] = cursor
        data = fetch_page(BASE_URL + 'series', params=params)
        batch = data.get('series', [])
        series_list.extend(
            s for s in batch
            if is_weather(
                s.get('title', '') + ' ' +
                s.get('ticker', '') + ' ' +
                s.get('category', '')
            )
        )
        cursor = data.get('cursor')
        if not cursor or not batch:
            break

    # Deduplicate: prefer KX-prefixed ticker when both e.g. SNOWNY + KXSNOWNY exist
    seen = {}
    for s in series_list:
        ticker = s['ticker']
        base = ticker[2:] if ticker.startswith('KX') else ticker
        if base not in seen or ticker.startswith('KX'):
            seen[base] = s
    return list(seen.values())


def fetch_markets_for_series(series, status='open'):
    """Fetch ALL pages of markets for a series (not just the first 200)."""
    all_markets = []
    cursor = None
    while True:
        params = {'series_ticker': series['ticker'], 'status': status, 'limit': 1000}
        if cursor:
            params['cursor'] = cursor
        data = fetch_page(BASE_URL + 'markets', params=params)
        batch = data.get('markets', [])
        for market in batch:
            market.setdefault('series_ticker', series.get('ticker'))
            market.setdefault('series_title', series.get('title'))
            market.setdefault('series_category', series.get('category'))
        all_markets.extend(batch)
        cursor = data.get('cursor')
        if not cursor or not batch:
            break
    return all_markets


def fetch_weather_markets(include_statuses=('open',)):
    """Fetch all weather markets across all statuses requested.

    Parameters
    ----------
    include_statuses : tuple of str
        Kalshi market statuses to include. Defaults to ('open',) for live
        markets only. Pass ('open', 'closed') to also pick up intraday
        markets that just closed, or ('open', 'unopened') to include
        markets not yet trading.
    """
    weather_series = fetch_weather_series()
    print(f"Weather series after dedup ({len(weather_series)}): {[s['ticker'] for s in weather_series]}\n")

    markets = []
    tasks = [
        (series, status)
        for series in weather_series
        for status in include_statuses
    ]
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {
            executor.submit(fetch_markets_for_series, series, status): (series, status)
            for series, status in tasks
        }
        for future in as_completed(futures):
            markets.extend(future.result())

    # Deduplicate by ticker (can appear in multiple status calls)
    seen = {}
    for m in markets:
        seen[m['ticker']] = m
    return list(seen.values())


def _market_search_text(market):
    parts = [
        market.get('ticker', ''),
        market.get('event_ticker', ''),
        market.get('series_ticker', ''),
        market.get('series_title', ''),
        market.get('title', ''),
        market.get('subtitle', ''),
    ]
    return ' '.join(str(part) for part in parts if part)


def search_weather_markets(keyword, markets=None, limit=10):
    """Search within weather-only markets using a user-provided keyword query."""
    if markets is None:
        markets = fetch_weather_markets()

    query = str(keyword or '').strip().lower()
    tokens = re.findall(r'[a-z0-9]+', query)

    if not tokens:
        filtered = list(markets)
    else:
        filtered = [
            market for market in markets
            if all(token in _market_search_text(market).lower() for token in tokens)
        ]

    df = pd.DataFrame(filtered)
    if df.empty:
        return df

    for column in ('volume_24h_fp', 'volume_fp', 'last_price_dollars'):
        if column in df.columns:
            df[column] = pd.to_numeric(df[column], errors='coerce')

    sort_columns = [column for column in ('volume_24h_fp', 'volume_fp', 'last_price_dollars') if column in df.columns]
    if sort_columns:
        df = df.sort_values(sort_columns, ascending=False, na_position='last')

    display_columns = [
        column for column in (
            'series_ticker',
            'event_ticker',
            'ticker',
            'title',
            'subtitle',
            'last_price_dollars',
            'yes_bid_dollars',
            'yes_ask_dollars',
            'volume_24h_fp',
            'volume_fp',
            'close_time',
        )
        if column in df.columns
    ]
    df = df[display_columns].reset_index(drop=True)

    if limit is not None:
        df = df.head(int(limit)).reset_index(drop=True)

    return df


def fetch_market_candlesticks(series_ticker, ticker, start_ts, end_ts, period_interval=1, include_latest_before_start=True):
    """Fetch Kalshi candlesticks for a specific weather market."""
    endpoint = f'series/{series_ticker}/markets/{ticker}/candlesticks'
    return fetch_page(
        BASE_URL + endpoint,
        params={
            'start_ts': int(start_ts),
            'end_ts': int(end_ts),
            'period_interval': int(period_interval),
            'include_latest_before_start': str(bool(include_latest_before_start)).lower(),
        },
    )


def candlesticks_to_dataframe(payload):
    """Flatten Kalshi candlestick payloads into a DataFrame."""
    candlesticks = payload.get('candlesticks', [])
    rows = []

    for candle in candlesticks:
        row = {
            'ticker': payload.get('ticker'),
            'end_period_ts': candle.get('end_period_ts'),
        }

        for side in ('yes_bid', 'yes_ask', 'price'):
            side_payload = candle.get(side) or {}
            for field, value in side_payload.items():
                row[f'{side}_{field}'] = float(value) if value not in (None, '') else np.nan

        for field in ('volume_fp', 'open_interest_fp'):
            value = candle.get(field)
            row[field] = float(value) if value not in (None, '') else np.nan

        rows.append(row)

    df = pd.DataFrame(rows)
    if df.empty:
        return df

    df = df.sort_values('end_period_ts').reset_index(drop=True)
    df['end_period_dt'] = pd.to_datetime(df['end_period_ts'], unit='s', utc=True)
    return df


def _weather_market_price_frame(markets):
    """Build the price-vector frame used in graph.ipynb correlation lookup."""
    df = pd.DataFrame(markets).copy()
    if df.empty:
        return df

    price_columns = ['yes_bid_dollars', 'yes_ask_dollars', 'last_price_dollars']
    for column in price_columns:
        if column not in df.columns:
            df[column] = np.nan
        df[column] = pd.to_numeric(df[column], errors='coerce')

    keep_columns = [
        column for column in (
            'series_ticker',
            'event_ticker',
            'ticker',
            'title',
            'subtitle',
            'yes_bid_dollars',
            'yes_ask_dollars',
            'last_price_dollars',
            'volume_24h_fp',
            'volume_fp',
            'close_time',
        )
        if column in df.columns
    ]
    df = df[keep_columns]
    df = df.dropna(subset=['ticker'] + price_columns).drop_duplicates(subset=['ticker']).reset_index(drop=True)
    return df


def find_correlated_weather_markets(target_ticker, markets=None, n=5):
    """Return the n most correlated weather markets using graph.ipynb-style price vectors."""
    if markets is None:
        markets = fetch_weather_markets()

    n = int(n)
    if n <= 0:
        raise ValueError('n must be a positive integer')

    df = _weather_market_price_frame(markets)
    if df.empty:
        raise ValueError('No weather markets with complete price vectors are available')

    matches = df.index[df['ticker'] == target_ticker].tolist()
    if not matches:
        raise ValueError(f"Ticker '{target_ticker}' was not found in the weather-market price frame")

    query_idx = matches[0]
    price_matrix = df[['yes_bid_dollars', 'yes_ask_dollars', 'last_price_dollars']].to_numpy(dtype=float)
    norms = np.linalg.norm(price_matrix, axis=1)
    query_vector = price_matrix[query_idx]
    query_norm = norms[query_idx]
    if np.isclose(query_norm, 0.0):
        raise ValueError(f"Ticker '{target_ticker}' has a zero price-vector norm")

    safe_denominator = np.where(norms > 0.0, norms * query_norm, np.nan)
    scores = (price_matrix @ query_vector) / safe_denominator

    result = df.copy()
    result['correlation_score'] = scores
    result = result[result['ticker'] != target_ticker]
    sort_columns = ['correlation_score'] + [column for column in ('volume_24h_fp', 'volume_fp') if column in result.columns]
    result = result.sort_values(sort_columns, ascending=False, na_position='last')
    result = result.head(n).reset_index(drop=True)
    return result
