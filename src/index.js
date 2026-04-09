const KALSHI_BASE = 'https://api.elections.kalshi.com/trade-api/v2';

// Curated list of Kalshi weather series with recurring open markets.
// Hardcoded to avoid series-discovery subrequests — Cloudflare Workers
// caps each invocation at 50 subrequests, so we keep this list ≤ 49.
const WEATHER_SERIES = [
  // High temperature
  'KXHIGHTBOS',  // Boston max temp daily
  'KXHIGHTPHX',  // Phoenix max temp daily
  'KXHIGHTLV',   // Las Vegas max temp daily
  'KXHIGHTOKC',  // Oklahoma City max temp daily
  'KXHIGHTSEA',  // Seattle max temp daily
  'KXHIGHTSFO',  // San Francisco max temp daily
  'KXHIGHTCHI',  // Chicago max temp daily (new-style)
  'KXHIGHCHI',   // Chicago max temp daily (legacy)
  'KXHIGHLAX',   // Los Angeles max temp daily
  'KXHIGHNY',    // New York max temp daily
  'KXHIGHNY0',   // New York max temp daily (alt)
  'KXHIGHMIA',   // Miami max temp daily
  'KXHIGHTATL',  // Atlanta max temp daily
  'KXHIGHTHOU',  // Houston max temp daily
  'KXHIGHTDAL',  // Dallas max temp daily
  'KXHIGHTDC',   // DC max temp daily
  'KXHIGHTMIN',  // Minneapolis max temp daily
  'KXHIGHTNOLA', // New Orleans max temp daily
  'KXHIGHTPHIL', // Philadelphia max temp daily
  // Low temperature
  'KXLOWTNYC',   // NYC min temp daily
  'KXLOWTCHI',   // Chicago min temp daily
  'KXLOWTSFO',   // San Francisco min temp daily
  'KXLOWTSEA',   // Seattle min temp daily
  'KXLOWTDAL',   // Dallas min temp daily
  'KXLOWTDC',    // DC min temp daily
  'KXLOWTMIN',   // Minneapolis min temp daily
  'KXLOWTDEN',   // Denver min temp daily
  'KXLOWTLV',    // Las Vegas min temp daily
  'KXLOWTATL',   // Atlanta min temp daily
  'KXLOWTNOLA',  // New Orleans min temp daily
  'KXLOWTHOU',   // Houston min temp daily
  'KXLOWTLAX',   // Los Angeles min temp daily
  'KXLOWTBOS',   // Boston min temp daily
  'KXLOWTPHX',   // Phoenix min temp daily
  'KXLOWTMIA',   // Miami min temp daily
  // Rain (monthly)
  'KXRAINNYCM',  // NYC monthly rain
  'KXRAINCHIM',  // Chicago monthly rain
  'KXRAINMIAM',  // Miami monthly rain
  'KXRAINHOUM',  // Houston monthly rain
  'KXRAINLAXM',  // LA monthly rain
  'KXRAINSEAM',  // Seattle monthly rain
  'KXRAINSFOM',  // SF monthly rain
  'KXRAINDENM',  // Denver monthly rain
  'KXRAINDALM',  // Dallas monthly rain
  // Snow (monthly)
  'KXNYCSNOWM',  // NYC monthly snow
  'KXCHISNOWM',  // Chicago monthly snow
  'KXBOSSNOWM',  // Boston monthly snow
  'KXDENSNOWM',  // Denver monthly snow
  'KXDETSNOWM',  // Detroit monthly snow
];

// Map a series ticker to {city, region, event} for the frontend pricer.
// Returns null for unmapped series (markets will be dropped).
function getSeriesMeta(seriesTicker) {
  const t = (seriesTicker || '').toUpperCase();
  const pairs = [
    // ── High / Low Temperature ────────────────────────────────────────────────
    [/KXHIGHT?(NYC|NY0?|HIGHNY0?)|KXLOWT?(NYC|NY0?)|KXHIGHNY0?|KXLOWNY/, { city: 'New York', region: 'New York', event: 'Temperature' }],
    [/KXHIGHCHI|KXLOWCHI|KXHIGHT(CHI)|KXLOWT(CHI)/, { city: 'Chicago', region: 'Illinois', event: 'Temperature' }],
    [/KXHIGHLAX|KXLOWLAX|KXHIGHT(LAX)|KXLOWT(LAX)/, { city: 'Los Angeles', region: 'California', event: 'Temperature' }],
    [/KXHIGHT(BOS)|KXLOWT(BOS)/, { city: 'Boston', region: 'Massachusetts', event: 'Temperature' }],
    [/KXHIGHT(DAL)|KXLOWT(DAL)/, { city: 'Dallas', region: 'Texas', event: 'Temperature' }],
    [/KXHIGHT(PHX)|KXLOWT(PHX)/, { city: 'Phoenix', region: 'Arizona', event: 'Temperature' }],
    [/KXHIGHTEMPDEN|KXHIGHDEN|KXLOWDEN|KXHIGHT(DEN)|KXLOWT(DEN)/, { city: 'Denver', region: 'Colorado', event: 'Temperature' }],
    [/KXHIGHTATL|KXLOWTATL|KXHIGHT(ATL)|KXLOWT(ATL)/, { city: 'Atlanta', region: 'Georgia', event: 'Temperature' }],
    [/KXHIGHT(DC)|KXLOWT(DC)/, { city: 'Washington', region: 'DC', event: 'Temperature' }],
    [/KXHOUHIGH|KXHIGHTHOU|KXLOWTHOU|KXHIGHOU|KXHIGHT(HOU)|KXLOWT(HOU)/, { city: 'Houston', region: 'Texas', event: 'Temperature' }],
    [/KXHIGHMIA|KXLOWMIA|KXHIGHT(MIA)|KXLOWT(MIA)/, { city: 'Miami', region: 'Florida', event: 'Temperature' }],
    [/KXHIGHT(NOLA)|KXLOWT(NOLA)/, { city: 'New Orleans', region: 'Louisiana', event: 'Temperature' }],
    [/KXHIGHT(LV)|KXLOWT(LV)/, { city: 'Las Vegas', region: 'Nevada', event: 'Temperature' }],
    [/KXHIGHT(MIN)|KXLOWT(MIN)/, { city: 'Minneapolis', region: 'Minnesota', event: 'Temperature' }],
    [/KXHIGHT(OKC)|KXLOWT(OKC)/, { city: 'Oklahoma City', region: 'Oklahoma', event: 'Temperature' }],
    [/KXHIGHT(SATX)|KXLOWT(SATX)/, { city: 'San Antonio', region: 'Texas', event: 'Temperature' }],
    [/KXHIGHT(SEA)|KXLOWT(SEA)/, { city: 'Seattle', region: 'Washington', event: 'Temperature' }],
    [/KXHIGHT(SFO)|KXLOWT(SFO)/, { city: 'San Francisco', region: 'California', event: 'Temperature' }],
    [/KXHIGHPHIL|KXLOWPHIL|KXPHILHIGH|KXHIGHT(PHIL)|KXLOWT(PHIL)/, { city: 'Philadelphia', region: 'Pennsylvania', event: 'Temperature' }],
    [/KXHIGHAUS|KXLOWAUS|KXHIGHT(AUS)|KXLOWT(AUS)/, { city: 'Austin', region: 'Texas', event: 'Temperature' }],
    // ── Rain ──────────────────────────────────────────────────────────────────
    [/KXRAINNYCM?|KXRAINNY/, { city: 'New York', region: 'New York', event: 'Rain' }],
    [/KXRAINCHIM?/, { city: 'Chicago', region: 'Illinois', event: 'Rain' }],
    [/KXRAINDALM?/, { city: 'Dallas', region: 'Texas', event: 'Rain' }],
    [/KXRAINHOUM?/, { city: 'Houston', region: 'Texas', event: 'Rain' }],
    [/KXRAINLAXM?/, { city: 'Los Angeles', region: 'California', event: 'Rain' }],
    [/KXRAINMIAM?/, { city: 'Miami', region: 'Florida', event: 'Rain' }],
    [/KXRAINSEAM?/, { city: 'Seattle', region: 'Washington', event: 'Rain' }],
    [/KXRAINSFOM?/, { city: 'San Francisco', region: 'California', event: 'Rain' }],
    [/KXRAINDENM?/, { city: 'Denver', region: 'Colorado', event: 'Rain' }],
    [/KXRAINAUSM?/, { city: 'Austin', region: 'Texas', event: 'Rain' }],
    [/KXRAINNO(SB)?/, { city: 'New Orleans', region: 'Louisiana', event: 'Rain' }],
    // ── Snow ──────────────────────────────────────────────────────────────────
    [/KXNYCSNOW(M|XMAS)?|KXSNOW(NYC|NY)(M|XMAS)?/, { city: 'New York', region: 'New York', event: 'Snow' }],
    [/KXCHISNOW(M|XMAS)?|KXSNOWCHIM?/, { city: 'Chicago', region: 'Illinois', event: 'Snow' }],
    [/KXBOSSNOW(M|XMAS)?/, { city: 'Boston', region: 'Massachusetts', event: 'Snow' }],
    [/KXDENSNOW(M|MB|XMAS)?/, { city: 'Denver', region: 'Colorado', event: 'Snow' }],
    [/KXDALSNOWM?/, { city: 'Dallas', region: 'Texas', event: 'Snow' }],
    [/KXDETSNOWM?/, { city: 'Detroit', region: 'Michigan', event: 'Snow' }],
    [/KXPHILSNOWM?/, { city: 'Philadelphia', region: 'Pennsylvania', event: 'Snow' }],
  ];

  for (const [regex, meta] of pairs) {
    if (regex.test(t)) return meta;
  }
  return null;
}

function mapMarketToFrontend(market) {
  const seriesTicker = market._seriesTicker || '';
  const meta = getSeriesMeta(seriesTicker);
  if (!meta) return null;

  const yesBid = parseFloat(market.yes_bid_dollars) || 0;
  const yesAsk = parseFloat(market.yes_ask_dollars) || 0;
  const lastPrice = parseFloat(market.last_price_dollars) || 0;
  const currentPrice = lastPrice || (yesBid + yesAsk) / 2;
  const volume = parseFloat(market.volume_24h_fp) || parseFloat(market.volume_fp) || 0;

  const horizonHours = market.close_time
    ? Math.max(0.5, (new Date(market.close_time).getTime() - Date.now()) / 3_600_000)
    : 24;

  const mid = (yesBid + yesAsk) / 2;
  const spread = yesAsk - yesBid;
  const volatility = mid > 0
    ? Math.min(Math.max((spread / mid) * 1.5, 0.1), 0.6)
    : 0.3;

  const cityWords = meta.city.toLowerCase().split(/\s+/);
  const descriptors = [
    ...cityWords,
    meta.region.toLowerCase(),
    meta.event.toLowerCase(),
  ].filter((v, i, a) => a.indexOf(v) === i);

  return {
    ticker: market.ticker,
    title: market.title || market.subtitle || market.ticker,
    city: meta.city,
    region: meta.region,
    event: meta.event,
    descriptors,
    currentPrice: Math.round(currentPrice * 10000) / 10000,
    yesBid: Math.round(yesBid * 10000) / 10000,
    yesAsk: Math.round(yesAsk * 10000) / 10000,
    lastPrice: Math.round(lastPrice * 10000) / 10000,
    volume: Math.round(volume),
    horizonHours: Math.round(horizonHours * 10) / 10,
    signalBias: 0,
    volatility: Math.round(volatility * 100) / 100,
  };
}

async function fetchWeatherMarkets() {
  // Fetch all series in parallel — one subrequest per series, total ≤ 49.
  const results = await Promise.all(
    WEATHER_SERIES.map(async (seriesTicker) => {
      try {
        const url = `${KALSHI_BASE}/markets?series_ticker=${seriesTicker}&status=open&limit=200`;
        const resp = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!resp.ok) return [];
        const data = await resp.json();
        return (data.markets || []).map((m) => ({ ...m, _seriesTicker: seriesTicker }));
      } catch {
        return [];
      }
    })
  );

  return results
    .flat()
    .map(mapMarketToFrontend)
    .filter(Boolean)
    .filter((m) => m.currentPrice > 0);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/weather-markets') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '86400',
          },
        });
      }

      // Check cache
      const cache = caches.default;
      const cacheKey = new Request(`${url.origin}/api/weather-markets`);
      let cached;
      try { cached = await cache.match(cacheKey); } catch { cached = null; }
      if (cached) return cached;

      let markets = [];
      try {
        markets = await fetchWeatherMarkets();
      } catch {
        // Return empty array rather than a 500 so the frontend shows a helpful message
        markets = [];
      }

      const response = new Response(JSON.stringify(markets), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        },
      });

      try { await cache.put(cacheKey, response.clone()); } catch { /* best effort */ }
      return response;
    }

    return env.ASSETS.fetch(request);
  },
};
