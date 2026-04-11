---
title: "SEC Full Text Search API — Search Inside SEC Filings"
description: "Search the full text of SEC filings with keyword and AI-powered semantic search. Find risk factors, M&A disclosures, and specific clauses across millions of documents. Start free."
---

# SEC Full Text Search API

Search inside the text of every SEC filing — not just metadata. Datastream indexes the full text of filings on EDGAR and provides both traditional keyword search and AI-powered semantic search that understands meaning.

## The problem

EDGAR's built-in full-text search (EFTS) is limited:

- No section-level filtering (you cannot search only within risk factors)
- No semantic understanding (searching "supply chain problems" will not find "logistics disruptions")
- Poor ranking for complex queries
- Aggressive rate limits (10 requests/second shared across all users)
- No API-first design — the interface is built for browser use

## What Datastream offers

### Semantic search

Ask questions in natural language and get the most relevant passages back, ranked by conceptual similarity:

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "risks related to AI regulation and compliance",
    "form_types": ["10-K"],
    "section": "risk_factors",
    "limit": 5
  }' \
  "https://api.secapi.ai/v1/search/semantic"
```

```json
{
  "data": [
    {
      "company_name": "Microsoft Corp",
      "ticker": "MSFT",
      "form": "10-K",
      "section": "Risk Factors",
      "score": 0.941,
      "text": "The rapid adoption of generative AI technologies has increased regulatory scrutiny globally. Proposed regulations in the EU, US, and other jurisdictions could impose significant compliance costs..."
    }
  ]
}
```

### Section-level search

Limit your search to specific filing sections:

- `risk_factors` — Item 1A of 10-K/10-Q
- `business` — Item 1 of 10-K
- `mda` — Management's Discussion and Analysis (Item 7)
- `legal_proceedings` — Item 3 of 10-K
- `financial_statements` — Item 8 of 10-K

### Scoped by company and form type

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "material weakness in internal controls",
    "tickers": ["AAPL", "MSFT", "GOOG"],
    "form_types": ["10-K", "10-Q"],
    "limit": 10
  }' \
  "https://api.secapi.ai/v1/search/semantic"
```

## Use cases

### Due diligence

Search for litigation mentions, regulatory risks, and material weaknesses across a target company's entire filing history.

### Thematic research

Find every company discussing a specific theme (e.g., "tariff exposure", "cryptocurrency holdings", "climate risk") across all recent filings.

### Competitive intelligence

Compare how companies in the same sector describe their competitive landscape, pricing strategy, or market positioning.

### Compliance scanning

Scan filings for specific disclosure language to verify compliance with SEC rules.

### AI agent workflows

Feed search results into LLM pipelines for automated analysis, summarization, and report generation.

## API endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /v1/search/semantic` | AI-powered semantic search |
| `GET /v1/filings` | Filter filings by metadata |
| `GET /v1/sections` | Extract specific sections from filings |

## Why Datastream over alternatives

| Feature | Datastream | EDGAR EFTS | Bloomberg Terminal | S&P Capital IQ |
|---------|-----------|-----------|-------------------|----------------|
| Semantic search | Yes | No | No | No |
| Section-level filtering | Yes | No | Limited | Limited |
| JSON API | Yes | Limited | No | Proprietary |
| Real-time indexing | Minutes | Hours | Varies | Varies |
| SDK support | Python + JS | No | No | No |
| Pricing | Pay-as-you-go | Free (limited) | $24k+/year | $15k+/year |

## Get started

<Card title="Get your API key" icon="key" href="/getting-started">
  Start searching inside SEC filings in under 60 seconds.
</Card>

- [Semantic Search Tutorial](/tutorials/semantic-search-risk-factors)
- [API Reference — Search](/api-reference/search)
- [Full documentation](/api-overview)
