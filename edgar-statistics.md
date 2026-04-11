---
title: "EDGAR Filing Statistics"
description: "Coverage statistics for OMNI Datastream's SEC EDGAR filing database — 456,000+ filings from 1993 to present"
---

# EDGAR Filing Statistics

OMNI Datastream indexes and serves SEC EDGAR filings from 1993 to present, with real-time detection of new filings within seconds of SEC publication.

## Coverage Summary

| Metric | Value |
|---|---|
| **Total filing manifests** | 456,146+ |
| **EDGAR full index entries** | 3,182,193+ |
| **Date range** | August 1993 – Present |
| **Enforcement records** | 5,993+ (back to 2003) |
| **Entity resolution coverage** | 8,466+ canonical entities |
| **Exchange enrichment** | 7,823 entities with exchange data |
| **New filing detection** | < 10 seconds (RSS poller) |

## Supported Filing Types

OMNI Datastream supports all SEC EDGAR filing types through generic filing search. The following have dedicated endpoints with structured extraction:

### Core Filings
| Form | Endpoint | Description |
|---|---|---|
| **10-K** | `/v1/filings` | Annual reports |
| **10-Q** | `/v1/filings` | Quarterly reports |
| **8-K** | `/v1/filings` | Current event reports |
| **DEF 14A** | `/v1/filings` | Proxy statements |
| **20-F** | `/v1/filings` | Foreign private issuer annual |
| **S-1** | `/v1/filings` | Registration statements |

### Ownership & Governance
| Form | Endpoint | Description |
|---|---|---|
| **13F-HR** | `/v1/owners/13f` | Institutional holdings |
| **Schedule 13D** | `/v1/owners/13d-13g` | Beneficial ownership (activist) |
| **Schedule 13G** | `/v1/owners/13d-13g` | Beneficial ownership (passive) |
| **Form 3/4/5** | `/v1/insiders` | Insider transactions |
| **Form 144** | `/v1/forms/144` | Restricted stock sales |

### Fund Filings
| Form | Endpoint | Description |
|---|---|---|
| **N-PORT** | `/v1/funds/nport/holdings` | Fund holdings |
| **N-CEN** | `/v1/forms/ncen` | Fund census data |
| **N-PX** | `/v1/forms/npx` | Proxy voting records |

### Offerings
| Form | Endpoint | Description |
|---|---|---|
| **Form D** | `/v1/forms/d` | Private placements (structured XML extraction) |
| **Form C** | `/v1/forms/c` | Crowdfunding offerings |
| **Form 1-A** | `/v1/forms/1-a` | Regulation A offerings |
| **S-1/424B** | `/v1/offerings` | Registration/prospectus filings |

### Enforcement
| Source | Endpoint | Description |
|---|---|---|
| **Litigation Releases** | `/v1/events/enforcement` | SEC federal court actions |
| **Admin Proceedings** | `/v1/events/enforcement` | SEC administrative proceedings |
| **AAERs** | `/v1/events/enforcement` | Accounting enforcement releases |

### Extracted Data
| Data | Endpoint | Description |
|---|---|---|
| **Financial statements** | `/v1/statements` | Income, balance sheet, cash flow |
| **XBRL facts** | `/v1/facts` | Structured financial data |
| **Subsidiaries** | `/v1/companies/subsidiaries` | Exhibit 21 extraction |
| **Audit fees** | `/v1/companies/audit-fees` | Proxy statement fee tables |
| **Board composition** | `/v1/board` | Director information |
| **Executive compensation** | `/v1/compensation` | Named executive officer comp |
| **Risk categories** | `/v1/filings/latest/risk-categories` | Item 1A classification |

## Data Freshness

| Source | Update Frequency | Detection Latency |
|---|---|---|
| EDGAR RSS poller | Every 5 seconds | < 10 seconds |
| Enforcement sync | Daily (07:30 UTC) | < 24 hours |
| XBRL facts | Daily (07:00 UTC) | < 24 hours |
| Entity enrichment | On demand | Real-time |

## Historical Depth

Filing search returns results from **1993 to present** across all form types in the EDGAR full index. Content extraction (sections, XBRL, exhibits) is available for filings with supported formats.

```bash
# Search filings from 1995
curl "https://api.secapi.ai/v1/filings?date_from=1995-01-01&date_to=1995-12-31&limit=5" \
  -H "x-api-key: YOUR_API_KEY"
```
