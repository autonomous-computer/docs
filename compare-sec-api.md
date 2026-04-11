---
title: "OMNI Datastream vs sec-api.io"
description: "Feature-by-feature comparison of OMNI Datastream and sec-api.io — speed, pricing, endpoints, and agent support"
---

# OMNI Datastream vs sec-api.io

A direct comparison of the two leading SEC data APIs for developers and AI agents.

## Speed

| Operation | OMNI | sec-api.io | Winner |
|---|---|---|---|
| Entity resolution | **62ms** | 231ms | OMNI (3.7x) |
| Filing search | **64ms** | 281ms | OMNI (4.4x) |
| Section extraction | **64ms** | 348ms | OMNI (5.4x) |
| XBRL-to-JSON | **61ms** | 392ms | OMNI (6.4x) |

## Pricing

| Tier | OMNI | sec-api.io |
|---|---|---|
| **Free** | 250 calls/month (renewable) | 100 calls (lifetime) |
| **Pay-as-you-go** | From $0.01/call | Not offered |
| **Personal** | $55/month | $49/month |
| **Business/Team** | $239/month | $199/month |
| **Enterprise** | Custom | Custom |

**Key difference:** OMNI offers true pay-as-you-go with no monthly minimum. An agent making 200 queries/month pays $4 with OMNI vs $49 minimum with sec-api.io.

## Features

| Feature | OMNI | sec-api.io |
|---|---|---|
| **Endpoints** | 217+ | ~35 |
| **Filing coverage** | 1993–present (456K+ manifests) | 1993–present (20M+ claimed) |
| **Full-text search** | Yes | Yes |
| **Semantic search** | Yes (Pinecone + Voyage) | No |
| **Hybrid search (RRF)** | Yes | No |
| **Intelligence bundles** | Yes (company, security, earnings) | No |
| **Filing diff** | Yes (amendment tracking) | No |
| **Saved monitors** | Yes (webhook alerts) | No |
| **Workflow templates** | Yes (3 built-in) | No |
| **MCP integration** | Yes (native) | No |
| **CLI** | Yes (`omni-sec` on npm) | No |
| **SDKs** | 4 (JS, Python, Go, Rust) | 2 (Python, Node.js) |
| **Homebrew** | Yes | No |
| **Skills** | 8 canonical skills | No |
| **Agent bootstrap** | Yes (ephemeral credentials) | No |
| **Budget controls** | Yes (threshold alerts) | No |
| **Webhooks** | Yes (signed, replay) | No |
| **Event streams** | Yes (cursor-based) | No |
| **Data provenance** | Yes (trace on every object) | No |
| **Filing export** | 6 formats (JSON, MD, CSV, XLSX, DOCX, PDF) | PDF only |

## Endpoint Coverage

| Category | OMNI | sec-api.io |
|---|---|---|
| Filing search | Yes | Yes |
| Full-text search | Yes | Yes |
| Section extraction | Yes | Yes |
| XBRL/statements | Yes | Yes |
| Entity mapping | Yes (+ FIGI, ISIN) | Yes |
| Insider trading | Yes | Yes |
| 13F holdings | Yes (+ comparison) | Yes |
| Executive comp | Yes (+ comparison) | Yes |
| Enforcement | Yes (5,993+ records) | Yes |
| Board composition | Yes | Yes (directors) |
| Subsidiaries | Yes (Exhibit 21) | Yes |
| Audit fees | Yes | No |
| Form 144 | Yes | Yes |
| Form D (structured) | Yes (XML extraction) | Yes |
| Form C | Yes | Yes |
| Reg A (Form 1-A) | Yes | Yes |
| N-PORT | Yes | Yes |
| N-CEN | Yes | Yes |
| N-PX | Yes | Yes |
| Form ADV | Yes (+ schedule/AUM filters) | Yes |
| EDGAR index | Yes (3 endpoints) | Yes |
| Bulk download | Yes (summary + quarter) | Yes (file mirror) |
| Real-time streaming | Yes (WebSocket + webhooks) | Yes (WebSocket only) |
| **Semantic search** | **Yes** | **No** |
| **Intelligence bundles** | **Yes** | **No** |
| **Filing diff** | **Yes** | **No** |
| **Monitors** | **Yes** | **No** |
| **Factor analysis** | **Yes (84 factors)** | **No** |
| **Macro data** | **Yes (12 countries)** | **No** |
| **Portfolio analytics** | **Yes** | **No** |

## Developer Experience

| Feature | OMNI | sec-api.io |
|---|---|---|
| Onboarding time | < 2 minutes | ~5 minutes |
| API key auto-provision | Yes (on signup) | Manual |
| Free tier | 250/month, no card | 100 lifetime |
| Documentation | 205 pages | ~40 pages |
| Tutorials | 8 (Python + JS) | 27 (Python only) |
| OpenAPI spec | Yes (generated from Zod) | No |
| Changelog | Yes | No |
| Status page | Yes | No |
| Error codes | Structured with requestId | Basic |
| Rate limit headers | Yes (remaining, limit) | No |
| Budget headers | Yes (usage %, threshold) | No |

## Migration

Already using sec-api.io? Our [migration guide](https://docs.secapi.ai/migrate-from-sec-api) maps every sec-api.io endpoint to its OMNI equivalent.

```bash
# sec-api.io                          →  OMNI Datastream
# /mapping/ticker/AAPL                →  /v1/entities/resolve?ticker=AAPL
# POST / (filing search)              →  /v1/filings?ticker=AAPL&form=10-K
# /extractor?url=...&item=1A          →  /v1/filings/latest/sections/item_1a
# /xbrl-to-json?accession=...         →  /v1/statements/all?ticker=AAPL
```

## Try OMNI Datastream

```bash
curl "https://api.secapi.ai/v1/entities/resolve?ticker=AAPL" \
  -H "x-api-key: YOUR_API_KEY"
```

[Get your free API key →](https://secapi.ai/login) — 250 calls/month, no card required.
