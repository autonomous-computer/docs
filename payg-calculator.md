---
title: "PAYG Cost Calculator"
description: "See how much you'll save with OMNI Datastream's pay-as-you-go pricing vs sec-api.io's fixed monthly plans"
---

# Pay-As-You-Go Cost Calculator

OMNI Datastream is the only SEC data API with true pay-as-you-go pricing. No monthly minimum. Pay only for what you use.

## Side-by-Side Comparison

### Light Usage (Agent running ~200 queries/month)

| | sec-api.io | OMNI PAYG | OMNI Personal |
|---|---|---|---|
| Monthly cost | **$49/month** (minimum) | **$4.00** | **$55/month** |
| Per-query cost | ~$0.25 | $0.02 | $0.016 |
| Annual cost | **$588** | **$48** | **$660** |
| Savings vs sec-api.io | — | **92%** | **-12%** |

### Medium Usage (Analyst running ~2,000 queries/month)

| | sec-api.io | OMNI PAYG | OMNI Personal |
|---|---|---|---|
| Monthly cost | **$49/month** | **$40.00** | **$55 + $25.60** |
| Per-query cost | ~$0.025 | $0.02 | $0.016 |
| Annual cost | **$588** | **$480** | **$967** |
| Savings vs sec-api.io | — | **18%** | -64% |

### Heavy Usage (Team running ~10,000 queries/month)

| | sec-api.io | OMNI PAYG | OMNI Team |
|---|---|---|---|
| Monthly cost | **$199/month** | **$200** | **$239 + $84.50** |
| Per-query cost | ~$0.02 | $0.02 | $0.013 |
| Annual cost | **$2,388** | **$2,400** | **$3,882** |
| Best option | — | **Comparable** | **Best per-query rate** |

## When to Choose Each Plan

<CardGroup cols={3}>
  <Card title="Free (250/month)" icon="gift">
    Evaluation, prototyping, and low-volume agent workflows. No card required.
  </Card>
  <Card title="Pay As You Go" icon="receipt">
    Best for agents and light users. No monthly commitment. Highest per-call rate but zero waste.
  </Card>
  <Card title="Personal ($55/mo)" icon="user">
    Best when you consistently exceed ~300 queries/month. 20% meter discount pays for itself.
  </Card>
</CardGroup>

## Per-Operation Pricing

| Operation | PAYG | Personal (20% off) | Team (35% off) |
|---|---|---|---|
| Entity resolution | $0.01 | $0.008 | $0.007 |
| Filing search | $0.02 | $0.016 | $0.013 |
| Section extraction | $0.05 | $0.04 | $0.033 |
| Intelligence query | $0.08 | $0.064 | $0.052 |
| Semantic search | $0.04 | $0.032 | $0.026 |
| Market data | $0.03 | $0.024 | $0.020 |
| Artifact generation | $0.10 | $0.08 | $0.065 |
| Webhook delivery | $0.001 | $0.001 | $0.001 |

## What sec-api.io Doesn't Offer

- **No PAYG tier.** Minimum $49/month even for 1 query.
- **No free tier renewal.** 100 lifetime calls vs our 250/month renewable.
- **No per-call billing.** Fixed monthly regardless of usage.
- **No budget controls.** No spending caps, no threshold alerts.
- **No intelligence bundles.** 8+ API calls to assemble what OMNI returns in 1.

## Get Started

```bash
# Sign up and get 250 free calls/month
# No card required

curl "https://api.secapi.ai/v1/entities/resolve?ticker=AAPL" \
  -H "x-api-key: YOUR_API_KEY"
```

[Get your free API key →](https://secapi.ai/login)
