---
title: "Portfolio Analytics"
description: "Factor-aware portfolio analysis, optimization, and stress testing"
---

# Portfolio Analytics

OMNI Datastream provides allocator-grade portfolio analytics: factor exposure analysis, optimization recommendations, and stress testing — all in one API call.

## Endpoints

### Portfolio Analysis (One Call)

Analyze factor exposures, attribution, and hedge suggestions for any portfolio:

```bash
curl -X POST "https://api.secapi.ai/v1/portfolio/analyze" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "holdings": [
      {"ticker": "AAPL", "weight": 0.25},
      {"ticker": "MSFT", "weight": 0.25},
      {"ticker": "GOOGL", "weight": 0.20},
      {"ticker": "AMZN", "weight": 0.15},
      {"ticker": "NVDA", "weight": 0.15}
    ]
  }'
```

Returns: factor exposures, attribution breakdown, concentration risks, and hedge suggestions.

### Portfolio Optimization

Generate optimization recommendations for factor neutrality, hedging, or regime-awareness:

```bash
curl -X POST "https://api.secapi.ai/v1/portfolio/optimize" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "holdings": [{"ticker": "AAPL", "weight": 0.5}, {"ticker": "MSFT", "weight": 0.5}],
    "objective": "factor_neutral",
    "constraints": {"maxPositionSize": 0.3}
  }'
```

### Stress Testing

Run stress scenarios against factor and macro shocks:

```bash
curl -X POST "https://api.secapi.ai/v1/portfolio/stress-test" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "holdings": [{"ticker": "AAPL", "weight": 0.5}, {"ticker": "MSFT", "weight": 0.5}],
    "scenarios": ["rate_shock_100bp", "equity_drawdown_20pct", "vol_spike"]
  }'
```

### Model Portfolio Factor View

Drill into a model portfolio's factor profile:

```bash
curl "https://api.secapi.ai/v1/model-portfolios/{id}/factor-view" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Use Cases

<CardGroup cols={2}>
  <Card title="Factor Neutralization" icon="scale-balanced">
    Identify and hedge unwanted factor exposures in your portfolio.
  </Card>
  <Card title="Regime-Aware Rebalancing" icon="chart-line">
    Adjust portfolio weights based on the current macro regime.
  </Card>
  <Card title="Risk Budgeting" icon="shield-check">
    Allocate risk across factors and set concentration limits.
  </Card>
  <Card title="Hedge Construction" icon="umbrella">
    Generate hedge overlay recommendations with cost estimates.
  </Card>
</CardGroup>

## Related Skills

- [Make Portfolio Factor Neutral](/skills/make-portfolio-factor-neutral) — Interactive workflow for portfolio neutralization
- [Decompose Return and Hedge](/skills/decompose-return-and-hedge) — Attribution and hedge ideas for individual positions
