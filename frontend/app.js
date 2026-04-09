const strategyData = {
  research: {
    kicker: "Research Engine",
    title: "Machine-assisted research tuned for event markets, not vague narratives.",
    text:
      "We study Kalshi order books, contract specs, and catalyst timing across short-dated event markets, then force every idea through validation, resolution review, and execution testing.",
    points: [
      ["Signal Discovery", "Search for repeatable repricing around catalysts, order-flow imbalances, and contract design."],
      ["Resolution Audit", "We verify settlement language and edge cases before capital touches a market."],
      ["Human Review", "No model is promoted unless the logic is explainable to both research and live trading."]
    ]
  },
  risk: {
    kicker: "Risk Discipline",
    title: "Binary payoff markets demand hard risk framing from the first draft.",
    text:
      "We size exposure around event correlation, liquidity cliffs, and resolution uncertainty rather than pretending these contracts behave like smooth continuous markets.",
    points: [
      ["Position Limits", "Size stays bounded across related events, expiries, and crowded narratives."],
      ["Scenario Review", "We model ambiguous outcomes, late news, and venue-specific edge cases before trading live."],
      ["Live Monitors", "Liquidity, queue position, and order-book instability feed directly into throttles."]
    ]
  },
  execution: {
    kicker: "Execution Stack",
    title: "Execution built for Kalshi order books, fill dynamics, and fast repricing.",
    text:
      "Research, simulation, and live trading share the same market definitions, so decisions reflect the actual venue rather than an idealized backtest.",
    points: [
      ["Venue Context", "We track book depth, spread behavior, and contract-specific frictions in real time."],
      ["Observability", "Latency, fills, and cancel-replace behavior stay visible during the full trade cycle."],
      ["Tight Feedback", "Execution diagnostics feed back into model review while the event is still relevant."]
    ]
  }
};

const workflowData = {
  observe: {
    label: "Observe",
    title: "Collect, clean, and challenge event-market data.",
    text:
      "Every cycle begins with contract terms, order-book history, and catalyst calendars. We look for repeatable repricing, not stories we merely want to believe.",
    items: [
      "Normalize contract specs, venue states, and settlement rules.",
      "Compare implied probabilities against catalyst timing and flow.",
      "Flag thin or unstable books before they distort the research loop."
    ]
  },
  shape: {
    label: "Shape",
    title: "Turn event behavior into hypotheses with explicit failure modes.",
    text:
      "A useful idea is one that can be disproven quickly. We define what should happen around catalysts, where the order book may lie, and how the trade will be invalidated.",
    items: [
      "Frame logic in probabilities rather than narratives.",
      "Attach explicit invalidation tests and resolution review to every setup.",
      "Keep the path from prototype to live market visible from day one."
    ]
  },
  deploy: {
    label: "Trade",
    title: "Move from research conviction to live orders without losing the risk context.",
    text:
      "Setups go live only when sizing, liquidity expectations, and venue mechanics are understood by the same person placing the trade.",
    items: [
      "Test assumptions in paper and staged environments before deploying capital.",
      "Verify queueing, fills, and slippage during active markets.",
      "Document playbooks for event-time adjustments when conditions change."
    ]
  },
  refine: {
    label: "Refine",
    title: "Study outcomes continuously and sharpen the process after every market resolves.",
    text:
      "The work does not end at entry. We review fills, outcome distributions, and post-resolution behavior to keep the stack adaptive and honest.",
    items: [
      "Measure what improved and what only looked good in historical data.",
      "Reallocate capital toward setups that stay robust across event types.",
      "Fold live insight back into research, tooling, and risk design."
    ]
  }
};

const teamData = [
  {
    role: "Founder / CIO",
    name: "Evan Einbund",
    summary:
      "Leads research priorities, execution design, and the long-term direction of Hagakure.",
    bio:
      "Evan studied Mathematics, Statistics, and Business at the University of Michigan. He spent last summer interning at IMC Trading as a Research Analyst and is now pursuing a Master of Finance at the Massachusetts Institute of Technology."
  },
  {
    role: "Head of Lance",
    name: "Lance Zhang",
    summary:
      "Is Lance.",
    bio:
      "Lance doesn't actually do anything. The company felt as though Lance himself generates alpha."
  }
];

const roleData = [
  {
    category: "research",
    title: "Event Structure",
    location: "Resolution + settlement",
    type: "Research Lens",
    summary: "We look for markets where contract language, timing, and venue behavior create repeatable probability dislocations.",
    points: [
      "Review resolution criteria before capital ever touches a contract.",
      "Map how wording, timing, and edge cases can shift fair value.",
      "Treat settlement clarity as part of the edge, not an afterthought."
    ]
  },
  {
    category: "research",
    title: "Catalyst Timing",
    location: "Releases + repricing",
    type: "Research Lens",
    summary: "We focus on when new information reaches the market and how quickly order books digest it.",
    points: [
      "Track scheduled releases, headline windows, and information decay.",
      "Measure how implied probabilities move before, during, and after catalysts.",
      "Favor setups where speed and structure matter more than storytelling."
    ]
  },
  {
    category: "execution",
    title: "Order Book Tactics",
    location: "Liquidity + queueing",
    type: "Execution Lens",
    summary: "Execution on Kalshi is part of the strategy, so we care deeply about queue position, spread behavior, and fill quality.",
    points: [
      "Study when to post, take, cancel, and reprice without leaking edge.",
      "Monitor depth shifts and participant behavior through the full event cycle.",
      "Feed live execution observations back into model review in real time."
    ]
  },
  {
    category: "risk",
    title: "Binary Risk Framing",
    location: "Sizing + concentration",
    type: "Risk Lens",
    summary: "Binary payoff markets reward discipline, especially when several contracts are really the same bet in disguise.",
    points: [
      "Cap exposure across correlated narratives, expiries, and event clusters.",
      "Model bad paths around ambiguous outcomes and late-breaking information.",
      "Keep sizing rules strict when liquidity or clarity deteriorates."
    ]
  }
];

const weatherMarketCatalog = [
  {
    ticker: "WX-DET-RAIN-001",
    title: "Will Detroit officially record measurable rain by Friday close?",
    city: "Detroit",
    region: "Michigan",
    event: "Rain",
    descriptors: ["detroit", "rain", "precipitation", "michigan", "friday"],
    currentPrice: 0.58,
    yesBid: 0.57,
    yesAsk: 0.60,
    lastPrice: 0.59,
    volume: 184000,
    horizonHours: 22,
    signalBias: 0.18,
    volatility: 0.24
  },
  {
    ticker: "WX-DET-SNOW-002",
    title: "Will Detroit record at least 2 inches of snow this weekend?",
    city: "Detroit",
    region: "Michigan",
    event: "Snow",
    descriptors: ["detroit", "snow", "weekend", "michigan", "winter"],
    currentPrice: 0.34,
    yesBid: 0.32,
    yesAsk: 0.36,
    lastPrice: 0.33,
    volume: 126500,
    horizonHours: 41,
    signalBias: -0.11,
    volatility: 0.31
  },
  {
    ticker: "WX-CHI-WIND-003",
    title: "Will Chicago O'Hare see wind gusts above 25 mph by tonight?",
    city: "Chicago",
    region: "Illinois",
    event: "Wind",
    descriptors: ["chicago", "wind", "gusts", "illinois", "ohare"],
    currentPrice: 0.63,
    yesBid: 0.61,
    yesAsk: 0.65,
    lastPrice: 0.62,
    volume: 162000,
    horizonHours: 14,
    signalBias: 0.23,
    volatility: 0.28
  },
  {
    ticker: "WX-CHI-RAIN-004",
    title: "Will Chicago get at least 0.25 inches of rain tomorrow?",
    city: "Chicago",
    region: "Illinois",
    event: "Rain",
    descriptors: ["chicago", "rain", "precipitation", "illinois", "tomorrow"],
    currentPrice: 0.46,
    yesBid: 0.44,
    yesAsk: 0.48,
    lastPrice: 0.45,
    volume: 148400,
    horizonHours: 27,
    signalBias: 0.07,
    volatility: 0.27
  },
  {
    ticker: "WX-NYC-SNOW-005",
    title: "Will Central Park record at least 1 inch of snow tomorrow?",
    city: "New York",
    region: "New York",
    event: "Snow",
    descriptors: ["new york", "central park", "snow", "winter", "nyc"],
    currentPrice: 0.41,
    yesBid: 0.39,
    yesAsk: 0.43,
    lastPrice: 0.40,
    volume: 209300,
    horizonHours: 24,
    signalBias: -0.04,
    volatility: 0.33
  },
  {
    ticker: "WX-NYC-HEAT-006",
    title: "Will New York hit 85 degrees by Saturday afternoon?",
    city: "New York",
    region: "New York",
    event: "Heat",
    descriptors: ["new york", "temperature", "heat", "degrees", "nyc", "saturday"],
    currentPrice: 0.52,
    yesBid: 0.51,
    yesAsk: 0.54,
    lastPrice: 0.53,
    volume: 173900,
    horizonHours: 33,
    signalBias: 0.12,
    volatility: 0.22
  },
  {
    ticker: "WX-PHX-HEAT-007",
    title: "Will Phoenix hit 100 degrees this weekend?",
    city: "Phoenix",
    region: "Arizona",
    event: "Heat",
    descriptors: ["phoenix", "heat", "temperature", "arizona", "weekend"],
    currentPrice: 0.72,
    yesBid: 0.70,
    yesAsk: 0.74,
    lastPrice: 0.71,
    volume: 155700,
    horizonHours: 46,
    signalBias: 0.29,
    volatility: 0.19
  },
  {
    ticker: "WX-DAL-STORM-008",
    title: "Will Dallas log a severe thunderstorm warning tonight?",
    city: "Dallas",
    region: "Texas",
    event: "Storm",
    descriptors: ["dallas", "storm", "warning", "texas", "thunderstorm"],
    currentPrice: 0.38,
    yesBid: 0.36,
    yesAsk: 0.40,
    lastPrice: 0.39,
    volume: 134100,
    horizonHours: 12,
    signalBias: -0.08,
    volatility: 0.36
  },
  {
    ticker: "WX-MIA-RAIN-009",
    title: "Will Miami record afternoon rainfall tomorrow?",
    city: "Miami",
    region: "Florida",
    event: "Rain",
    descriptors: ["miami", "rain", "florida", "afternoon", "precipitation"],
    currentPrice: 0.66,
    yesBid: 0.64,
    yesAsk: 0.68,
    lastPrice: 0.65,
    volume: 166800,
    horizonHours: 19,
    signalBias: 0.21,
    volatility: 0.21
  },
  {
    ticker: "WX-DEN-SNOW-010",
    title: "Will Denver receive 4 inches of snow before Monday morning?",
    city: "Denver",
    region: "Colorado",
    event: "Snow",
    descriptors: ["denver", "snow", "colorado", "monday", "winter"],
    currentPrice: 0.48,
    yesBid: 0.46,
    yesAsk: 0.50,
    lastPrice: 0.47,
    volume: 144600,
    horizonHours: 54,
    signalBias: 0.05,
    volatility: 0.34
  },
  {
    ticker: "WX-ATL-TEMP-011",
    title: "Will Atlanta stay above 70 degrees overnight?",
    city: "Atlanta",
    region: "Georgia",
    event: "Temperature",
    descriptors: ["atlanta", "temperature", "overnight", "georgia", "degrees"],
    currentPrice: 0.57,
    yesBid: 0.56,
    yesAsk: 0.59,
    lastPrice: 0.58,
    volume: 118200,
    horizonHours: 15,
    signalBias: 0.09,
    volatility: 0.18
  },
  {
    ticker: "WX-BOS-WIND-012",
    title: "Will Boston Logan see sustained winds above 20 mph tomorrow?",
    city: "Boston",
    region: "Massachusetts",
    event: "Wind",
    descriptors: ["boston", "wind", "logan", "massachusetts", "tomorrow"],
    currentPrice: 0.44,
    yesBid: 0.42,
    yesAsk: 0.46,
    lastPrice: 0.45,
    volume: 139800,
    horizonHours: 29,
    signalBias: -0.02,
    volatility: 0.26
  }
];

const pricerPhaseText = [
  "Search weather markets from your keyword.",
  "Estimate mu and sigma from the path.",
  "Solve the PDE anchor and run Euler-Maruyama futures.",
  "Return the most correlated weather contracts."
];

const pricerState = {
  keyword: "",
  correlatedCount: 5,
  filteredMarkets: [],
  selectedTicker: "",
  result: null,
  loading: false,
  phaseIndex: 0,
  runId: 0
};

const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const counterNodes = document.querySelectorAll("[data-counter]");
const strategyTabs = document.querySelectorAll(".strategy-tab");
const strategyKicker = document.getElementById("strategy-kicker");
const strategyTitle = document.getElementById("strategy-title");
const strategyText = document.getElementById("strategy-text");
const strategyMatrix = document.getElementById("strategy-matrix");
const workflowSteps = document.querySelectorAll(".workflow-step");
const workflowLabel = document.getElementById("workflow-label");
const workflowTitle = document.getElementById("workflow-title");
const workflowText = document.getElementById("workflow-text");
const workflowList = document.getElementById("workflow-list");
const teamGrid = document.getElementById("team-grid");
const teamDetail = document.getElementById("team-detail");
const roleGrid = document.getElementById("role-grid");
const roleDetail = document.getElementById("role-detail");
const roleFilters = document.querySelectorAll(".role-filter");
const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");
const pricerKeywordInput = document.getElementById("pricer-keyword");
const pricerSearchButton = document.getElementById("pricer-search");
const pricerKeywordChips = document.querySelectorAll("[data-keyword-chip]");
const pricerCorrelationInput = document.getElementById("pricer-correlation-count");
const pricerCorrelationOutput = document.getElementById("pricer-correlation-output");
const pricerRunButton = document.getElementById("pricer-run");
const pricerStatusTitle = document.getElementById("pricer-status-title");
const pricerStatusText = document.getElementById("pricer-status-text");
const pricerWarning = document.getElementById("pricer-warning");
const pricerModeBadge = document.getElementById("pricer-mode-badge");
const pricerMarketList = document.getElementById("pricer-market-list");
const pricerMarketCount = document.getElementById("pricer-market-count");
const pricerSummaryGrid = document.getElementById("pricer-summary-grid");
const pricerSelectedLabel = document.getElementById("pricer-selected-label");
const pricerCorrelationLabel = document.getElementById("pricer-correlation-label");
const pricerCorrelationList = document.getElementById("pricer-correlation-list");
const pricerPhaseList = document.getElementById("pricer-phase-list");
const pricerNetworkCanvas = document.getElementById("pricer-network");
const pricerNetworkFrame = document.getElementById("pricer-network-frame");
const pricerPathCanvas = document.getElementById("pricer-path-chart");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values) {
  if (values.length < 2) return 0;
  const mean = average(values);
  const variance = average(values.map((value) => (value - mean) ** 2));
  return Math.sqrt(variance);
}

function quantile(values, ratio) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * ratio;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function logit(probability) {
  const clamped = clamp(probability, 0.001, 0.999);
  return Math.log(clamped / (1 - clamped));
}

function formatCents(value) {
  return `${(value * 100).toFixed(1)}c`;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatSigned(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(3)}`;
}

function formatVolume(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return `${value}`;
}

function hashString(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function gaussianRandom(random) {
  let u = 0;
  let v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function resizeCanvasToDisplaySize(canvas) {
  if (!canvas) return { width: 0, height: 0 };
  const ratio = window.devicePixelRatio || 1;
  const width = Math.floor(canvas.clientWidth * ratio);
  const height = Math.floor(canvas.clientHeight * ratio);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height, ratio };
}

function renderStrategy(key) {
  const entry = strategyData[key];
  if (!entry) return;

  strategyKicker.textContent = entry.kicker;
  strategyTitle.textContent = entry.title;
  strategyText.textContent = entry.text;
  strategyMatrix.innerHTML = entry.points
    .map(
      ([title, body]) => `
        <article class="matrix-item">
          <strong>${title}</strong>
          <span>${body}</span>
        </article>
      `
    )
    .join("");

  strategyTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.strategy === key);
  });
}

function renderWorkflow(key) {
  const entry = workflowData[key];
  if (!entry) return;

  workflowLabel.textContent = entry.label;
  workflowTitle.textContent = entry.title;
  workflowText.textContent = entry.text;
  workflowList.innerHTML = entry.items.map((item) => `<li>${item}</li>`).join("");

  workflowSteps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.step === key);
  });
}

function renderTeam(index) {
  const person = teamData[index];
  if (!person || !teamGrid || !teamDetail) return;

  teamGrid.innerHTML = teamData
    .map(
      (member, memberIndex) => `
        <article class="team-card ${memberIndex === index ? "is-active" : ""}" data-person="${memberIndex}">
          <span class="team-role">${member.role}</span>
          <h3>${member.name}</h3>
          <p>${member.summary}</p>
        </article>
      `
    )
    .join("");

  teamDetail.innerHTML = `
    <p class="team-detail-role">${person.role}</p>
    <h3>${person.name}</h3>
    <p>${person.bio}</p>
  `;

  teamGrid.querySelectorAll(".team-card").forEach((card) => {
    card.addEventListener("click", () => {
      const nextIndex = Number(card.dataset.person);
      renderTeam(nextIndex);
    });
  });
}

function renderRoles(filter = "all", activeIndex = 0) {
  if (!roleGrid || !roleDetail) return;

  const filtered = roleData.filter((role) => filter === "all" || role.category === filter);

  if (!filtered.length) {
    roleGrid.innerHTML = "";
    roleDetail.innerHTML = `
      <p class="role-detail-kicker">No focus areas</p>
      <h3>Nothing is highlighted in this category right now.</h3>
      <p>Use the contact form below if you want to talk event markets, tooling, or research process.</p>
      <ul class="role-points"></ul>
    `;
    return;
  }

  roleGrid.innerHTML = filtered
    .map(
      (role, index) => `
        <article class="role-card ${index === activeIndex ? "is-active" : ""}" data-rendered-role="${index}">
          <div class="role-card-meta">
            <span>${role.category}</span>
            <span>${role.type}</span>
          </div>
          <h3>${role.title}</h3>
          <p>${role.summary}</p>
          <div class="role-card-meta">
            <span>${role.location}</span>
            <span>View lens</span>
          </div>
        </article>
      `
    )
    .join("");

  const current = filtered[activeIndex] || filtered[0];
  if (current) {
    roleDetail.innerHTML = `
      <p class="role-detail-kicker">${current.category}</p>
      <h3>${current.title}</h3>
      <p>${current.summary}</p>
      <ul class="role-points">
        ${current.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    `;
  }

  document.querySelectorAll(".role-card").forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.renderedRole);
      renderRoles(filter, index);
    });
  });
}

function initCounters() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target;
        const target = Number(node.dataset.counter);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = target === 99 ? `${Math.round(target * eased)}%` : Math.round(target * eased);
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        }

        requestAnimationFrame(tick);
        obs.unobserve(node);
      });
    },
    { threshold: 0.5 }
  );

  counterNodes.forEach((node) => observer.observe(node));
}

function initReveal() {
  const revealNodes = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function initNavTracking() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === activeId);
        });
      });
    },
    { rootMargin: "-40% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initChart() {
  const canvas = document.getElementById("pulse-chart");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;
  const readiness = document.getElementById("signal-readiness");
  const latency = document.getElementById("latency-budget");
  let phase = 0;

  function draw() {
    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(255, 90, 102, 0.95)");
    gradient.addColorStop(1, "rgba(162, 13, 28, 0.32)");

    context.strokeStyle = "rgba(255, 255, 255, 0.07)";
    context.lineWidth = 1;
    for (let i = 0; i <= 5; i += 1) {
      const y = (height / 5) * i;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    context.strokeStyle = gradient;
    context.lineWidth = 3;
    context.beginPath();

    for (let x = 0; x <= width; x += 8) {
      const waveA = Math.sin(x * 0.03 + phase) * 24;
      const waveB = Math.cos(x * 0.014 + phase * 1.7) * 18;
      const drift = Math.sin(x * 0.007 + phase * 0.3) * 10;
      const y = height * 0.55 + waveA + waveB + drift;
      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.stroke();

    const readinessValue = 89 + (Math.sin(phase * 0.9) + 1) * 2.2;
    const latencyValue = 3.2 + (Math.cos(phase * 0.6) + 1) * 0.45;
    readiness.textContent = `${readinessValue.toFixed(1)}%`;
    latency.textContent = `${latencyValue.toFixed(1)} ms`;

    phase += 0.025;
    requestAnimationFrame(draw);
  }

  draw();
}

function getSelectedPricerMarket() {
  return pricerState.filteredMarkets.find((market) => market.ticker === pricerState.selectedTicker) || null;
}

function scoreMarketAgainstKeyword(market, keyword) {
  const normalized = keyword.trim().toLowerCase();
  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (!tokens.length) return 1;

  const searchText = [market.title, market.city, market.region, market.event, ...(market.descriptors || [])]
    .join(" ")
    .toLowerCase();

  let score = 0;
  tokens.forEach((token) => {
    if (market.city.toLowerCase() === token) score += 6;
    if (market.event.toLowerCase() === token) score += 5;
    if (searchText.includes(token)) score += 3;
    if (market.title.toLowerCase().startsWith(token)) score += 1;
  });

  return score;
}

function searchWeatherMarkets(keyword) {
  return weatherMarketCatalog
    .map((market) => ({ ...market, score: scoreMarketAgainstKeyword(market, keyword) }))
    .filter((market) => market.score > 0)
    .sort((left, right) => (right.score - left.score) || (right.volume - left.volume))
    .slice(0, 6);
}

function vectorForMarket(market) {
  return [
    market.currentPrice,
    market.yesBid,
    market.yesAsk,
    market.lastPrice,
    clamp(market.horizonHours / 72, 0, 1),
    clamp(market.signalBias + 0.5, 0, 1),
    clamp(market.volatility, 0, 1)
  ];
}

function cosineSimilarity(left, right) {
  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;
  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftNorm += left[index] ** 2;
    rightNorm += right[index] ** 2;
  }
  const denominator = Math.sqrt(leftNorm) * Math.sqrt(rightNorm);
  return denominator ? dot / denominator : 0;
}

function findCorrelatedMarkets(targetMarket, count) {
  const targetVector = vectorForMarket(targetMarket);
  return weatherMarketCatalog
    .filter((market) => market.ticker !== targetMarket.ticker)
    .map((market) => ({
      ...market,
      correlation: cosineSimilarity(targetVector, vectorForMarket(market))
    }))
    .sort((left, right) => right.correlation - left.correlation)
    .slice(0, count);
}

function buildObservedPath(market, seed) {
  const random = createSeededRandom(seed);
  const steps = 48;
  let value = clamp(
    market.currentPrice - market.signalBias * 0.08 + (random() - 0.5) * 0.08,
    0.06,
    0.94
  );
  const path = [];

  for (let step = 0; step < steps; step += 1) {
    const progress = step / (steps - 1);
    const wave = Math.sin(progress * Math.PI * 2.2 + random() * 0.8) * market.volatility * 0.06;
    const driftTarget = market.currentPrice + wave + market.signalBias * (progress - 0.42) * 0.1;
    const shock = gaussianRandom(random) * market.volatility * 0.016;
    value = clamp(value + (driftTarget - value) * 0.24 + shock, 0.03, 0.97);
    path.push(value);
  }

  path[path.length - 1] = market.currentPrice;
  return path;
}

function estimateMuSigma(path, market) {
  const logits = path.map((value) => logit(value));
  const diffs = logits.slice(1).map((value, index) => value - logits[index]);
  const meanDiff = average(diffs);
  const realizedVol = standardDeviation(diffs);

  return {
    mu: clamp(meanDiff * 5.8 + market.signalBias * 0.45, -0.45, 0.45),
    sigma: clamp(realizedVol * 7.4 + market.volatility * 0.58 + 0.05, 0.08, 0.72)
  };
}

function solvePdeAnchor(currentPrice, mu, sigma, horizonHours) {
  const horizonScale = clamp(horizonHours / 30, 0.45, 1.8);
  const pullToMiddle = (0.5 - currentPrice) * 0.08;
  const anchor = currentPrice + mu * 0.11 * horizonScale - sigma * 0.024 * horizonScale + pullToMiddle;
  return clamp(anchor, 0.01, 0.99);
}

function runEulerMaruyama(currentPrice, mu, sigma, horizonHours, seed) {
  const pathCount = 180;
  const steps = clamp(Math.round(horizonHours * 1.4), 18, 52);
  const dt = 1 / steps;
  const allPaths = [];

  for (let pathIndex = 0; pathIndex < pathCount; pathIndex += 1) {
    const random = createSeededRandom(seed + pathIndex * 977);
    let latent = logit(currentPrice);
    const probabilities = [currentPrice];

    for (let step = 0; step < steps; step += 1) {
      const shock = gaussianRandom(random);
      latent += (mu - 0.55 * latent) * dt + sigma * Math.sqrt(dt) * shock * 0.42;
      probabilities.push(clamp(sigmoid(latent), 0.01, 0.99));
    }

    allPaths.push(probabilities);
  }

  const meanPath = [];
  const lowerPath = [];
  const upperPath = [];
  for (let step = 0; step <= steps; step += 1) {
    const column = allPaths.map((path) => path[step]);
    meanPath.push(average(column));
    lowerPath.push(quantile(column, 0.1));
    upperPath.push(quantile(column, 0.9));
  }

  return {
    finals: allPaths.map((path) => path[path.length - 1]),
    meanPath,
    lowerPath,
    upperPath
  };
}

function simulatePricerResult(market, keyword, correlatedCount) {
  const seed = hashString(`${market.ticker}:${keyword}:${correlatedCount}`);
  const observedPath = buildObservedPath(market, seed);
  const { mu, sigma } = estimateMuSigma(observedPath, market);
  const pdeAnchor = solvePdeAnchor(market.currentPrice, mu, sigma, market.horizonHours);
  const monteCarlo = runEulerMaruyama(market.currentPrice, mu, sigma, market.horizonHours, seed + 17);
  const predictedPrice = average(monteCarlo.finals);
  const standardError = standardDeviation(monteCarlo.finals) / Math.sqrt(monteCarlo.finals.length);
  const confidenceInterval = [
    clamp(predictedPrice - 1.96 * standardError, 0.01, 0.99),
    clamp(predictedPrice + 1.96 * standardError, 0.01, 0.99)
  ];

  return {
    market,
    observedPath,
    mu,
    sigma,
    pdeAnchor,
    predictedPrice,
    confidenceInterval,
    terminalInterval: [
      clamp(quantile(monteCarlo.finals, 0.05), 0.01, 0.99),
      clamp(quantile(monteCarlo.finals, 0.95), 0.01, 0.99)
    ],
    forecastMeanPath: monteCarlo.meanPath,
    forecastLowerPath: monteCarlo.lowerPath,
    forecastUpperPath: monteCarlo.upperPath,
    correlatedMarkets: findCorrelatedMarkets(market, correlatedCount)
  };
}

function setPricerStatus(mode, title, text, showWarning = false) {
  if (pricerModeBadge) pricerModeBadge.textContent = mode;
  if (pricerStatusTitle) pricerStatusTitle.textContent = title;
  if (pricerStatusText) pricerStatusText.textContent = text;
  if (pricerWarning) pricerWarning.hidden = !showWarning;
  pricerNetworkFrame?.classList.toggle("is-loading", showWarning);
}

function renderPricerPhaseList(activeIndex, complete = false) {
  if (!pricerPhaseList) return;
  pricerPhaseList.querySelectorAll("li").forEach((item, index) => {
    item.classList.toggle("is-active", !complete && index === activeIndex);
    item.classList.toggle("is-complete", complete || index < activeIndex);
  });
}

function syncPricerControls() {
  const hasSelection = Boolean(getSelectedPricerMarket());
  if (pricerRunButton) {
    pricerRunButton.disabled = pricerState.loading || !hasSelection;
    pricerRunButton.textContent = pricerState.loading ? "Pricing..." : "Price This Contract";
  }
  if (pricerSearchButton) pricerSearchButton.disabled = pricerState.loading;
  if (pricerKeywordInput) pricerKeywordInput.disabled = pricerState.loading;
  if (pricerCorrelationInput) pricerCorrelationInput.disabled = pricerState.loading;
  pricerKeywordChips.forEach((chip) => {
    chip.disabled = pricerState.loading;
  });
}

function updatePricerSelectionLabel() {
  const market = getSelectedPricerMarket();
  if (pricerSelectedLabel) {
    pricerSelectedLabel.textContent = market ? market.ticker : "No contract selected";
  }
}

function renderPricerMarketList() {
  if (!pricerMarketList || !pricerMarketCount) return;

  const selected = getSelectedPricerMarket();
  pricerMarketCount.textContent = `${pricerState.filteredMarkets.length} loaded`;

  if (!pricerState.filteredMarkets.length) {
    pricerMarketList.innerHTML = `
      <article class="pricer-empty">
        No weather contracts matched that keyword. Try rain, snow, heat, wind, Detroit, or New York.
      </article>
    `;
    updatePricerSelectionLabel();
    syncPricerControls();
    return;
  }

  pricerMarketList.innerHTML = pricerState.filteredMarkets
    .map(
      (market) => `
        <button
          class="pricer-market-item ${selected?.ticker === market.ticker ? "is-active" : ""}"
          type="button"
          data-market-ticker="${market.ticker}"
          ${pricerState.loading ? "disabled" : ""}
        >
          <div class="pricer-market-top">
            <div>
              <span class="pricer-market-city">${market.city}</span>
              <h3>${market.title}</h3>
            </div>
            <span class="pricer-inline-pill">${market.event}</span>
          </div>
          <p>${market.region} · ${market.horizonHours}h horizon · ${formatVolume(market.volume)} volume</p>
          <div class="pricer-market-meta">
            <span>Last ${formatCents(market.lastPrice)}</span>
            <span>Bid ${formatCents(market.yesBid)}</span>
            <span>Ask ${formatCents(market.yesAsk)}</span>
          </div>
        </button>
      `
    )
    .join("");

  pricerMarketList.querySelectorAll("[data-market-ticker]").forEach((button) => {
    button.addEventListener("click", () => {
      pricerState.selectedTicker = button.dataset.marketTicker || "";
      pricerState.result = null;
      renderPricerMarketList();
      renderPricerSummary(null);
      renderPricerCorrelatedMarkets(null);
      drawPricerPathChart(null);
      updatePricerSelectionLabel();
      const market = getSelectedPricerMarket();
      if (market) {
        setPricerStatus(
          "Primed",
          `${market.city} weather contract locked.`,
          `Now pick how many correlated markets you want back, then price ${market.ticker}.`,
          false
        );
      }
      syncPricerControls();
    });
  });

  updatePricerSelectionLabel();
  syncPricerControls();
}

function renderPricerSummary(result) {
  if (!pricerSummaryGrid) return;

  if (!result) {
    pricerSummaryGrid.innerHTML = `
      <article class="pricer-summary-card">
        <span class="pricer-summary-kicker">Predicted Price</span>
        <strong>--</strong>
        <p>Run the demo to estimate a toy fair value.</p>
      </article>
      <article class="pricer-summary-card">
        <span class="pricer-summary-kicker">95% Confidence Interval</span>
        <strong>--</strong>
        <p>Monte Carlo uncertainty will land here.</p>
      </article>
      <article class="pricer-summary-card">
        <span class="pricer-summary-kicker">PDE Anchor</span>
        <strong>--</strong>
        <p>The deterministic anchor price shows up here.</p>
      </article>
      <article class="pricer-summary-card">
        <span class="pricer-summary-kicker">Demo MLP</span>
        <strong>mu -- / sigma --</strong>
        <p>The site estimates parameters from a synthetic path.</p>
      </article>
      <article class="pricer-summary-card">
        <span class="pricer-summary-kicker">Current Market</span>
        <strong>--</strong>
        <p>Select a weather contract to begin.</p>
      </article>
      <article class="pricer-summary-card">
        <span class="pricer-summary-kicker">Terminal Range</span>
        <strong>--</strong>
        <p>Terminal path dispersion appears after pricing.</p>
      </article>
    `;
    return;
  }

  const edge = result.predictedPrice - result.market.lastPrice;

  pricerSummaryGrid.innerHTML = `
    <article class="pricer-summary-card">
      <span class="pricer-summary-kicker">Predicted Price</span>
      <strong>${formatCents(result.predictedPrice)}</strong>
      <p>Demo mean fair value after Euler-Maruyama simulation.</p>
    </article>
    <article class="pricer-summary-card">
      <span class="pricer-summary-kicker">95% Confidence Interval</span>
      <strong>${formatCents(result.confidenceInterval[0])} - ${formatCents(result.confidenceInterval[1])}</strong>
      <p>Confidence interval for the predicted contract price.</p>
    </article>
    <article class="pricer-summary-card">
      <span class="pricer-summary-kicker">PDE Anchor</span>
      <strong>${formatCents(result.pdeAnchor)}</strong>
      <p>Deterministic anchor before the futures simulation fans out.</p>
    </article>
    <article class="pricer-summary-card">
      <span class="pricer-summary-kicker">Demo MLP</span>
      <strong>mu ${formatSigned(result.mu)} / sigma ${result.sigma.toFixed(3)}</strong>
      <p>Path-implied parameters from the toy calibration step.</p>
    </article>
    <article class="pricer-summary-card">
      <span class="pricer-summary-kicker">Current Market</span>
      <strong>${formatCents(result.market.lastPrice)}</strong>
      <p>${edge >= 0 ? "Model edge" : "Model discount"} ${formatCents(Math.abs(edge))} vs. last trade.</p>
    </article>
    <article class="pricer-summary-card">
      <span class="pricer-summary-kicker">Terminal Range</span>
      <strong>${formatCents(result.terminalInterval[0])} - ${formatCents(result.terminalInterval[1])}</strong>
      <p>90% of simulated terminal paths settled inside this band.</p>
    </article>
  `;
}

function renderPricerCorrelatedMarkets(result) {
  if (!pricerCorrelationList || !pricerCorrelationLabel) return;

  pricerCorrelationLabel.textContent = `Top ${pricerState.correlatedCount}`;

  if (!result) {
    pricerCorrelationList.innerHTML = `
      <article class="pricer-empty">
        Price a contract and the graph-style correlation panel will return the top ${pricerState.correlatedCount} weather markets.
      </article>
    `;
    return;
  }

  pricerCorrelationList.innerHTML = result.correlatedMarkets
    .map(
      (market, index) => `
        <article class="pricer-correlation-item">
          <span class="pricer-correlation-rank">${String(index + 1).padStart(2, "0")}</span>
          <div class="pricer-correlation-copy">
            <strong>${market.title}</strong>
            <p>${market.city} · ${market.event} · corr ${formatPercent(market.correlation)}</p>
          </div>
          <span class="pricer-inline-pill">${formatCents(market.lastPrice)}</span>
        </article>
      `
    )
    .join("");
}

function drawPricerPathChart(result) {
  if (!pricerPathCanvas) return;

  const context = pricerPathCanvas.getContext("2d");
  if (!context) return;

  const { width, height } = resizeCanvasToDisplaySize(pricerPathCanvas);
  const padding = 26 * (window.devicePixelRatio || 1);
  context.clearRect(0, 0, width, height);

  const gridColor = "rgba(255, 255, 255, 0.07)";
  context.strokeStyle = gridColor;
  context.lineWidth = 1;
  for (let index = 0; index <= 4; index += 1) {
    const y = padding + ((height - padding * 2) / 4) * index;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }

  if (!result) {
    context.fillStyle = "rgba(244, 239, 232, 0.62)";
    context.font = `${15 * (window.devicePixelRatio || 1)}px IBM Plex Sans`;
    context.fillText("Observed path and forecast ribbon will appear here.", padding, height / 2);
    return;
  }

  const observed = result.observedPath;
  const forecastMean = result.forecastMeanPath.slice(1);
  const forecastLower = result.forecastLowerPath.slice(1);
  const forecastUpper = result.forecastUpperPath.slice(1);
  const totalPoints = observed.length + forecastMean.length;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const xForIndex = (index) => padding + (chartWidth * index) / Math.max(totalPoints - 1, 1);
  const yForValue = (value) => height - padding - chartHeight * value;

  context.fillStyle = "rgba(255, 70, 83, 0.1)";
  context.beginPath();
  forecastUpper.forEach((value, index) => {
    const x = xForIndex(observed.length - 1 + index);
    const y = yForValue(value);
    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  for (let index = forecastLower.length - 1; index >= 0; index -= 1) {
    const x = xForIndex(observed.length - 1 + index);
    const y = yForValue(forecastLower[index]);
    context.lineTo(x, y);
  }
  context.closePath();
  context.fill();

  context.strokeStyle = "rgba(244, 239, 232, 0.7)";
  context.lineWidth = 2.4 * (window.devicePixelRatio || 1);
  context.beginPath();
  observed.forEach((value, index) => {
    const x = xForIndex(index);
    const y = yForValue(value);
    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.stroke();

  context.strokeStyle = "rgba(255, 70, 83, 0.95)";
  context.lineWidth = 3 * (window.devicePixelRatio || 1);
  context.beginPath();
  forecastMean.forEach((value, index) => {
    const x = xForIndex(observed.length - 1 + index);
    const y = yForValue(value);
    if (index === 0) {
      context.moveTo(x, yForValue(observed[observed.length - 1]));
    }
    context.lineTo(x, y);
  });
  context.stroke();

  const currentX = xForIndex(observed.length - 1);
  const currentY = yForValue(observed[observed.length - 1]);
  const predictedX = xForIndex(totalPoints - 1);
  const predictedY = yForValue(result.predictedPrice);

  context.fillStyle = "#f4efe8";
  context.beginPath();
  context.arc(currentX, currentY, 4 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#ff4653";
  context.beginPath();
  context.arc(predictedX, predictedY, 4.8 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "rgba(244, 239, 232, 0.72)";
  context.font = `${12 * (window.devicePixelRatio || 1)}px IBM Plex Sans`;
  context.fillText("Observed path", padding, padding - 6 * (window.devicePixelRatio || 1));
  context.fillStyle = "rgba(255, 70, 83, 0.82)";
  context.fillText("Projected mean + forecast band", padding + 140 * (window.devicePixelRatio || 1), padding - 6 * (window.devicePixelRatio || 1));
}

const pricerNetworkState = {
  nodes: [],
  edges: []
};

function initPricerNetwork() {
  if (!pricerNetworkCanvas) return;

  const baseSeed = hashString("hagakure-pricer-network");
  pricerNetworkState.nodes = weatherMarketCatalog.map((market, index) => {
    const random = createSeededRandom(baseSeed + index * 97);
    return {
      market,
      x: 0.08 + random() * 0.84,
      y: 0.12 + random() * 0.72,
      vx: (random() - 0.5) * 0.0018,
      vy: (random() - 0.5) * 0.0014,
      radius: 4 + random() * 2.8
    };
  });

  pricerNetworkState.edges = [];
  for (let leftIndex = 0; leftIndex < pricerNetworkState.nodes.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < pricerNetworkState.nodes.length; rightIndex += 1) {
      const left = weatherMarketCatalog[leftIndex];
      const right = weatherMarketCatalog[rightIndex];
      const sameEvent = left.event === right.event;
      const sameRegion = left.region === right.region;
      const similarity = cosineSimilarity(vectorForMarket(left), vectorForMarket(right));
      if (similarity > 0.985 || sameEvent || sameRegion) {
        pricerNetworkState.edges.push([leftIndex, rightIndex, similarity]);
      }
    }
  }

  const context = pricerNetworkCanvas.getContext("2d");
  if (!context) return;

  function draw(now) {
    const { width, height } = resizeCanvasToDisplaySize(pricerNetworkCanvas);
    context.clearRect(0, 0, width, height);

    context.fillStyle = "rgba(4, 4, 4, 0.18)";
    context.fillRect(0, 0, width, height);

    const selectedTicker = pricerState.selectedTicker;
    const matchedTickers = new Set(pricerState.filteredMarkets.map((market) => market.ticker));
    const pulse = pricerState.loading ? 0.55 + 0.45 * Math.sin(now * 0.01) : 0.35 + 0.2 * Math.sin(now * 0.004);

    pricerNetworkState.nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0.06 || node.x > 0.94) node.vx *= -1;
      if (node.y < 0.12 || node.y > 0.88) node.vy *= -1;
    });

    pricerNetworkState.edges.forEach(([leftIndex, rightIndex, similarity]) => {
      const left = pricerNetworkState.nodes[leftIndex];
      const right = pricerNetworkState.nodes[rightIndex];
      const leftX = left.x * width;
      const leftY = left.y * height;
      const rightX = right.x * width;
      const rightY = right.y * height;
      const highlighted =
        left.market.ticker === selectedTicker ||
        right.market.ticker === selectedTicker ||
        (matchedTickers.has(left.market.ticker) && matchedTickers.has(right.market.ticker));
      const alpha = highlighted ? 0.28 + pulse * 0.24 : 0.06 + similarity * 0.08;

      context.strokeStyle = highlighted ? `rgba(255, 94, 106, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      context.lineWidth = highlighted ? 1.5 * (window.devicePixelRatio || 1) : 1 * (window.devicePixelRatio || 1);
      context.beginPath();
      context.moveTo(leftX, leftY);
      context.lineTo(rightX, rightY);
      context.stroke();
    });

    if (pricerState.loading && selectedTicker) {
      const selectedNode = pricerNetworkState.nodes.find((node) => node.market.ticker === selectedTicker);
      if (selectedNode) {
        const centerX = selectedNode.x * width;
        const centerY = selectedNode.y * height;
        const ringRadius = (32 + pulse * 18) * (window.devicePixelRatio || 1);
        context.strokeStyle = `rgba(255, 70, 83, ${0.18 + pulse * 0.32})`;
        context.lineWidth = 2 * (window.devicePixelRatio || 1);
        context.beginPath();
        context.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        context.stroke();
      }
    }

    pricerNetworkState.nodes.forEach((node) => {
      const x = node.x * width;
      const y = node.y * height;
      const isSelected = node.market.ticker === selectedTicker;
      const isMatched = matchedTickers.has(node.market.ticker);
      const radius = (node.radius + (isSelected ? 2.5 : 0) + (pricerState.loading && isMatched ? pulse * 2 : 0))
        * (window.devicePixelRatio || 1);

      const gradient = context.createRadialGradient(x, y, 0, x, y, radius * 3.2);
      if (isSelected) {
        gradient.addColorStop(0, "rgba(255, 116, 126, 1)");
        gradient.addColorStop(1, "rgba(255, 116, 126, 0)");
      } else if (isMatched) {
        gradient.addColorStop(0, "rgba(255, 82, 94, 0.72)");
        gradient.addColorStop(1, "rgba(255, 82, 94, 0)");
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.34)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius * 3, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = isSelected ? "#ff6672" : isMatched ? "rgba(255, 135, 145, 0.95)" : "rgba(244, 239, 232, 0.8)";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

function executePricerSearch(keyword) {
  pricerState.keyword = keyword.trim();
  pricerState.filteredMarkets = searchWeatherMarkets(pricerState.keyword);
  pricerState.selectedTicker = pricerState.filteredMarkets[0]?.ticker || "";
  pricerState.result = null;
  renderPricerMarketList();
  renderPricerSummary(null);
  renderPricerCorrelatedMarkets(null);
  drawPricerPathChart(null);
  updatePricerSelectionLabel();
  renderPricerPhaseList(0, false);

  if (pricerState.filteredMarkets.length) {
    const market = getSelectedPricerMarket();
    setPricerStatus(
      "Search Ready",
      `${pricerState.filteredMarkets.length} weather markets matched.`,
      `Pick a contract, set the correlated-market count, and let the demo price ${market ? market.ticker : "the selected market"}.`,
      false
    );
  } else {
    setPricerStatus(
      "No Match",
      "No weather markets matched that keyword.",
      "Try a broader weather term like rain, snow, heat, wind, Detroit, Chicago, or New York.",
      false
    );
  }

  syncPricerControls();
}

function runPricerDemo() {
  const market = getSelectedPricerMarket();
  if (!market || pricerState.loading) return;

  const runId = pricerState.runId + 1;
  pricerState.runId = runId;
  pricerState.loading = true;
  pricerState.result = null;
  renderPricerSummary(null);
  renderPricerCorrelatedMarkets(null);
  drawPricerPathChart(null);
  syncPricerControls();

  const stages = [
    {
      mode: "Locking",
      title: `Locking ${market.ticker} into the weather-only demo.`,
      text: `Keyword "${pricerState.keyword || market.event}" is shaping the candidate set and the graph neighborhood.`
    },
    {
      mode: "Calibrating",
      title: "Estimating mu and sigma from the observed path.",
      text: "The demo MLP is peering at synthetic path behavior and pretending it is wiser than it probably is."
    },
    {
      mode: "Solving",
      title: "Solving the PDE anchor.",
      text: "A toy fair-value surface is being stitched together before the stochastic futures get loud."
    },
    {
      mode: "Simulating",
      title: "Running Euler-Maruyama futures and graph correlation.",
      text: `Projecting weather paths, averaging terminal prices, and pulling back the top ${pricerState.correlatedCount} correlated markets.`
    }
  ];

  stages.forEach((stage, index) => {
    window.setTimeout(() => {
      if (pricerState.runId !== runId) return;
      pricerState.phaseIndex = index;
      setPricerStatus(stage.mode, stage.title, stage.text, true);
      renderPricerPhaseList(index, false);
    }, index * 700);
  });

  window.setTimeout(() => {
    if (pricerState.runId !== runId) return;
    pricerState.loading = false;
    pricerState.result = simulatePricerResult(market, pricerState.keyword, pricerState.correlatedCount);
    renderPricerSummary(pricerState.result);
    renderPricerCorrelatedMarkets(pricerState.result);
    drawPricerPathChart(pricerState.result);
    renderPricerPhaseList(pricerPhaseText.length - 1, true);
    setPricerStatus(
      "Ready",
      `${market.ticker} demo fair value: ${formatCents(pricerState.result.predictedPrice)}.`,
      `95% CI ${formatCents(pricerState.result.confidenceInterval[0])} to ${formatCents(pricerState.result.confidenceInterval[1])}. Top ${pricerState.correlatedCount} correlated weather markets are now below.`,
      false
    );
    syncPricerControls();
  }, stages.length * 700 + 260);
}

function initPricer() {
  if (!pricerKeywordInput || !pricerSearchButton || !pricerRunButton) return;

  if (pricerCorrelationOutput && pricerCorrelationInput) {
    pricerCorrelationOutput.textContent = pricerCorrelationInput.value;
  }
  renderPricerSummary(null);
  renderPricerCorrelatedMarkets(null);
  drawPricerPathChart(null);
  renderPricerPhaseList(0, false);
  setPricerStatus(
    "Idle",
    "Waiting for a weather keyword.",
    "Start with rain, snow, heat, wind, temperature, Detroit, Chicago, or New York.",
    false
  );
  syncPricerControls();
  initPricerNetwork();

  pricerSearchButton.addEventListener("click", () => {
    executePricerSearch(pricerKeywordInput.value);
  });

  pricerKeywordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executePricerSearch(pricerKeywordInput.value);
    }
  });

  pricerKeywordChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const keyword = chip.dataset.keywordChip || "";
      pricerKeywordInput.value = keyword;
      executePricerSearch(keyword);
    });
  });

  pricerCorrelationInput?.addEventListener("input", () => {
    pricerState.correlatedCount = Number(pricerCorrelationInput.value);
    if (pricerCorrelationOutput) {
      pricerCorrelationOutput.textContent = pricerCorrelationInput.value;
    }
    if (pricerState.result) {
      const market = getSelectedPricerMarket();
      if (market) {
        pricerState.result.correlatedMarkets = findCorrelatedMarkets(market, pricerState.correlatedCount);
        renderPricerCorrelatedMarkets(pricerState.result);
      }
    } else {
      renderPricerCorrelatedMarkets(null);
    }
  });

  pricerRunButton.addEventListener("click", () => {
    runPricerDemo();
  });

  window.addEventListener("resize", () => {
    drawPricerPathChart(pricerState.result);
  });
}

function initApp() {
  menuToggle?.addEventListener("click", () => {
    if (!mobileNav) return;
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  strategyTabs.forEach((tab) => {
    tab.addEventListener("click", () => renderStrategy(tab.dataset.strategy));
  });

  workflowSteps.forEach((step) => {
    step.addEventListener("click", () => renderWorkflow(step.dataset.step));
  });

  roleFilters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const filter = filterButton.dataset.roleFilter;
      roleFilters.forEach((button) => {
        button.classList.toggle("is-active", button === filterButton);
      });
      renderRoles(filter, 0);
    });
  });

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const interestField = contactForm.elements.namedItem("interest");
    const interestLabel =
      interestField instanceof HTMLSelectElement && interestField.selectedIndex >= 0
        ? interestField.options[interestField.selectedIndex].text
        : "message";

    formResponse.textContent = `Thanks, ${name || "there"}. Your ${interestLabel.toLowerCase()} note has been received.`;
    contactForm.reset();
  });

  renderStrategy("research");
  renderWorkflow("observe");
  renderTeam(0);
  renderRoles("all", 0);
  initCounters();
  initReveal();
  initNavTracking();
  initChart();
  initPricer();
}

initApp();
