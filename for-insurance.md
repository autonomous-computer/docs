# SEC Data for Insurance and Risk

<Info>
Omni Datastream gives insurance and risk teams programmatic access to financial health indicators, restatement and auditor change alerts, executive compensation data, and enforcement history -- all through a single API with webhook-driven monitoring and full provenance.
</Info>

## Why insurance and risk teams use Datastream

<CardGroup cols={2}>
  <Card title="Financial health monitoring" icon="heart-pulse" href="/investment-intelligence">
    Track financial statement trends, key ratios, and segment breakdowns for insured entities and counterparties using intelligence bundles.
  </Card>
  <Card title="Restatement and auditor alerts" icon="triangle-alert" href="/api-reference/events">
    Detect restatements, auditor changes, and going concern opinions as they appear in SEC filings. Route alerts via webhooks.
  </Card>
  <Card title="Executive compensation screening" icon="dollar-sign" href="/compensation-workflows">
    Screen executive pay structures, compare year-over-year changes, and flag outlier compensation arrangements.
  </Card>
  <Card title="Enforcement history" icon="gavel" href="/api-reference/events">
    Search SEC enforcement actions by entity for underwriting due diligence. Every action carries a trace to the original SEC release.
  </Card>
</CardGroup>

---

## Key endpoints for insurance workflows

| Endpoint | Method | Use case |
|----------|--------|----------|
| `/v1/events/enforcement` | `GET` | Enforcement action search for underwriting screening |
| `/v1/compensation` | `GET` | Executive compensation records by company |
| `/v1/compensation/compare` | `POST` | Year-over-year compensation changes |
| `/v1/intelligence/company` | `GET` | Financial health and governance analysis bundle |
| `/v1/filings` | `GET` | Filing search with form type and date filters |
| `/v1/filings/latest/sections/{item}` | `GET` | Extract specific sections (auditor report, risk factors) |
| `/v1/webhooks` | `POST` | Register webhook endpoints for event-driven monitoring |

---

## Example: screen counterparty risk using enforcement history

Check whether a counterparty has any SEC enforcement history:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/events/enforcement?query=Acme+Corp&limit=25"
```

Pull the company intelligence bundle for a financial health overview:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/intelligence/company?ticker=XYZ&includeGovernance=true"
```

Review executive compensation for red flags:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/compensation?ticker=XYZ&limit=10"
```

Every response includes `requestId` and `traceparent` for audit trails.

---

## Example: webhook-driven restatement monitoring

Register a webhook to receive alerts when material events are filed:

```bash
curl -X POST \
  -H "content-type: application/json" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -d '{"url":"https://your-system.example.com/webhooks/sec","events":["filing.published","enforcement.published"],"filter":{"tickers":["XYZ","ABC","DEF"]}}' \
  "https://api.secapi.ai/v1/webhooks"
```

Monitor for restatements by extracting auditor opinion sections from new filings:

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/filings/latest/sections/item_9a?ticker=XYZ&form=10-K&mode=compact"
```

Webhook deliveries include the same provenance and `requestId` metadata as direct API calls. Use `/v1/events/export` to audit delivery history.

---

## Recommended skills

These Claude Code skills accelerate insurance and risk workflows:

| Skill | What it does |
|-------|-------------|
| `enforcement.list` | Search enforcement actions for underwriting screening |
| `intelligence.company` | Pull financial health and governance analysis bundles |
| `compensation.list` | Retrieve and compare executive compensation records |
| `filing.search` | Find filings by company, form type, and date range |
| `events.monitor` | Configure webhook-driven event monitoring |

Install via MCP for agent-driven risk assessment:

```bash
omni-sec mcp install
```

---

## Pricing for insurance teams

<CardGroup cols={2}>
  <Card title="Webhook-driven monitoring" icon="radio" href="/webhook-stream-workflows">
    Register webhooks for the entities you underwrite. Pay only for the events you consume. No polling infrastructure required.
  </Card>
  <Card title="Platform plan" icon="building" href="/plans-and-pricing">
    For teams monitoring large portfolios of insured entities. Custom throughput, dedicated support, and bulk event export.
  </Card>
</CardGroup>

<Prompt>
You are a risk assessment agent with access to Omni Datastream. For any company under review, check enforcement history, pull the company intelligence bundle for financial health, review executive compensation structures, and extract auditor opinion and risk factor sections from the latest 10-K. Flag restatements, auditor changes, and enforcement actions as high-priority findings. Always include requestId references for compliance documentation.
</Prompt>
