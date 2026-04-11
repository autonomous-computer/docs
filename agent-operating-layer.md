---
title: "Agent Operating Layer"
description: "Saved workflow templates, reusable query packs, billing-aware agent guardrails, and policy bundles"
---

# Agent Operating Layer

The Agent Operating Layer provides infrastructure for running AI agents at scale against OMNI Datastream — with guardrails, templates, and billing controls.

## Workflow Templates

Pre-built workflow templates that agents can execute with a single prompt:

### Earnings Prep
```
"Prepare an earnings preview for {ticker} using OMNI Datastream"
```
Automatically calls: `intelligence/earnings-preview`, `factors/decomposition`, `insiders`, `owners/13f`

### Compliance Check
```
"Run a compliance check on {company} using OMNI Datastream"
```
Automatically calls: `events/enforcement`, `compensation`, `insiders`, `filings` (8-K events)

### Portfolio Review
```
"Review my portfolio using OMNI Datastream"
```
Automatically calls: `portfolio/analyze`, `portfolio/stress-test`, `factors/dashboard`

## Query Packs

Reusable query configurations that bundle multiple API calls:

```json
{
  "name": "weekly-insider-review",
  "queries": [
    {"endpoint": "/v1/insiders", "params": {"ticker": "{ticker}", "limit": 20}},
    {"endpoint": "/v1/owners/13f", "params": {"cik": "{manager_cik}"}},
    {"endpoint": "/v1/events/enforcement", "params": {"respondent": "{company_name}"}}
  ],
  "schedule": "weekly",
  "output": "markdown"
}
```

## Billing-Aware Agent Guardrails

### Budget Controls

Set per-agent spending limits to prevent bill shock:

```bash
# Set a $10/month budget for an agent
curl -X PUT "https://api.secapi.ai/v1/billing/budget" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"spendCapCents": 1000, "softCapCents": 750}'
```

The agent receives `Omni-Budget-Used` headers on every response and gets warned at 75%, 90%, 95% thresholds.

### Rate Limiting

Per-endpoint rate limits prevent agents from overwhelming the API:

| Endpoint Family | Rate Limit |
|---|---|
| Entity resolve | 600/min |
| Filing search | 600/min |
| Section extract | 180/min |
| Intelligence query | 30/min |
| Semantic search | 120/min |

### Agent Bootstrap

Create ephemeral, scoped credentials for agents:

```bash
# Sponsor creates a bootstrap token
curl -X POST "https://api.secapi.ai/v1/agent/bootstrap_tokens" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -d '{"ttlSeconds": 3600, "scopes": ["read:sec"]}'

# Agent exchanges token for credentials
curl -X POST "https://api.secapi.ai/v1/agent/bootstrap" \
  -d '{"token": "BOOTSTRAP_TOKEN"}'
```

## Policy Bundles by Vertical

Pre-configured policy sets for different customer types:

### Investment Manager Policy
- Full access to all SEC, factor, and macro endpoints
- Intelligence bundles enabled
- Portfolio analytics enabled
- Budget: usage-based (PAYG or Team plan)

### Law Firm Policy
- Enforcement, filing search, entity resolution
- Event monitoring (8-K, restatements, auditor changes)
- Webhook delivery for real-time alerts
- Budget: per-query with approval threshold

### Insurance/Risk Policy
- Financial health indicators
- Enforcement history
- Compensation screening
- Restricted to read-only operations
- Budget: fixed monthly cap

## Monitoring

Track agent activity via the observability endpoint:

```bash
curl "https://api.secapi.ai/v1/observability" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Export detailed event logs:

```bash
curl "https://api.secapi.ai/v1/events/export?format=ndjson" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
