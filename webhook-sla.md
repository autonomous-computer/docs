---
title: "Webhook Delivery SLA"
description: "99.9% webhook delivery guarantee with signed payloads, automatic retries, and replay support"
---

# Webhook Delivery SLA

OMNI Datastream guarantees 99.9% webhook delivery for all configured endpoints.

## Delivery Guarantee

| Metric | Target |
|---|---|
| **Delivery rate** | 99.9% |
| **First attempt latency** | < 5 seconds from event |
| **Retry window** | 72 hours |
| **Max retry attempts** | 8 (exponential backoff) |
| **Payload signing** | HMAC-SHA256 on every delivery |

## Retry Policy

Failed deliveries are retried with exponential backoff:

| Attempt | Delay |
|---|---|
| 1 | Immediate |
| 2 | 30 seconds |
| 3 | 2 minutes |
| 4 | 10 minutes |
| 5 | 1 hour |
| 6 | 4 hours |
| 7 | 12 hours |
| 8 | 24 hours |

After 8 failed attempts, the delivery is marked as `failed` and can be manually replayed.

## Signed Payloads

Every webhook delivery includes an `Omni-Signature` header with an HMAC-SHA256 signature. Verify the signature to ensure the payload is authentic:

```typescript
import { createHmac, timingSafeEqual } from "crypto"

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(payload).digest("hex")
  if (signature.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
```

## Event Types

| Event | Description | Trigger |
|---|---|---|
| `filing.published` | New SEC filing detected | RSS poller detects new filing |
| `enforcement.published` | New enforcement action | Daily enforcement sync |
| `monitor.match` | Saved search has new matches | Monitor evaluation cycle |
| `billing.budget.threshold` | Budget threshold crossed | 75%, 90%, 95%, 100% of spend cap |

## Delivery Audit

Every delivery attempt is logged and queryable:

```bash
# List recent deliveries
curl "https://api.secapi.ai/v1/webhook_endpoints/{id}/deliveries?limit=10" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"

# Replay a failed delivery
curl -X POST "https://api.secapi.ai/v1/webhook_endpoints/{id}/deliveries/{delivery_id}/replay" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

## Monitoring

Track webhook health via the observability endpoint:

```bash
curl "https://api.secapi.ai/v1/observability" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

Response includes delivery success rate, average latency, and recent failures.

## Secret Rotation

Rotate your webhook signing secret without downtime:

```bash
curl -X POST "https://api.secapi.ai/v1/webhook_endpoints/{id}/rotate_secret" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
```

The old secret remains valid for 24 hours after rotation.
