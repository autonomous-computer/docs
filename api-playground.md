---
title: "API Playground"
description: "Try OMNI Datastream SEC data endpoints interactively — no signup required"
---

# API Playground

Try OMNI Datastream endpoints with pre-populated examples. Copy any command to use with your own API key.

<Info>
These examples use the free tier (250 calls/month). [Get your API key](https://secapi.ai/login) to try them yourself.
</Info>

## Entity Resolution

Resolve a company by ticker, CIK, FIGI, or name:

```bash
curl "https://api.secapi.ai/v1/entities/resolve?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

<Expandable title="Try more identifiers">
```bash
# By CIK
curl "https://api.secapi.ai/v1/entities/resolve?cik=0000320193" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# By name
curl "https://api.secapi.ai/v1/entities/resolve?name=Tesla" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
</Expandable>

## Filing Search

Search SEC filings with 20+ filters:

```bash
curl "https://api.secapi.ai/v1/filings?ticker=AAPL&form=10-K&limit=3" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

<Expandable title="Advanced filtering">
```bash
# Full-text search
curl "https://api.secapi.ai/v1/search/fulltext?q=revenue+recognition+policy&ticker=AAPL&limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Semantic search (AI-powered)
curl "https://api.secapi.ai/v1/search/semantic?q=what+are+the+main+business+risks&ticker=MSFT&limit=3" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# By date range
curl "https://api.secapi.ai/v1/filings?ticker=TSLA&form=8-K&date_from=2025-01-01&date_to=2025-12-31" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
</Expandable>

## Financial Statements

Get structured XBRL financial data:

```bash
# All statements for the latest annual period
curl "https://api.secapi.ai/v1/statements/all?ticker=AAPL&period=annual&limit=1" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

<Expandable title="Individual statements">
```bash
# Income statement
curl "https://api.secapi.ai/v1/statements/income_statement?ticker=AAPL&period=annual" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Balance sheet
curl "https://api.secapi.ai/v1/statements/balance_sheet?ticker=MSFT&period=quarterly" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
</Expandable>

## Ownership & Insiders

```bash
# Insider trades
curl "https://api.secapi.ai/v1/insiders?ticker=AAPL&limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# 13F institutional holdings
curl "https://api.secapi.ai/v1/owners/13f?cik=0001067983&limit=10" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Executive compensation
curl "https://api.secapi.ai/v1/compensation?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Enforcement Actions

```bash
# Recent enforcement actions
curl "https://api.secapi.ai/v1/events/enforcement?limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Filter by type
curl "https://api.secapi.ai/v1/events/enforcement?source_type=aaer&limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Intelligence Bundles

One-call pre-computed analysis:

```bash
# Company intelligence bundle
curl "https://api.secapi.ai/v1/intelligence/company?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Security analysis
curl "https://api.secapi.ai/v1/intelligence/security?ticker=TSLA" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Using the CLI

All playground examples work with the `omni-sec` CLI:

```bash
# Install
npm install -g @omni-datastream/cli

# Set your key
export OMNI_DATASTREAM_API_KEY=your_key_here

# Try it
omni-sec entities resolve --ticker AAPL --json
omni-sec filings search --ticker AAPL --form 10-K --limit 3 --json
omni-sec insiders list --ticker AAPL --json
```

## Using the SDK

```typescript
import { OmniDatastreamClient } from "@omni-datastream/sdk-js"

const client = new OmniDatastreamClient({
  apiKey: process.env.OMNI_DATASTREAM_API_KEY,
})

const entity = await client.resolveEntity({ ticker: "AAPL" })
const filing = await client.latestFiling({ ticker: "AAPL", form: "10-K" })
const statements = await client.allStatements({ ticker: "AAPL", period: "annual", limit: 1 })
```
