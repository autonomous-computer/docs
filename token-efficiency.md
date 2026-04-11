---
title: "Token Efficiency"
description: "How OMNI Datastream reduces token consumption for AI agent workflows vs sec-api.io"
---

# Token Efficiency

AI agents pay for tokens. OMNI Datastream is designed to minimize token consumption while maximizing information density.

## The Token Tax

When an AI agent queries SEC data, every byte of the API response consumes tokens. Bloated responses waste money and slow down agent reasoning. OMNI Datastream solves this with compact, purpose-built responses.

## Side-by-Side: OMNI vs sec-api.io

### Entity Resolution

| Metric | OMNI | sec-api.io | Savings |
|---|---|---|---|
| Response size | 273 bytes | 412 bytes | **34%** |
| Estimated tokens | 68 | 103 | **34%** |
| Latency | 62ms | 231ms | **73%** |

### Filing Search

| Metric | OMNI | sec-api.io | Savings |
|---|---|---|---|
| Response size | 500 bytes | 792 bytes | **37%** |
| Estimated tokens | 125 | 198 | **37%** |
| Latency | 64ms | 281ms | **77%** |

### Section Extraction

| Metric | OMNI | sec-api.io | Savings |
|---|---|---|---|
| Response size | 1,800 bytes | 2,880 bytes | **38%** |
| Estimated tokens | 450 | 720 | **38%** |
| Latency | 64ms | 348ms | **82%** |

## Intelligence Bundles: 75% Token Reduction

A typical "company briefing" requires assembling data from multiple sources:

### Traditional Approach (sec-api.io)
```
1. Entity resolve         →  103 tokens
2. Latest 10-K search     →  198 tokens
3. Item 1A extraction     →  720 tokens
4. Latest 10-Q search     →  198 tokens
5. Executive compensation →  450 tokens
6. Insider trades          →  350 tokens
7. 13F holdings           →  400 tokens
8. Recent 8-K events      →  600 tokens
─────────────────────────────────────
Total: 8 API calls, ~3,019 tokens
```

### OMNI Intelligence Bundle
```
1. Company intelligence   →  ~800 tokens
─────────────────────────────────────
Total: 1 API call, ~800 tokens
```

**Result: 75% fewer tokens, 87% fewer API calls.**

## Why OMNI Responses Are Smaller

1. **No wrapper bloat.** Responses contain data, not framework metadata.
2. **Compact mode.** Use `?view=compact` to get minimal responses for agent consumption.
3. **Pre-computed intelligence.** One bundle call replaces 8+ raw API calls.
4. **Semantic search.** Find relevant content in one call instead of paginating through keyword results.

## Measure It Yourself

```bash
# Compare response sizes
OMNI_SIZE=$(curl -s "https://api.secapi.ai/v1/entities/resolve?ticker=AAPL" \
  -H "x-api-key: $OMNI_KEY" | wc -c)

SEC_API_SIZE=$(curl -s "https://api.sec-api.io/mapping/ticker/AAPL" \
  -H "Authorization: $SEC_API_KEY" | wc -c)

echo "OMNI: $OMNI_SIZE bytes, sec-api.io: $SEC_API_SIZE bytes"
```
