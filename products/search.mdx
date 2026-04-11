# Full-Text & Semantic Search API

Search SEC filings and documents using keyword, semantic, or hybrid retrieval. Powered by Pinecone vector search with Voyage AI embeddings (ranked #1 in finance) and reciprocal rank fusion (RRF) for hybrid queries.

## Why use this

Traditional filing search is keyword-only. The OMNI Search surface adds semantic retrieval so you can find filings by concept, not just exact terms. Hybrid mode fuses keyword and vector results using RRF scoring for the best of both approaches.

- **Three retrieval modes** -- keyword, semantic, and hybrid (RRF fusion)
- **Voyage AI embeddings** -- ranked #1 in finance by MTEB benchmarks
- **Pinecone vector index** -- low-latency similarity search across the filing corpus
- **Score transparency** -- every result includes a relevance score and the retrieval mode used
- **Filing-scoped** -- results link directly to filing sections and source documents

## Quick start

```bash
# Keyword search
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/search/fulltext?query=revenue+recognition+policy&limit=5"
```

## Example: semantic search

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/search/fulltext?query=companies+discussing+supply+chain+risks+in+asia&retrievalMode=semantic&limit=10"
```

## Example: hybrid search with RRF

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/search/fulltext?query=goodwill+impairment+risk+factors&retrievalMode=hybrid&limit=10"
```

## Response shape

```json
{
  "results": [
    {
      "accessionNumber": "0000320193-23-000077",
      "ticker": "AAPL",
      "companyName": "Apple Inc.",
      "form": "10-K",
      "sectionKey": "item1a",
      "excerpt": "The Company is subject to risks associated with...",
      "score": 0.892,
      "retrievalMode": "hybrid"
    }
  ],
  "pagination": {
    "total": 1240,
    "page": 1,
    "limit": 10
  },
  "meta": {
    "queryTimeMs": 142,
    "retrievalMode": "hybrid"
  }
}
```

## Key parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Search query (required) |
| `retrievalMode` | string | `keyword`, `semantic`, or `hybrid` (default: keyword) |
| `ticker` | string | Scope to a specific company |
| `form` | string | Filter by form type |
| `dateFrom` | string | Start date (ISO 8601) |
| `dateTo` | string | End date (ISO 8601) |
| `limit` | number | Results per page (max 50) |

## Rate limits

- **Standard plan**: 60 requests/minute
- **Pro plan**: 300 requests/minute
- **Enterprise**: Custom limits

Semantic and hybrid queries consume more compute than keyword queries. Rate limits reflect this difference.

## Related

- [API Reference: Full-Text Search](/api-reference/search)
- [Coverage and Depth](/coverage-and-depth)
- [Getting Started](/getting-started)
