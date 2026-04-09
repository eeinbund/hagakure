const KALSHI_BASE = 'https://api.elections.kalshi.com/trade-api/v2';

// 25 series = 25 subrequests — well under Cloudflare's 50-per-invocation cap.
// We fetch all 25 in parallel, then sort by 24-hour volume and return the
// top 40 most liquid markets for the website pricer.
const WEATHER_SERIES = [
  // High temperature
  'KXHIGHLAX',   // Los Angeles max temp
  'KXHIGHTBOS',  // Boston max temp
  'KXHIGHTPHX',  // Phoenix max temp
  'KXHIGHTSFO',  // San Francisco max temp
  'KXHIGHTCHI',  // Chicago max temp (new-style)
  'KXHIGHCHI',   // Chicago max temp (legacy)
  'KXHIGHTLV',   // Las Vegas max temp
  'KXHIGHNY',    // New York max temp
  'KXHIGHTATL',  // Atlanta max temp
  'KXHIGHTSEA',  // Seattle max temp
  // Low temperature
  'KXLOWTNYC',   // New York min temp
  'KXLOWTSFO',   // San Francisco min temp
  'KXLOWTSEA',   // Seattle min temp
  'KXLOWTDAL',   // Dallas min temp
  'KXLOWTDC',    // Washington DC min temp
  'KXLOWTMIN',   // Minneapolis min temp
  'KXLOWTDEN',   // Denver min temp
  'KXLOWTLV',    // Las Vegas min temp
  'KXLOWTATL',   // Atlanta min temp
  'KXLOWTNOLA',  // New Orleans min temp
  // Monthly rain
  'KXRAINHOUM',  // Houston monthly rain
  'KXRAINDENM',  // Denver monthly rain
  'KXRAINNYCM',  // New York monthly rain
  // Monthly snow
  'KXNYCSNOWM',  // New York monthly snow
  'KXCHISNOWM',  // Chicago monthly snow
];

const SITE_MARKET_LIMIT = 40;

function getSeriesMeta(seriesTicker) {
  const t = (seriesTicker || '').toUpperCase();
  const pairs = [
    [/KXHIGHT?(NYC|NY0?)|KXLOWT?(NYC|NY0?)|KXHIGHNY0?|KXLOWNY/, { city: 'New York', region: 'New York', event: 'Temperature' }],
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

function mapMarket(market) {
  const meta = getSeriesMeta(market._seriesTicker || '');
  if (!meta) return null;

  const yesBid = parseFloat(market.yes_bid_dollars) || 0;
  const yesAsk = parseFloat(market.yes_ask_dollars) || 0;
  const lastPrice = parseFloat(market.last_price_dollars) || 0;
  const currentPrice = lastPrice || (yesBid + yesAsk) / 2;
  const volume24h = parseFloat(market.volume_24h_fp) || 0;
  const volume = parseFloat(market.volume_fp) || volume24h;

  if (currentPrice <= 0) return null;

  const horizonHours = market.close_time
    ? Math.max(0.5, (new Date(market.close_time).getTime() - Date.now()) / 3_600_000)
    : 24;

  const mid = (yesBid + yesAsk) / 2;
  const spread = yesAsk - yesBid;
  const volatility = mid > 0
    ? Math.min(Math.max((spread / mid) * 1.5, 0.1), 0.6)
    : 0.3;

  const cityWords = meta.city.toLowerCase().split(/\s+/);
  const descriptors = [...new Set([...cityWords, meta.region.toLowerCase(), meta.event.toLowerCase()])];

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
    volume24h: Math.round(volume24h),
    horizonHours: Math.round(horizonHours * 10) / 10,
    signalBias: 0,
    volatility: Math.round(volatility * 100) / 100,
  };
}

async function fetchTop40() {
  // One subrequest per series, all in parallel.
  const results = await Promise.all(
    WEATHER_SERIES.map(async (ticker) => {
      try {
        const resp = await fetch(
          `${KALSHI_BASE}/markets?series_ticker=${ticker}&status=open&limit=200`,
          { headers: { Accept: 'application/json' } }
        );
        if (!resp.ok) return [];
        const data = await resp.json();
        return (data.markets || []).map((m) => ({ ...m, _seriesTicker: ticker }));
      } catch {
        return [];
      }
    })
  );

  return results
    .flat()
    .map(mapMarket)
    .filter(Boolean)
    // Sort by 24-hour volume descending so the most active contracts come first
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, SITE_MARKET_LIMIT);
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

      const cache = caches.default;
      const cacheKey = new Request(`${url.origin}/api/weather-markets`);
      try {
        const cached = await cache.match(cacheKey);
        if (cached) return cached;
      } catch { /* ignore cache errors */ }

      let markets = [];
      try {
        markets = await fetchTop40();
      } catch { /* return empty array; frontend handles it gracefully */ }

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
