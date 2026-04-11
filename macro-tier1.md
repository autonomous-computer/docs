---
title: "Macro Tier-1 Official Sources"
description: "Official-source macro indicators from FRED, World Bank, IMF for US, China, Japan"
---

# Macro Tier-1 Official Sources

OMNI Datastream provides allocator-grade macro data from official government sources — not third-party aggregators.

## Coverage

### Launch Ring (Tier-1)

| Country | Series Count | Primary Sources |
|---|---|---|
| **US** | 32 | FRED/ALFRED, BLS, Census |
| **China** | 14 | NBS, PBoC, SAFE |
| **Japan** | 10 | BOJ, MOF, Cabinet Office |
| **Taiwan** | 7 | DGBAS, CBC |
| **Israel** | 8 | CBS, BOI |

### Expansion Ring

| Country | Status |
|---|---|
| South Korea | Planned |
| India | Planned |
| Brazil | Planned |
| UK | Planned |
| Eurozone | Planned |
| Canada | Planned |

## Endpoints

### Search Indicators
```bash
curl "https://api.secapi.ai/v1/macro/search?q=gdp" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

### Get Observations
```bash
curl "https://api.secapi.ai/v1/macro/indicators?series=US_GDP&limit=10" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

### Release Calendar
```bash
curl "https://api.secapi.ai/v1/macro/calendar" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

### High-Signal Pack (Country Bundle)
```bash
curl "https://api.secapi.ai/v1/macro/high-signal-pack?country=CN" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Returns the curated set of indicators for a country with source provenance and revision metadata.

### Macro Regimes
```bash
curl "https://api.secapi.ai/v1/macro/regimes" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Returns current macro regime classification per country (expansion, contraction, recovery, overheating).

## Source Provenance

Every observation includes:
- **Source**: The official government agency
- **Revision status**: Whether this is a preliminary, revised, or final release
- **Release calendar**: When the next update is expected
- **Fallback policy**: DBnomics is used as fallback only when official APIs are unavailable
