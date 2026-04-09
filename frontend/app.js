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
}

initApp();
