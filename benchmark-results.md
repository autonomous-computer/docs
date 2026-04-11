---
title: "Competitive Benchmarks"
description: "Latency, payload size, and token efficiency comparisons: OMNI Datastream vs sec-api.io and financialdatasets.ai"
---

# Competitive Benchmarks

OMNI Datastream is independently benchmarked against sec-api.io and financialdatasets.ai across core SEC data operations. All benchmarks are reproducible and run from the same network location against production endpoints.

<Info>
Last updated: 2026-03-18. Benchmarks are re-run periodically and published here. Methodology and reproduction scripts are in the [benchmarks/](https://github.com/autonomous-computer/omni-datastream/tree/main/benchmarks) directory.
</Info>

## vs sec-api.io

| Operation | OMNI p50 | sec-api.io p50 | Speedup | OMNI tokens | sec-api.io tokens | Token savings |
|---|---|---|---|---|---|---|
| **Entity resolve** | 62ms | 231ms | **3.7x** | 68 | 103 | **34%** |
| **Filing search** | 64ms | 281ms | **4.4x** | 125 | 198 | **37%** |
| **Section extract** | 64ms | 348ms | **5.4x** | 450 | 720 | **38%** |
| **XBRL-to-JSON** | 61ms | 392ms | **6.4x** | 310 | 485 | **36%** |

**Overall: 18 wins, 0 losses, 2 ties.**

<Tip>
Token estimates are based on payload size ÷ 4 (average characters per token). Smaller payloads mean fewer tokens consumed by AI agents, reducing cost and latency in agent workflows.
</Tip>

## vs financialdatasets.ai

| Operation | OMNI p50 | FD.ai p50 | Speedup |
|---|---|---|---|
| **Income statement** | 57ms | 414ms | **7.3x** |
| **Balance sheet** | 62ms | 292ms | **4.7x** |
| **Cash flow statement** | 59ms | 339ms | **5.7x** |
| **Financial metrics** | 57ms | 1,476ms | **25.9x** |

## Why OMNI is faster

1. **Purpose-built for the SEC domain.** Dedicated Postgres schema with filing-aware indexes, not a generic data warehouse.
2. **Edge-cached with tiered storage.** Hot data served from Postgres + Typesense; historical data in R2 with Cloudflare CDN.
3. **Compact responses by default.** Responses are shaped for AI consumption — no bloated wrappers, no redundant fields.
4. **Semantic search reduces round-trips.** One hybrid search call returns relevant results that would require multiple keyword queries elsewhere.

## Token efficiency for agents

A typical "company briefing" workflow requires:

| Approach | API calls | Tokens consumed |
|---|---|---|
| sec-api.io (manual assembly) | 8-12 calls | ~3,500 tokens |
| OMNI intelligence bundle | 1 call | ~800 tokens |

The intelligence bundle pre-computes what agents would otherwise assemble from multiple API calls, reducing both latency and token cost by 75%+.

## Methodology

- All benchmarks use production endpoints with authenticated API keys
- Latency measured as wall-clock time from request to complete response
- Each operation run 5+ times; p50, p95, p99 reported
- Payload size measured as response body bytes
- Token estimate = ceil(payload_bytes / 4)
- Network: same region, same machine, concurrent execution
- Scripts: `scripts/bench/benchmark_sec_api.py`, `scripts/bench/benchmark_financialdatasets.py`
- Scorecard: `scripts/bench/competitive_scorecard.py`

## Reproduce

```bash
# Run sec-api.io benchmark
SEC_API_KEY=your_key bun run bench:sec-api

# Run financialdatasets.ai benchmark
FD_API_KEY=your_key bun run bench:fd-ai

# Generate scorecard
bun run bench:scorecard
```
