# Enterprise Features

Omni Datastream ships enterprise-grade infrastructure from the first request. SSO, audit logging, entitlement reporting, key rotation, and multi-seat organizations are not add-ons — they are built into the platform and available on the appropriate plan tier.

## SSO via WorkOS

All authentication is handled through [WorkOS](https://workos.com). Human access to the dashboard uses WorkOS-hosted login with bearer tokens. MCP access uses WorkOS OAuth discovery through `api.secapi.ai`.

- WorkOS manages user identity, session tokens, and organization membership
- OAuth discovery endpoints are published at `/.well-known/oauth-protected-resource` and `/.well-known/oauth-authorization-server`
- API keys are org-scoped credentials issued through `POST /v1/api_keys` and used via the `x-api-key` header
- SSO is available on all plans — there is no separate SSO add-on

### Enterprise SSO configuration

For teams requiring SAML or OIDC federation with a corporate identity provider, WorkOS supports connecting to Okta, Azure AD, Google Workspace, and other SAML 2.0 / OIDC providers. Contact the Omni Datastream team to configure a custom SSO connection for your organization.

## Audit Logs

Every API request generates a traceable event chain. Omni Datastream provides multiple surfaces for inspecting activity after the fact.

### Request diagnostics

Drill into a single request by its `Request-Id`:

```bash
curl "$OMNI_DATASTREAM_URL/v1/diagnostics/requests/req_abc123" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Returns usage events, canonical events, webhook deliveries, stream events, artifacts, and grouped meter-class counts for that request. See [Request Diagnostics](/request-diagnostics) for the full reference.

### Delivery summary

Aggregate webhook and stream delivery activity over a time window:

```bash
curl "$OMNI_DATASTREAM_URL/v1/diagnostics/deliveries/summary?since=2026-01-01T00:00:00Z&limit=200" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

### Event export

Export the full event log in JSON or NDJSON for ingestion into external SIEM, log aggregation, or compliance tooling:

```bash
curl "$OMNI_DATASTREAM_URL/v1/events/export?kind=event&format=ndjson&limit=100" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Filters: `kind`, `type`, `requestId`, `since`, `limit`, `format` (`json` or `ndjson`). See [Event Export](/event-export) for details.

### Observability export

Bundle observability config, usage summary, billing health, and recent events into a single response for support or pre-production validation:

```bash
curl "$OMNI_DATASTREAM_URL/v1/observability/export?limit=20" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

See [Observability Exports](/observability-exports) for the full reference.

## Entitlement Reporting

Billing state, usage, and plan limits are always available through the API. Use these endpoints to build internal dashboards or enforce organizational spend policies.

### Billing snapshot

```bash
curl "$OMNI_DATASTREAM_URL/v1/billing" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Returns the current plan key, billing state, spend caps, budget alerts, and Stripe subscription status.

### Usage summary

```bash
curl "$OMNI_DATASTREAM_URL/v1/usage" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Returns metered usage events grouped by meter class for the current billing period.

### Plan limits

```bash
curl "$OMNI_DATASTREAM_URL/v1/limits" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Returns the rate limits, API key limits, and throughput ceilings for the current plan.

### Budget controls

Set spend caps and alert thresholds to prevent runaway costs:

```bash
curl -X PUT "$OMNI_DATASTREAM_URL/v1/billing/budget" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"spendCapCents": 50000, "softCapCents": 30000, "approvalThresholdCents": 40000}'
```

Budget events are recorded with the acting principal, previous values, and request ID for audit purposes.

### Dashboard overview

A single call that bundles organization, billing, usage, and API key data for dashboard rendering:

```bash
curl "$OMNI_DATASTREAM_URL/v1/dashboard/overview" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Key Rotation

Webhook signing secrets can be rotated without downtime. The old secret is invalidated immediately and a new secret is returned in the response.

```bash
curl -X POST "$OMNI_DATASTREAM_URL/v1/webhook_endpoints/whe_abc123/rotate_secret" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

The response includes the full webhook endpoint object with the new `signingSecret`. Update your verification logic before the next delivery arrives.

API keys can be revoked and re-created through `DELETE /v1/api_keys/:keyId` and `POST /v1/api_keys`.

## Multi-Seat Organizations

The Team plan (`$239/mo` or `$2,388/yr`) supports up to five seats within a shared organization. All seats share:

- org-scoped API keys with configurable scopes (`read:sec`, `write:sec`, `admin:operator`)
- a unified billing context with shared spend caps and budget alerts
- shared webhook endpoints, stream subscriptions, and event history
- a single billing relationship through Stripe

The Commercial plan extends multi-seat support with custom seat counts, dedicated infrastructure options, and contract-based invoicing.

### API key management

Each plan tier has a key limit. Team plans include more keys than Personal or PAYG:

```bash
# List existing keys
curl "$OMNI_DATASTREAM_URL/v1/api_keys" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Create a new key with specific scopes
curl -X POST "$OMNI_DATASTREAM_URL/v1/api_keys" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"label": "CI pipeline", "scopes": ["read:sec"], "livemode": true}'
```

## SLA Guarantees

Omni Datastream provides a 99.9% webhook delivery guarantee with HMAC-SHA256 signed payloads, exponential-backoff retries over a 72-hour window, and manual replay support. See [Webhook Delivery SLA](/webhook-sla) for the full SLA terms, retry schedule, and monitoring guidance.

## Commercial Licensing

The Commercial plan (from `$18,000/yr`) is required for redistribution, embedding, white-label, and resale use cases. It includes:

- redistribution and external commercial rights
- contract-based invoicing
- dedicated onboarding support
- custom throughput and rate limit configuration

See [Plans and Pricing](/plans-and-pricing) for the full plan comparison and [Enterprise and Commercial Posture](/enterprise-commercial) for the rights boundary and escalation path.

## Enterprise endpoints summary

| Category | Endpoints |
|---|---|
| **Auth** | `GET /v1/me`, `GET /v1/org`, `POST /v1/api_keys`, `DELETE /v1/api_keys/:keyId` |
| **Audit** | `GET /v1/diagnostics/requests/:requestId`, `GET /v1/diagnostics/deliveries/summary`, `GET /v1/events`, `GET /v1/events/export` |
| **Observability** | `GET /v1/observability`, `GET /v1/observability/export` |
| **Entitlements** | `GET /v1/billing`, `GET /v1/usage`, `GET /v1/limits`, `GET /v1/billing/rates`, `GET /v1/dashboard/overview` |
| **Budget** | `PUT /v1/billing/budget`, `POST /v1/billing/quote` |
| **Key rotation** | `POST /v1/webhook_endpoints/:webhookId/rotate_secret` |
| **Checkout** | `POST /v1/billing/checkout`, `POST /v1/billing/portal` |

## Read next

<CardGroup cols={3}>
  <Card title="Audit Logs" icon="scroll" href="/audit-logs">
    Detailed reference for all audit log and event export endpoints.
  </Card>
  <Card title="Webhook Delivery SLA" icon="shield-check" href="/webhook-sla">
    99.9% delivery guarantee, retry policy, and replay support.
  </Card>
  <Card title="Plans and Pricing" icon="gauge" href="/plans-and-pricing">
    Full plan comparison including Commercial licensing.
  </Card>
</CardGroup>
