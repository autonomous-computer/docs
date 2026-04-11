---
title: "Try It"
description: "Interactive API explorer — test OMNI Datastream endpoints with your API key"
---

# Try It

Test any endpoint directly from the docs. Enter your API key once and explore.

<Warning>
These examples hit the live production API. Calls count against your usage quota.
</Warning>

## Setup

```bash
export OMNI_DATASTREAM_API_KEY="your-key-here"
```

Don't have a key? [Sign up free](https://secapi.ai/login) — 250 calls/month, no card required.

## Entity Resolution

Resolve any company by ticker, CIK, or name:

<Tabs>
  <Tab title="curl">
```bash
curl "https://api.secapi.ai/v1/entities/resolve?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
  </Tab>
  <Tab title="JavaScript">
```javascript
const res = await fetch("https://api.secapi.ai/v1/entities/resolve?ticker=AAPL", {
  headers: { "x-api-key": process.env.OMNI_DATASTREAM_API_KEY }
})
const entity = await res.json()
console.log(entity.name, entity.exchange, entity.sicCode)
```
  </Tab>
  <Tab title="Python">
```python
import requests
r = requests.get("https://api.secapi.ai/v1/entities/resolve",
    params={"ticker": "AAPL"},
    headers={"x-api-key": os.environ["OMNI_DATASTREAM_API_KEY"]})
entity = r.json()
print(entity["name"], entity["exchange"], entity["sicCode"])
```
  </Tab>
  <Tab title="CLI">
```bash
omni-sec entities resolve --ticker AAPL --json
```
  </Tab>
</Tabs>

## Filing Search

<Tabs>
  <Tab title="curl">
```bash
# Search 10-K filings for Apple
curl "https://api.secapi.ai/v1/filings?ticker=AAPL&form=10-K&limit=3" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Full-text search across all filings
curl "https://api.secapi.ai/v1/search/fulltext?q=revenue+recognition+policy&limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Semantic search (AI-powered relevance)
curl "https://api.secapi.ai/v1/search/semantic?q=what+are+the+main+risks+for+this+business&ticker=TSLA" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
  </Tab>
  <Tab title="JavaScript">
```javascript
// Semantic search
const res = await fetch(
  "https://api.secapi.ai/v1/search/semantic?q=supply+chain+risk&ticker=AAPL",
  { headers: { "x-api-key": process.env.OMNI_DATASTREAM_API_KEY } }
)
const results = await res.json()
results.sections.data.forEach(s => {
  console.log(`${s.score} | ${s.retrievalMode} | ${s.title}`)
})
```
  </Tab>
</Tabs>

## Financial Statements

<Tabs>
  <Tab title="curl">
```bash
# All statements (income, balance, cash flow)
curl "https://api.secapi.ai/v1/statements/all?ticker=AAPL&period=annual&limit=1" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Segmented revenue
curl "https://api.secapi.ai/v1/statements/segmented-revenues?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
  </Tab>
</Tabs>

## Ownership & Insiders

<Tabs>
  <Tab title="curl">
```bash
# Recent insider trades
curl "https://api.secapi.ai/v1/insiders?ticker=NVDA&limit=10" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# 13F institutional holdings (Berkshire Hathaway)
curl "https://api.secapi.ai/v1/owners/13f?cik=0001067983" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Compare 13F across quarters
curl -X POST "https://api.secapi.ai/v1/owners/13f/compare" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"cik":"0001067983"}'
```
  </Tab>
</Tabs>

## Intelligence Bundles

One-call pre-computed analysis — replaces 8+ raw API calls:

<Tabs>
  <Tab title="curl">
```bash
# Company intelligence (one call = full briefing)
curl "https://api.secapi.ai/v1/intelligence/company?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Earnings preview
curl "https://api.secapi.ai/v1/intelligence/earnings-preview?ticker=MSFT" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
  </Tab>
</Tabs>

## Enforcement Actions

<Tabs>
  <Tab title="curl">
```bash
# Search enforcement actions
curl "https://api.secapi.ai/v1/events/enforcement?limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Filter by violation type
curl "https://api.secapi.ai/v1/events/enforcement?violation_type=fraud&limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# AAERs (Accounting and Auditing Enforcement Releases)
curl "https://api.secapi.ai/v1/events/enforcement?source_type=aaer&limit=5" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```
  </Tab>
</Tabs>

## Filing Diff (Amendment Tracking)

Compare two filing versions to see what changed:

```bash
curl "https://api.secapi.ai/v1/filings/0000320193-24-000123/diff?compareWith=0000320193-25-000079" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Subsidiaries & Audit Fees

```bash
# Subsidiaries from Exhibit 21
curl "https://api.secapi.ai/v1/companies/subsidiaries?ticker=MSFT" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Audit fees from proxy statement
curl "https://api.secapi.ai/v1/companies/audit-fees?ticker=MSFT" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Form D Structured Data

Get structured offering details from Form D XML:

```bash
# List Form D filings
curl "https://api.secapi.ai/v1/forms/d?limit=3" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Structured extraction (offering amount, exemptions, investors)
curl "https://api.secapi.ai/v1/forms/d/0001288257-18-000026" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Monitors (Saved Searches)

Set up automated alerts for new matches:

```bash
# Create a monitor
curl -X POST "https://api.secapi.ai/v1/monitors" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "AAPL 8-K Watch", "query": "AAPL", "filters": {"form": "8-K"}, "searchMode": "keyword"}'

# Check matches
curl "https://api.secapi.ai/v1/monitors/{monitorId}/matches" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## What's Next?

<CardGroup cols={3}>
  <Card title="Install the CLI" icon="terminal" href="/libraries-and-sdks">
    `npm install -g @omni-datastream/cli`
  </Card>
  <Card title="Use with Claude" icon="bot" href="/mcp-install">
    Connect via MCP for agent workflows
  </Card>
  <Card title="Browse Skills" icon="book" href="/custom-skills">
    8 pre-built SEC workflow skills
  </Card>
</CardGroup>
