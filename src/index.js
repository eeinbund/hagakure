const KALSHI_BASE = 'https://api.elections.kalshi.com/trade-api/v2';

const WEATHER_KEYWORDS = [
  'weather', 'temperature', 'temp', 'rain', 'rainfall',
  'snow', 'snowfall', 'wind', 'precipitation', 'storm', 'climate',
];

function isActiveWeatherSeries(series) {
  const text = (
    (series.title || '') + ' ' +
    (series.ticker || '') + ' ' +
    (series.category || '')
  ).toLowerCase();

  const isWeather = WEATHER_KEYWORDS.some((kw) => {
    const pattern = new RegExp('\\b' + kw + '\\b', 'i');
    return pattern.test(text);
  }) || (series.category || '').toLowerCase().includes('weather')
    || (series.category || '').toLowerCase().includes('climate');

  const isRecurring = (
    series.frequency === 'daily' ||
    series.frequency === 'monthly' ||
    series.frequency === 'weekly'
  );

  return isWeather && isRecurring;
}

// Map a series ticker to {city, region, event} metadata for the frontend pricer.
// Returns null for series with no city mapping (they will be skipped).
function getSeriesMeta(seriesTicker) {
  const t = (seriesTicker || '').toUpperCase();

  const pairs = [
    // ── Temperature ───────────────────────────────────────────────────────────
    [/KXHIGHT(NYC|NY0?)|KXLOWT(NYC|NY0?)|KXHIGHNY0?|KXLOWNY/, { city: 'New York', region: 'New York', event: 'Temperature' }],
    [/KXHIGHCHI|KXLOWCHI|KXHIGHT(CHI)|KXLOWT(CHI)/, { city: 'Chicago', region: 'Illinois', event: 'Temperature' }],
    [/KXHIGHLAX|KXLOWLAX|KXHIGHT(LAX)|KXLOWT(LAX)/, { city: 'Los Angeles', region: 'California', event: 'Temperature' }],
    [/KXHIGHT(BOS)|KXLOWT(BOS)/, { city: 'Boston', region: 'Massachusetts', event: 'Temperature' }],
    [/KXHIGHT(DAL)|KXLOWT(DAL)/, { city: 'Dallas', region: 'Texas', event: 'Temperature' }],
    [/KXHIGHT(PHX)|KXLOWT(PHX)/, { city: 'Phoenix', region: 'Arizona', event: 'Temperature' }],
    [/KXHIGHDEN|KXLOWDEN|KXDVHIGH|KXHIGHTEMPDEN|KXHIGHT(DEN)|KXLOWT(DEN)/, { city: 'Denver', region: 'Colorado', event: 'Temperature' }],
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
    [/KXNYCSNOW(M|XMAS)?|KXSNOW(NYC|NY)(M?|XMAS)?/, { city: 'New York', region: 'New York', event: 'Snow' }],
    [/KXCHISNOW(M|XMAS)?|KXSNOWCHIM?/, { city: 'Chicago', region: 'Illinois', event: 'Snow' }],
    [/KXBOSSNOW(M|XMAS)?/, { city: 'Boston', region: 'Massachusetts', event: 'Snow' }],
    [/KXDENSNOW(M|MB|XMAS)?/, { city: 'Denver', region: 'Colorado', event: 'Snow' }],
    [/KXDALSNOWM?/, { city: 'Dallas', region: 'Texas', event: 'Snow' }],
    [/KXDETSNOWM?/, { city: 'Detroit', region: 'Michigan', event: 'Snow' }],
    [/KXPHILSNOWM?/, { city: 'Philadelphia', region: 'Pennsylvania', event: 'Snow' }],
    [/KXHOUSNOWM?/, { city: 'Houston', region: 'Texas', event: 'Snow' }],
    [/KXLAXSNOWM?/, { city: 'Los Angeles', region: 'California', event: 'Snow' }],
    [/KXSEASNOWM?/, { city: 'Seattle', region: 'Washington', event: 'Snow' }],
    [/KXSFOSNOWM?/, { city: 'San Francisco', region: 'California', event: 'Snow' }],
    [/KXSLCSNOWM?/, { city: 'Salt Lake City', region: 'Utah', event: 'Snow' }],
    [/KXJACWSNOWM?/, { city: 'Jackson Hole', region: 'Wyoming', event: 'Snow' }],
    [/KXMIASNOWM?/, { city: 'Miami', region: 'Florida', event: 'Snow' }],
    [/KXASPSNOWM?/, { city: 'Aspen', region: 'Colorado', event: 'Snow' }],
    [/KXAUSSNOWM?/, { city: 'Austin', region: 'Texas', event: 'Snow' }],
    [/KXDCSNOWM?/, { city: 'Washington', region: 'DC', event: 'Snow' }],
    [/KXSNOWAZ/, { city: 'Phoenix', region: 'Arizona', event: 'Snow' }],
    [/KXSNOWS$/, { city: 'United States', region: 'United States', event: 'Snow' }],
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

  // Horizon: hours from now until market closes
  const horizonHours = market.close_time
    ? Math.max(0.5, (new Date(market.close_time).getTime() - Date.now()) / 3_600_000)
    : 24;

  // Volatility: estimated from relative bid-ask spread, clamped [0.1, 0.6]
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

async function fetchPage(url) {
  const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!resp.ok) return null;
  return resp.json();
}

async function fetchWeatherMarkets() {
  // Step 1: collect all active weather series (paginated)
  const weatherSeries = [];
  let cursor = null;

  for (let page = 0; page < 10; page++) {
    const params = new URLSearchParams({ limit: '200' });
    if (cursor) params.set('cursor', cursor);

    const data = await fetchPage(`${KALSHI_BASE}/series?${params}`);
    if (!data) break;

    const batch = data.series || [];
    weatherSeries.push(...batch.filter(isActiveWeatherSeries));
    cursor = data.cursor;
    if (!cursor || !batch.length) break;
  }

  // Deduplicate: when both SNOWNY and KXSNOWNY exist, prefer the KX-prefixed one
  const seen = new Map();
  for (const s of weatherSeries) {
    const base = s.ticker.startsWith('KX') ? s.ticker.slice(2) : s.ticker;
    if (!seen.has(base) || s.ticker.startsWith('KX')) {
      seen.set(base, s);
    }
  }
  const deduped = [...seen.values()];

  // Step 2: fetch open markets for each series in parallel batches of 5
  const BATCH = 5;
  const allMarkets = [];

  for (let i = 0; i < deduped.length; i += BATCH) {
    const batch = deduped.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(async (series) => {
        const params = new URLSearchParams({
          series_ticker: series.ticker,
          status: 'open',
          limit: '200',
        });
        const data = await fetchPage(`${KALSHI_BASE}/markets?${params}`);
        if (!data) return [];
        return (data.markets || []).map((m) => ({ ...m, _seriesTicker: series.ticker }));
      })
    );
    results.forEach((r) => allMarkets.push(...r));
  }

  // Step 3: map to frontend format, drop unmapped or zero-volume markets
  return allMarkets
    .map(mapMarketToFrontend)
    .filter(Boolean)
    .filter((m) => m.currentPrice > 0);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/weather-markets') {
      // CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '86400',
          },
        });
      }

      // Check Cloudflare cache first
      const cache = caches.default;
      const cacheKey = new Request(new URL('/api/weather-markets', request.url).href);
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      let markets;
      try {
        markets = await fetchWeatherMarkets();
      } catch {
        markets = [];
      }

      const response = new Response(JSON.stringify(markets), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        },
      });

      await cache.put(cacheKey, response.clone());
      return response;
    }

    // All other requests → Cloudflare static assets
    return env.ASSETS.fetch(request);
  },
};
