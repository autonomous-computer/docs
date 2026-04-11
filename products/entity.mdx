# Entity Resolution & Mapping API

Resolve any company identifier -- CIK, ticker, FIGI, ISIN, CUSIP, or name -- to a canonical entity record with exchange, sector, industry, and SIC code. The entity graph powers identity joins across every other OMNI API surface.

## Why use this

Financial data systems break when entity identity is ambiguous. The OMNI Entity Resolution surface maintains a canonical graph of issuers, filers, managers, insiders, funds, and aliases so downstream queries do not need to rebuild identity logic on every call.

- **Six identifier types** -- CIK, ticker, FIGI, ISIN, CUSIP, and company name
- **Canonical entity graph** -- issuers, filers, managers, insiders, funds, and aliases resolved to a single identity
- **Structured metadata** -- exchange, sector, industry, SIC code, and entity type on every record
- **Alias resolution** -- historical tickers, name changes, and cross-identifier mappings
- **Batch-friendly** -- resolve multiple identifiers in a single request

## Quick start

```bash
# Resolve by ticker
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/entities/resolve?ticker=AAPL"

# Resolve by CIK
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/entities/resolve?cik=0000320193"

# Resolve by name
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/entities/resolve?name=Apple+Inc"
```

## Example: search entities

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/entities?query=tesla&limit=5"
```

## Response shape

```json
{
  "entity": {
    "cik": "0000320193",
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "figi": "BBG000B9XRY4",
    "isin": "US0378331005",
    "cusip": "037833100",
    "exchange": "NASDAQ",
    "sector": "Technology",
    "industry": "Consumer Electronics",
    "sicCode": "3571",
    "sicDescription": "Electronic Computers",
    "entityType": "issuer",
    "aliases": [
      { "type": "formerName", "value": "APPLE COMPUTER INC" }
    ]
  }
}
```

## Key parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ticker` | string | Company ticker symbol |
| `cik` | string | SEC Central Index Key |
| `figi` | string | OpenFIGI identifier |
| `isin` | string | International Securities Identification Number |
| `cusip` | string | CUSIP identifier |
| `name` | string | Company name (fuzzy matched) |
| `query` | string | Search query for entity listing |
| `limit` | number | Results per page (entity search only) |

## Rate limits

- **Standard plan**: 200 requests/minute
- **Pro plan**: 1000 requests/minute
- **Enterprise**: Custom limits

Entity resolution is a lightweight lookup operation. Rate limits are higher than data-heavy endpoints.

## Related

- [API Reference: Entities](/api-reference/entities)
- [Getting Started](/getting-started)
- [Coverage and Depth](/coverage-and-depth)
