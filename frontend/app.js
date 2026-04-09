const strategyData = {
  research: {
    kicker: "Research Engine",
    title: "Machine-assisted research that still respects first principles.",
    text:
      "Our research workflow explores signals across multiple horizons, then forces them through adversarial validation, regime checks, and implementation review.",
    points: [
      ["Signal Discovery", "Feature search across macro, flow, and market microstructure inputs."],
      ["Regime Tests", "We break ideas under changing volatility, liquidity, and correlation conditions."],
      ["Human Review", "No model is promoted without being explainable to researchers and traders."]
    ]
  },
  risk: {
    kicker: "Risk Discipline",
    title: "Capital protection is designed into the process rather than added at the end.",
    text:
      "We size exposure with forward-looking controls, live health checks, and hard limits on concentration, factor overlap, and implementation drift.",
    points: [
      ["Position Limits", "Portfolio sizing adapts before the market forces the issue."],
      ["Scenario Review", "Stress templates model bad paths before a strategy sees production capital."],
      ["Live Monitors", "Health events, slippage, and venue instability feed directly into risk throttles."]
    ]
  },
  execution: {
    kicker: "Execution Stack",
    title: "Low-friction infrastructure built for speed, clarity, and resilient deployment.",
    text:
      "Data, simulation, and production systems share a common spine, so live execution reflects the same assumptions we test in research.",
    points: [
      ["Data Spine", "Research and trading use consistent market and derived data definitions."],
      ["Observability", "Latency, venue health, and fill quality stay visible during the full trading cycle."],
      ["Tight Feedback", "Execution diagnostics feed back into model review without waiting for quarterly retrospectives."]
    ]
  }
};

const workflowData = {
  observe: {
    label: "Observe",
    title: "Collect, clean, and challenge market structure data.",
    text:
      "Every cycle begins with high-quality market, venue, and derived data. We look for repeatable structure, not stories we merely want to believe.",
    items: [
      "Normalize data across venues and sessions.",
      "Compare new information against existing assumptions.",
      "Flag unstable inputs before they distort the research loop."
    ]
  },
  shape: {
    label: "Shape",
    title: "Turn raw behavior into hypotheses with clear failure modes.",
    text:
      "A useful idea is one that can be disproven quickly. We define what should hold, where it may break, and how the implementation will be evaluated.",
    items: [
      "Frame signal logic in a way traders and engineers can inspect.",
      "Attach explicit invalidation tests to every new pattern.",
      "Keep the path from prototype to code visible from day one."
    ]
  },
  deploy: {
    label: "Deploy",
    title: "Move from research conviction to production readiness without losing context.",
    text:
      "Strategies graduate only when the engineering surface, risk profile, and monitoring requirements are all understood by the team that will own them.",
    items: [
      "Test live assumptions against paper and staged environments.",
      "Verify latency, market access, and fill behavior under pressure.",
      "Document ownership so operational surprises have clear responders."
    ]
  },
  refine: {
    label: "Refine",
    title: "Study outcomes continuously and sharpen the process with every iteration.",
    text:
      "The work does not end with deployment. We review fills, behavior shifts, and model decay to keep the stack adaptive and honest.",
    items: [
      "Measure what improved and what only looked promising in backtests.",
      "Reallocate capital toward signals that stay robust across regimes.",
      "Fold production insight back into research, tooling, and risk design."
    ]
  }
};

const teamData = [
  {
    role: "Founder / CIO",
    name: "Evan Einbund",
    summary:
      "Leads firm architecture, research priorities, and the long-term direction of Hagakure.",
    bio:
      "Evan studied Mathematics, Statistics, and Business at the University of Michigan. He spent last summer interning at IMC Trading as a Research Analyst and is now pursuing a Master of Finance at the Massachusetts Institute of Technology."
  },
  {
    role: "Head of Lance",
    name: "Lance Zhang",
    summary:
      "Is Lance.",
    bio:
      "Lance doesn't actually do anything. The company felt as though by itself generates alpha."
  }
];

const roleData = [
  {
    category: "engineering",
    title: "Market Data Engineer",
    location: "New York / Chicago",
    type: "Full Time",
    summary: "Own the acquisition, normalization, and distribution of live and historical market data.",
    points: [
      "Build and maintain low-latency data connectors and validation pipelines.",
      "Partner with researchers on replay, backtest, and simulation quality.",
      "Improve observability around feed health, drift, and missingness."
    ]
  },
  {
    category: "quant",
    title: "Quantitative Researcher",
    location: "New York / Singapore",
    type: "Full Time",
    summary: "Develop systematic signals and portfolio logic across global liquid markets.",
    points: [
      "Work on alpha discovery, feature design, and statistical validation.",
      "Collaborate directly with traders and engineers on live rollout.",
      "Treat implementation quality as part of the research standard."
    ]
  },
  {
    category: "trading",
    title: "Execution Trader",
    location: "Chicago / Singapore",
    type: "Full Time",
    summary: "Operate alongside researchers and developers to keep live strategies adaptive and controlled.",
    points: [
      "Monitor live books, venue behavior, and real-time execution quality.",
      "Help diagnose structural changes in the market as they happen.",
      "Turn observations into product and strategy improvements quickly."
    ]
  },
  {
    category: "engineering",
    title: "Front-End Trading Systems Engineer",
    location: "New York",
    type: "Full Time",
    summary: "Design trader-facing interfaces that stay fast, legible, and trustworthy under pressure.",
    points: [
      "Build dashboards that surface execution, risk, and infrastructure state clearly.",
      "Collaborate with traders to reduce friction in live decision making.",
      "Bring strong product taste to high-stakes internal tools."
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
      <p class="role-detail-kicker">No roles</p>
      <h3>No openings in this category right now.</h3>
      <p>Check back soon or use the contact form below to introduce yourself.</p>
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
            <span>View role</span>
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
        : "team";

    formResponse.textContent = `${name || "Candidate"}, your ${interestLabel} interest has been staged for review. Hagakure will be in touch shortly.`;
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
