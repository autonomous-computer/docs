# SEC Data for Legal Teams

<Info>
Omni Datastream gives law firms programmatic access to SEC enforcement actions, filing histories, entity resolution, and compliance-grade event monitoring -- all through a single API with full provenance and request traceability.
</Info>

## Why legal teams use Datastream

<CardGroup cols={2}>
  <Card title="Enforcement action search" icon="shield" href="/api-reference/events">
    Search and monitor SEC enforcement actions by entity, date range, or source type. Every result carries a trace reference back to the original SEC release.
  </Card>
  <Card title="Filing monitoring" icon="files" href="/filing-types-and-exhibits">
    Track 10-K, 10-Q, 8-K, and proxy filings for client companies. Filter by form type, date, or specific exhibits.
  </Card>
  <Card title="Compliance screening" icon="search-code" href="/api-reference/entities">
    Resolve entities by ticker, CIK, or name and cross-reference against enforcement history, insider transactions, and ownership disclosures.
  </Card>
  <Card title="8-K event alerts" icon="bell" href="/webhook-stream-workflows">
    Monitor material events -- leadership changes, restatements, M&A announcements -- in real time via webhooks or polling.
  </Card>
</CardGroup>

---

## Key endpoints for legal workflows

| Endpoint | Method | Use case |
|----------|--------|----------|
| `/v1/events/enforcement` | `GET` | Search enforcement actions by entity, date, or source type |
| `/v1/filings` | `GET` | Filing search with form type, ticker, date filters |
| `/v1/entities/resolve` | `GET` | Resolve ticker, CIK, or company name to a canonical entity |
| `/v1/events/8k` | `GET` | Material event monitoring (leadership, restatements, M&A) |
| `/v1/insiders` | `GET` | Insider transaction history for a given entity |
| `/v1/filings/latest/sections/{item}` | `GET` | Extract specific filing sections (risk factors, legal proceedings) |

---

## Example: monitor enforcement actions mentioning your client

Search for all SEC enforcement actions that reference a specific company:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/events/enforcement?query=Acme+Corp&limit=25"
```

Combine with entity resolution to find the canonical CIK first:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/entities/resolve?query=Acme+Corp"
```

Then monitor filings for that entity:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/filings?cik=0001234567&form=8-K&limit=10"
```

Every response includes `requestId` and `traceparent` for downstream audit trails.

---

## Example: extract legal proceedings from a 10-K

Pull the legal proceedings section directly from the latest annual filing:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/filings/latest/sections/item_3?ticker=AAPL&form=10-K&mode=compact"
```

Use `mode=compact` for machine-first payloads suited to downstream analysis pipelines.

---

## Recommended skills

These Claude Code skills accelerate legal research workflows:

| Skill | What it does |
|-------|-------------|
| `enforcement.list` | Search enforcement actions with natural language filters |
| `filing.search` | Find filings by company, form type, and date range |
| `entity.resolve` | Resolve ambiguous company references to canonical identifiers |
| `events.monitor` | Set up webhook-driven monitoring for material events |

Install via MCP for agent-driven legal research:

```bash
omni-sec mcp install
```

---

## Pricing for legal teams

<CardGroup cols={2}>
  <Card title="Free tier" icon="rocket">
    Start with 100 requests per day at no cost. Enough to evaluate enforcement search, entity resolution, and filing lookups for a single matter.
  </Card>
  <Card title="Builder plan" icon="hammer" href="/plans-and-pricing">
    Self-serve API access with pay-as-you-go metering. Scale from one matter to firm-wide compliance monitoring without procurement friction.
  </Card>
</CardGroup>

<Prompt>
You are a legal research assistant with access to Omni Datastream. For any client company, resolve the entity, check enforcement history, pull the latest 10-K risk factors and legal proceedings sections, and summarize insider trading activity from the past 12 months. Always include requestId references for auditability.
</Prompt>
