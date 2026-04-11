---
title: "SEC Filing Search API — Find Any Filing in Seconds"
description: "Search SEC filings by company, form type, date range, and content. Full-text and semantic search across millions of EDGAR documents. Start free."
---

# SEC Filing Search API

Search across every filing on SEC EDGAR without building your own index. Datastream provides keyword search, filtered queries, and AI-powered semantic search across millions of documents.

## The problem with searching EDGAR directly

EDGAR's full-text search (EFTS) is limited: no structured filters, inconsistent ranking, no semantic understanding, and aggressive rate limits. Building your own search index means downloading terabytes of filings, parsing SGML/HTML, and maintaining infrastructure.

Datastream handles all of this. You get a single API endpoint that supports:

- **Keyword search** across filing text
- **Semantic search** that understands meaning, not just keywords
- **Structured filters** by company, form type, date range, and section
- **Sub-second response times** with cursor pagination

## Quick start

Search for filings mentioning "artificial intelligence" in recent 10-K risk factors:

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "artificial intelligence risks and regulation",
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
      "filed_at": "2024-07-30",
      "section": "Risk Factors",
      "score": 0.941,
      "text": "The rapid adoption of generative AI technologies has increased regulatory scrutiny globally..."
    }
  ]
}
```

## Search capabilities

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Semantic search | `/v1/search/semantic` | AI-powered search that matches meaning |
| Filing lookup | `/v1/filings` | Filter by ticker, form type, date range |
| Latest filing | `/v1/filings/latest` | Get the most recent filing matching criteria |
| Section extraction | `/v1/sections` | Pull specific sections from any filing |

## Common use cases

### Find a company's latest annual report

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/filings/latest?ticker=TSLA&form=10-K"
```

### Search across all 8-K filings for M&A activity

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "merger acquisition definitive agreement",
    "form_types": ["8-K"],
    "date_from": "2024-01-01",
    "limit": 10
  }' \
  "https://api.secapi.ai/v1/search/semantic"
```

### List all filings for a company

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/filings?ticker=NVDA&limit=20"
```

## Why Datastream over alternatives

| Feature | Datastream | EDGAR EFTS | Bloomberg | Refinitiv |
|---------|-----------|-----------|-----------|-----------|
| Semantic search | Yes | No | No | No |
| Section-level search | Yes | No | Partial | Partial |
| API access | REST + SDKs | Limited | Terminal only | Proprietary |
| Real-time indexing | Minutes | Hours | Varies | Varies |
| Pricing | Pay-as-you-go | Free (limited) | $24k+/year | $22k+/year |

## Supported form types

The API indexes every form type on EDGAR. Common types include:

- **Annual reports**: 10-K, 10-K/A, 20-F
- **Quarterly reports**: 10-Q, 10-Q/A
- **Current events**: 8-K, 8-K/A
- **Proxy statements**: DEF 14A, DEFA14A
- **Registration statements**: S-1, S-3, F-1
- **Ownership**: 13F-HR, Form 3, Form 4, Form 5, SC 13D, SC 13G
- **Offerings**: D, D/A

See [Filing Types and Exhibits](/filing-types-and-exhibits) for the complete list.

## Get started

<Card title="Get your API key" icon="key" href="/getting-started">
  Create a free account and start searching filings in under 60 seconds.
</Card>

- [Semantic Search Tutorial](/tutorials/semantic-search-risk-factors)
- [API Reference](/api-reference/search)
- [Full documentation](/api-overview)
