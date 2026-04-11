# Intelligence Bundles API

Get comprehensive company, security, and earnings intelligence in a single API call. Intelligence bundles aggregate data from multiple underlying endpoints into pre-composed payloads optimized for agent consumption -- 75% fewer tokens compared to assembling the same data from raw API calls.

## Why use this

Agents building company profiles or earnings previews typically need to hit 4-8 separate endpoints and stitch results together. Intelligence bundles do that composition server-side and return a single, token-efficient payload with the same provenance and freshness metadata.

- **One-call composition** -- company, security, and earnings bundles in a single request
- **75% fewer tokens** -- pre-composed payloads eliminate redundant metadata and reduce downstream parsing
- **Agent-optimized** -- structured for direct consumption by LLM agents without post-processing
- **Async query support** -- long-running intelligence queries return a job ID for polling
- **Provenance preserved** -- source accession numbers, filing dates, and data lineage stay in the response

## Quick start

```bash
# Company intelligence bundle
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/intelligence/company?ticker=AAPL"

# Security intelligence bundle
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/intelligence/security?ticker=AAPL"

# Earnings preview bundle
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/intelligence/earnings-preview?ticker=AAPL"
```

## Example: async intelligence query

```bash
# Submit a complex query
curl -X POST -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query":"Compare AAPL and MSFT capital allocation over last 3 years"}' \
  "https://api.secapi.ai/v1/intelligence/query"

# Poll for results
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/intelligence/query/job_abc123"
```

## Response shape (company bundle)

```json
{
  "company": {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "cik": "0000320193",
    "sector": "Technology",
    "industry": "Consumer Electronics",
    "exchange": "NASDAQ",
    "marketCap": 2890000000000,
    "latestFiling": {
      "form": "10-K",
      "filedAt": "2023-11-03",
      "periodOfReport": "2023-09-30"
    },
    "financials": {
      "revenue": 383285000000,
      "netIncome": 96995000000,
      "totalAssets": 352583000000
    },
    "topHolders": ["Vanguard Group", "BlackRock", "Berkshire Hathaway"],
    "recentInsiderActivity": 12
  },
  "meta": {
    "bundleVersion": "2024.1",
    "tokenCount": 847,
    "sources": ["10-K:0000320193-23-000077", "13F:Q3-2023"]
  }
}
```

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /v1/intelligence/company` | Company intelligence bundle |
| `GET /v1/intelligence/security` | Security-level intelligence bundle |
| `GET /v1/intelligence/earnings-preview` | Earnings preview bundle |
| `POST /v1/intelligence/query` | Async intelligence query |
| `GET /v1/intelligence/query/:jobId` | Poll async query result |
| `POST /v1/intelligence/portfolio` | Portfolio-level intelligence |
| `POST /v1/intelligence/watchlist` | Watchlist intelligence |
| `POST /v1/intelligence/footnotes/query` | Structured footnote analysis |
| `POST /v1/intelligence/country-report` | Country-level macro intelligence |

## Rate limits

- **Standard plan**: 30 requests/minute
- **Pro plan**: 150 requests/minute
- **Enterprise**: Custom limits

Intelligence bundles are more compute-intensive than single-endpoint calls. Rate limits are set accordingly.

## Related

- [API Reference: Intelligence](/api-reference/intelligence)
- [Token Efficiency](/token-efficiency)
- [Investment Intelligence](/investment-intelligence)
