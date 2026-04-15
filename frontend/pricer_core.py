"""
Pricer core — numpy-only subset of pricer.py for in-browser use via Pyodide.

Exports:
  Pricer.simulate_future_paths(sigma, mu, T, n_paths, dt, random_state)
  baseline_estimate(probability_path)   -> {"mu": float, "sigma": float}
  solve_pde(p0, mu, sigma, T)           -> float  (fair value)
"""

import numpy as np


class Pricer:
    def __init__(self, p0):
        self._p0 = float(np.clip(p0, 1e-12, 1 - 1e-12))

    @staticmethod
    def logit(p):
        p = np.clip(np.asarray(p, dtype=float), 1e-12, 1 - 1e-12)
        return np.log(p / (1 - p))

    @staticmethod
    def logistic(x):
        return 1.0 / (1.0 + np.exp(-np.asarray(x, dtype=float)))

    def _build_time_grid(self, T, dt):
        n = int(np.floor(T / dt))
        rem = float(T - n * dt)
        if np.isclose(rem, 0.0):
            rem = 0.0
        steps = np.full(n, dt, dtype=float)
        if rem > 0.0:
            steps = np.concatenate((steps, [rem]))
        return steps, np.concatenate(([0.0], np.cumsum(steps)))

    def simulate_future_paths(self, sigma, mu, T, n_paths=500, dt=1.0, random_state=None):
        """Euler-Maruyama simulation in logit space. Returns JSON-safe dict."""
        T = float(max(T, 0.5))
        steps, t = self._build_time_grid(T, dt)
        rng = np.random.default_rng(int(random_state) if random_state is not None else None)
        x0 = float(self.logit(self._p0))

        X = np.empty((int(n_paths), t.size), dtype=float)
        X[:, 0] = x0
        for i, h in enumerate(steps, start=1):
            X[:, i] = X[:, i - 1] + mu * h + sigma * np.sqrt(h) * rng.standard_normal(int(n_paths))

        P = self.logistic(X)
        terminal = P[:, -1]
        return {
            "future_value": float(terminal.mean()),
            "finals":       terminal.tolist(),
            "mean_path":    P.mean(axis=0).tolist(),
            "lower_path":   np.quantile(P, 0.1, axis=0).tolist(),
            "upper_path":   np.quantile(P, 0.9, axis=0).tolist(),
        }


def baseline_estimate(probability_path):
    """Compute mu and sigma from logit-space first differences (no labels needed)."""
    p = np.clip(np.asarray(probability_path, dtype=float), 1e-12, 1 - 1e-12)
    logits = np.log(p / (1 - p))
    dx = np.diff(logits)
    if dx.size == 0:
        return {"mu": 0.0, "sigma": 0.1}
    mu = float(dx.mean())
    sigma = float(dx.std(ddof=1)) if dx.size > 1 else 0.1
    return {"mu": mu, "sigma": float(max(sigma, 0.02))}


def solve_pde(p0, mu, sigma, T, nx=201):
    """Explicit finite-difference Fokker-Planck PDE. Returns fair value in [0, 1]."""
    sigma = float(abs(sigma))
    mu    = float(mu)
    p0    = float(np.clip(p0, 1e-12, 1 - 1e-12))
    T     = float(max(T, 0.5))
    x0    = float(np.log(p0 / (1 - p0)))

    span   = max(6.0, 6.0 * sigma * np.sqrt(T) + 2.0 * abs(mu) * T)
    x_grid = np.linspace(x0 - span, x0 + span, int(nx))
    dx     = float(x_grid[1] - x_grid[0])

    stability_nt = int(np.ceil(T * (abs(mu) / max(dx, 1e-8) + sigma ** 2 / max(dx ** 2, 1e-8)) * 2.0))
    nt   = max(stability_nt, 10)
    dtau = T / nt

    values    = 1.0 / (1.0 + np.exp(-x_grid))
    diffusion = 0.5 * sigma ** 2 * dtau / dx ** 2
    drift     = mu * dtau / (2.0 * dx)

    for _ in range(nt):
        updated          = values.copy()
        updated[1:-1]    = (
            values[1:-1]
            + diffusion * (values[2:] - 2 * values[1:-1] + values[:-2])
            + drift     * (values[2:] - values[:-2])
        )
        updated[0]  = 0.0
        updated[-1] = 1.0
        values = np.clip(updated, 0.0, 1.0)

    return float(np.interp(x0, x_grid, values))
