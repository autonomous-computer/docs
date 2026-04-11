# Audit Logs

Omni Datastream records every API interaction as a traceable event. Audit surfaces are available through four endpoint families: request diagnostics, event listing and export, delivery summaries, and observability exports. All endpoints require org-scoped authentication via API key or bearer token.

## Request Diagnostics

### GET /v1/diagnostics/requests/:requestId

Drill into a single request using the `Request-Id` header value returned in every API response.

```bash
curl "$OMNI_DATASTREAM_URL/v1/diagnostics/requests/req_abc123" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

**Response includes:**

- usage events recorded for the request
- canonical events emitted (e.g., `artifact.created`, `webhook_endpoint.created`)
- webhook delivery attempts triggered by the request
- stream events published to active subscriptions
- artifacts generated or referenced
- grouped counts by meter class and event type

Use this as the first investigation step when a customer or internal team provides a `Request-Id`.

### GET /v1/diagnostics/deliveries/summary

Aggregate webhook and stream delivery activity over a time window.

```bash
curl "$OMNI_DATASTREAM_URL/v1/diagnostics/deliveries/summary?since=2026-01-01T00:00:00Z&limit=200" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `since` | ISO 8601 string | none | Start of the time window |
| `limit` | integer | 200 | Maximum number of records |

**Use cases:**

- identify which webhook destinations are failing
- detect event types that are replaying frequently
- confirm stream polling activity is flowing as expected

## Event Export

### GET /v1/events

List recent events with filtering. Returns a paginated list.

```bash
curl "$OMNI_DATASTREAM_URL/v1/events?kind=event&type=artifact.created&limit=25" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `kind` | string | none | Filter by event kind (e.g., `event`, `webhook_delivery`) |
| `type` | string | none | Filter by event type (e.g., `artifact.created`, `webhook_endpoint.created`) |
| `requestId` | string | none | Filter to events from a specific request |
| `since` | ISO 8601 string | none | Start of the time window |
| `limit` | integer | 25 | Maximum number of records |

### GET /v1/events/export

Export events in JSON or NDJSON format for ingestion into external systems.

```bash
# JSON export
curl "$OMNI_DATASTREAM_URL/v1/events/export?kind=event&limit=100&format=json" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# NDJSON export (for log processors and SIEM)
curl "$OMNI_DATASTREAM_URL/v1/events/export?kind=webhook_delivery&since=2026-03-14T00:00:00Z&format=ndjson" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `kind` | string | none | Filter by event kind |
| `type` | string | none | Filter by event type |
| `requestId` | string | none | Filter to events from a specific request |
| `since` | ISO 8601 string | none | Start of the time window |
| `limit` | integer | 100 | Maximum number of records |
| `format` | `json` or `ndjson` | `json` | Output format |

NDJSON (`application/x-ndjson`) returns one JSON object per line. Use this when downstream tooling expects line-oriented ingestion (Splunk, Datadog, ELK, or custom log pipelines).

## Observability

### GET /v1/observability

Returns the current observability configuration. No secrets are exposed.

```bash
curl "$OMNI_DATASTREAM_URL/v1/observability" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

**Response includes:**

- which providers are configured at the environment level
- whether usage and webhook event logs are enabled
- the current quota table used by the API layer

### GET /v1/observability/export

Bundles observability config, usage summary, billing health, and recent events into a single response.

```bash
curl "$OMNI_DATASTREAM_URL/v1/observability/export?limit=20" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | 20 | Maximum number of recent events to include |

Use this when preparing a support ticket or validating pre-production environments.

## Usage Tracking

### GET /v1/usage

Returns metered usage events grouped by meter class for the current billing period.

```bash
curl "$OMNI_DATASTREAM_URL/v1/usage" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Meter classes include: `light_reads`, `standard_reads`, `heavy_extracts`, `artifact_jobs`, `delivery_events`, `intelligence_queries`, `market_data_reads`.

### GET /v1/limits

Returns rate limits, API key limits, and throughput ceilings for the current plan.

```bash
curl "$OMNI_DATASTREAM_URL/v1/limits" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

### GET /v1/billing

Returns the full billing snapshot: plan key, billing state, spend caps, budget alerts, and Stripe subscription status.

```bash
curl "$OMNI_DATASTREAM_URL/v1/billing" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Compliance Integration Patterns

### SIEM export

Use the NDJSON event export to feed events into a SIEM pipeline:

```bash
# Periodic export for Splunk / Datadog / ELK
curl "$OMNI_DATASTREAM_URL/v1/events/export?since=2026-04-09T00:00:00Z&format=ndjson&limit=1000" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  >> /var/log/omni-datastream-events.ndjson
```

### Budget audit trail

Budget changes are recorded with the acting principal, previous values, and request ID. Query the event log for `budget.updated` events to reconstruct the change history.

### Request traceability

Every API response includes `Request-Id` and `traceparent` headers. Preserve these in your application logs to correlate downstream effects with the originating request.

## Endpoint summary

| Endpoint | Method | Description |
|---|---|---|
| `/v1/diagnostics/requests/:requestId` | GET | Request-scoped diagnostic drilldown |
| `/v1/diagnostics/deliveries/summary` | GET | Aggregated delivery activity |
| `/v1/events` | GET | Filtered event listing |
| `/v1/events/export` | GET | JSON or NDJSON event export |
| `/v1/observability` | GET | Observability configuration |
| `/v1/observability/export` | GET | Bundled observability export |
| `/v1/usage` | GET | Metered usage summary |
| `/v1/limits` | GET | Plan limits and rate ceilings |
| `/v1/billing` | GET | Full billing snapshot |

## Read next

<CardGroup cols={3}>
  <Card title="Enterprise Features" icon="building-2" href="/enterprise">
    SSO, key rotation, multi-seat organizations, and commercial licensing.
  </Card>
  <Card title="Request Diagnostics" icon="stethoscope" href="/request-diagnostics">
    Detailed guide for request-scoped investigation.
  </Card>
  <Card title="Event Export" icon="file-export" href="/event-export">
    Filtering, JSON, and NDJSON export workflows.
  </Card>
</CardGroup>
