---
title: "Find Risk Factors with Semantic Search"
description: "Use AI-powered semantic search to find relevant risk factors across SEC filings. Includes curl, Python, and JavaScript examples."
---

# Find Risk Factors with Semantic Search

Traditional keyword search misses synonyms, paraphrases, and contextual matches. Semantic search uses embeddings to find passages that are conceptually related to your query, even when the exact words differ. This tutorial shows how to search across filing sections for risk factors using natural language.

## Prerequisites

- An Omni Datastream API key (set as `OMNI_DATASTREAM_API_KEY`)
- Basic familiarity with REST APIs
- (Optional) Python 3.8+ or Node.js 18+ for SDK examples

## Step 1 — Run a basic semantic search

The `/v1/search/semantic` endpoint accepts a natural language query and returns the most relevant passages from SEC filings.

### curl

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "supply chain disruption risks in semiconductor industry",
    "limit": 5
  }' \
  "https://api.secapi.ai/v1/search/semantic"
```

### Python

```python
from omni_datastream_py import OmniDatastreamClient

client = OmniDatastreamClient(api_key="your-api-key")

results = client.search.semantic(
    query="supply chain disruption risks in semiconductor industry",
    limit=5,
)

for hit in results.data:
    print(f"[{hit.score:.3f}] {hit.company_name} ({hit.form} {hit.filed_at})")
    print(f"  Section: {hit.section}")
    print(f"  {hit.text[:200]}...")
    print()
```

### JavaScript

```ts
import { OmniDatastreamClient } from "@omni-datastream/sdk-js";

const client = new OmniDatastreamClient({
  apiKey: process.env.OMNI_DATASTREAM_API_KEY!,
});

const results = await client.search.semantic({
  query: "supply chain disruption risks in semiconductor industry",
  limit: 5,
});

for (const hit of results.data) {
  console.log(`[${hit.score.toFixed(3)}] ${hit.companyName} (${hit.form} ${hit.filedAt})`);
  console.log(`  Section: ${hit.section}`);
  console.log(`  ${hit.text.slice(0, 200)}...`);
  console.log();
}
```

### Expected output

```
[0.943] NVIDIA Corp (10-K 2024-02-21)
  Section: Risk Factors
  Our operations depend on the ability of our suppliers to deliver components
  in a timely manner. Global semiconductor supply constraints, geopolitical
  tensions, and natural disasters could materially impact...

[0.921] Advanced Micro Devices Inc (10-K 2024-01-31)
  Section: Risk Factors
  We rely on third-party manufacturers, primarily TSMC, to produce our
  products. Disruptions to our supply chain, whether due to pandemic, trade
  restrictions, or capacity constraints...

[0.908] Intel Corp (10-K 2024-01-26)
  Section: Risk Factors
  Our manufacturing operations and supply chain are subject to risks
  including shortages of materials, equipment failures, and geopolitical
  events that could affect our ability to meet customer demand...
```

## Step 2 — Scope the search to specific companies or form types

Add filters to narrow your search to a watchlist of companies or specific filing types.

### curl

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "cybersecurity incident disclosure requirements",
    "tickers": ["AAPL", "MSFT", "GOOG", "AMZN"],
    "form_types": ["10-K", "8-K"],
    "section": "risk_factors",
    "limit": 10
  }' \
  "https://api.secapi.ai/v1/search/semantic"
```

### Python

```python
results = client.search.semantic(
    query="cybersecurity incident disclosure requirements",
    tickers=["AAPL", "MSFT", "GOOG", "AMZN"],
    form_types=["10-K", "8-K"],
    section="risk_factors",
    limit=10,
)

for hit in results.data:
    print(f"{hit.company_name}: {hit.text[:150]}...")
```

### JavaScript

```ts
const results = await client.search.semantic({
  query: "cybersecurity incident disclosure requirements",
  tickers: ["AAPL", "MSFT", "GOOG", "AMZN"],
  formTypes: ["10-K", "8-K"],
  section: "risk_factors",
  limit: 10,
});

for (const hit of results.data) {
  console.log(`${hit.companyName}: ${hit.text.slice(0, 150)}...`);
}
```

## Step 3 — Compare risk disclosures across periods

Search for the same risk factor across multiple years of filings from one company to track how their disclosure language evolves.

### Python

```python
QUERY = "artificial intelligence regulatory risk"

for year in [2022, 2023, 2024]:
    results = client.search.semantic(
        query=QUERY,
        tickers=["MSFT"],
        form_types=["10-K"],
        date_from=f"{year}-01-01",
        date_to=f"{year}-12-31",
        limit=1,
    )

    if results.data:
        hit = results.data[0]
        print(f"--- {year} (score: {hit.score:.3f}) ---")
        print(f"{hit.text[:300]}")
        print()
    else:
        print(f"--- {year}: No matching disclosure ---")
        print()
```

### Expected output

```
--- 2022 (score: 0.812) ---
We are investing significantly in artificial intelligence capabilities. The
regulatory landscape for AI is evolving and uncertain, which could affect our
ability to develop and deploy AI-powered products and services...

--- 2023 (score: 0.891) ---
The rapid adoption of generative AI technologies has increased regulatory
scrutiny globally. Proposed regulations in the EU, US, and other jurisdictions
could impose significant compliance costs and restrict certain AI applications...

--- 2024 (score: 0.934) ---
AI regulation is advancing rapidly across major markets. The EU AI Act, US
executive orders on AI safety, and emerging frameworks in Asia create a complex
compliance environment. Our AI investments face risks from divergent regulatory
requirements, potential liability frameworks, and restrictions on training data...
```

## Next steps

- **Build a risk dashboard**: Run semantic search across your portfolio holdings to surface emerging risk themes.
- **Combine with structured data**: Cross-reference risk factor mentions with financial metrics from `/v1/statements` to quantify potential impact.
- **Track disclosure changes**: Set up a quarterly job to re-run the same queries and diff the results.

See the [API Reference](/api-reference/search) for the full semantic search endpoint specification.
