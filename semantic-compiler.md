---
title: Semantic Compiler v2
description: Deterministic slot-based query planning for intelligence queries
---

# Semantic Compiler v2

The semantic compiler replaces substring-based routing in intelligence queries with deterministic, slot-based query planning. Given a natural-language prompt it produces a `QueryPlan` that captures the user's intent, extracted parameters (slots), which API endpoints are required, and the order in which those endpoints should be called.

**Status:** Scaffolding complete (OMNI-2296). Route integration is a follow-up task.

## Design principles

| Principle | Detail |
|-----------|--------|
| **Deterministic** | No LLM calls. Intent detection uses keyword patterns; slot extraction uses regex. The same prompt always produces the same plan. |
| **Slot-based** | Structured parameters (ticker, CIK, form type, date range, lookback, section) are extracted into a flat `Record<string, string>` for downstream consumers. |
| **Endpoint-aware** | Each intent maps to a fixed set of API endpoints, grouped into parallel execution stages. |

## QueryPlan type

```ts
type QueryPlan = {
  intent: SemanticIntent
  slots: Record<string, string>
  requiredEndpoints: string[]
  executionOrder: string[][]
}
```

### SemanticIntent

| Intent | Trigger keywords |
|--------|-----------------|
| `company_analysis` | analyze, research, deep dive, filings |
| `security_overview` | overview, summary, snapshot, quote |
| `earnings_prep` | earnings, EPS, guidance, quarterly results |
| `portfolio_review` | portfolio, allocation, rebalance, stress test |
| `footnote_investigation` | footnote, risk factors, item 1a, lease, pension, segment |
| `ownership_comparison` | 13F, ownership, institutional holding, position change |
| `insider_tracking` | insider, form 4, insider trading |
| `macro_regime` | macro, GDP, inflation, fed, recession, yield curve |
| `factor_decomposition` | factor, decompose, attribution, regime screen |

### Slot extraction

| Slot | Example input | Extracted value |
|------|--------------|-----------------|
| `ticker` | "analyze Apple" | `AAPL` |
| `ticker` | "look at MSFT" | `MSFT` |
| `cik` | "CIK 0001318605" | `0001318605` |
| `form` | "latest 10-K" | `10-K` |
| `date_start` / `date_end` | "from 2023-01-01 to 2024-06-30" | `2023-01-01` / `2024-06-30` |
| `lookback` | "over 6m" | `6m` |
| `section` | "risk factors" | `item_1a` |
| `name` | "Berkshire" (no ticker match) | `Berkshire` |

The compiler recognizes ~30 well-known company names (Apple, Tesla, Nvidia, etc.) and maps them to their ticker symbols automatically.

## Execution order

The `executionOrder` field groups endpoints into parallel stages:

- **Stage 0** — the primary data fetch (always a single endpoint).
- **Stage 1** — enrichment calls that can run in parallel once stage 0 completes.

For example, a `company_analysis` plan produces:

```json
{
  "executionOrder": [
    ["/v1/intelligence/company"],
    ["/v1/sec/filings", "/v1/market/snapshot"]
  ]
}
```

## Usage

```ts
import { compileQuery } from "../lib/semantic-compiler.js"

const plan = compileQuery("what are Tesla's risk factors")
// {
//   intent: "footnote_investigation",
//   slots: { ticker: "TSLA", section: "item_1a" },
//   requiredEndpoints: [
//     "/v1/intelligence/footnotes/query",
//     "/v1/sec/filings",
//     "/v1/sec/sections"
//   ],
//   executionOrder: [
//     ["/v1/intelligence/footnotes/query"],
//     ["/v1/sec/filings", "/v1/sec/sections"]
//   ]
// }
```

## Integration roadmap

1. **OMNI-2296** (this task) — scaffolding: `QueryPlan` type, `compileQuery()` function, tests, docs.
2. **Follow-up** — wire `compileQuery` into the `/v1/intelligence/query` route as an alternative to the existing `planIntelligenceQuery` / `classifyWithConfidence` pipeline.
3. **Deprecation** — once v2 is validated in production, deprecate the v1 substring-based classifier.

## Source files

| File | Purpose |
|------|---------|
| `services/datastream-api/src/lib/semantic-compiler.ts` | Compiler implementation |
| `services/datastream-api/src/lib/semantic-compiler.test.ts` | Test suite (23 tests) |
