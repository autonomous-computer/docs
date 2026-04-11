---
title: "Extract Revenue Metrics from 10-K Filings"
description: "Learn how to pull structured revenue data from SEC 10-K filings using the Datastream API. Includes curl, Python, and JavaScript examples."
---

# Extract Revenue Metrics from 10-K Filings

Pull structured revenue, net income, and other financial metrics directly from 10-K filings without manually parsing XBRL or HTML. This tutorial walks through finding a company's latest annual filing, retrieving its financial statements, and extracting specific XBRL facts.

## Prerequisites

- An Omni Datastream API key (set as `OMNI_DATASTREAM_API_KEY`)
- Basic familiarity with REST APIs
- (Optional) Python 3.8+ or Node.js 18+ for SDK examples

## Step 1 — Find the latest 10-K filing

Start by fetching the most recent 10-K for a given ticker. The `/v1/filings/latest` endpoint returns the newest filing matching your criteria.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/filings/latest?ticker=AAPL&form=10-K"
```

### Python

```python
from omni_datastream_py import OmniDatastreamClient

client = OmniDatastreamClient(api_key="your-api-key")

filing = client.filings.latest(ticker="AAPL", form="10-K")
print(filing.accession_number)
print(filing.filed_at)
```

### JavaScript

```ts
import { OmniDatastreamClient } from "@omni-datastream/sdk-js";

const client = new OmniDatastreamClient({
  apiKey: process.env.OMNI_DATASTREAM_API_KEY!,
});

const filing = await client.filings.latest({
  ticker: "AAPL",
  form: "10-K",
});
console.log(filing.accessionNumber);
console.log(filing.filedAt);
```

### Expected output

```json
{
  "accession_number": "0000320193-24-000081",
  "form": "10-K",
  "filed_at": "2024-11-01",
  "company_name": "Apple Inc",
  "cik": "0000320193"
}
```

## Step 2 — Retrieve financial statements

With the filing identified, pull the structured income statement using `/v1/statements`. This returns XBRL-sourced line items already mapped to a normalized schema.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/statements/all?ticker=AAPL&period=annual&limit=1"
```

### Python

```python
statements = client.statements.all(
    ticker="AAPL",
    period="annual",
    limit=1,
)

income = statements.income_statement
print(f"Revenue: {income.revenue}")
print(f"Net Income: {income.net_income}")
print(f"Gross Profit: {income.gross_profit}")
```

### JavaScript

```ts
const statements = await client.statements.all({
  ticker: "AAPL",
  period: "annual",
  limit: 1,
});

const income = statements.incomeStatement;
console.log(`Revenue: ${income.revenue}`);
console.log(`Net Income: ${income.netIncome}`);
console.log(`Gross Profit: ${income.grossProfit}`);
```

### Expected output

```json
{
  "income_statement": {
    "revenue": 383285000000,
    "cost_of_revenue": 214137000000,
    "gross_profit": 169148000000,
    "net_income": 93736000000,
    "period": "2024-09-28",
    "fiscal_year": 2024
  }
}
```

## Step 3 — Extract specific XBRL facts

For granular control, use `/v1/facts` to pull individual XBRL concepts. This is useful when you need a specific metric that may not appear in the normalized statement schema.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/facts?ticker=AAPL&concept=Revenues&period=annual&limit=4"
```

### Python

```python
facts = client.facts.list(
    ticker="AAPL",
    concept="Revenues",
    period="annual",
    limit=4,
)

for fact in facts.data:
    print(f"{fact.period_end}: ${fact.value:,.0f}")
```

### JavaScript

```ts
const facts = await client.facts.list({
  ticker: "AAPL",
  concept: "Revenues",
  period: "annual",
  limit: 4,
});

for (const fact of facts.data) {
  console.log(`${fact.periodEnd}: $${fact.value.toLocaleString()}`);
}
```

### Expected output

```
2024-09-28: $383,285,000,000
2023-09-30: $383,933,000,000
2022-10-01: $394,328,000,000
2021-09-25: $365,817,000,000
```

## Next steps

- **Compare multiple companies**: Loop over a list of tickers to build a revenue comparison table.
- **Add quarterly data**: Change `period=annual` to `period=quarterly` for more granular trends.
- **Explore all statement types**: Use `/v1/statements/all` to retrieve balance sheets and cash flow statements alongside income statements.
- **Build dashboards**: Pipe the JSON output into your visualization tool of choice.

See the [API Reference](/api-reference) for the full list of available endpoints and parameters.
