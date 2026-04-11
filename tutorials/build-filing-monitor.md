---
title: "Build a Filing Monitor with Webhooks"
description: "Set up real-time monitors for SEC filings and receive webhook notifications when new 8-K events are filed. Includes curl, Python, and JavaScript examples."
---

# Build a Filing Monitor with Webhooks

Stop polling for new filings. Instead, register a webhook endpoint and create a monitor rule so the API pushes events to you the moment a filing hits EDGAR.

## Prerequisites

- An Omni Datastream API key (set as `OMNI_DATASTREAM_API_KEY`)
- A publicly accessible HTTPS endpoint to receive webhooks (use [webhook.site](https://webhook.site) for testing)
- (Optional) Python 3.8+ or Node.js 18+ for SDK examples

## Step 1 — Register a webhook endpoint

Tell the API where to send events by creating a webhook endpoint with `/v1/webhook_endpoints`.

### curl

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-server.com/webhooks/filings",
    "description": "Filing monitor webhook",
    "events": ["filing.new"]
  }' \
  "https://api.secapi.ai/v1/webhook_endpoints"
```

### Python

```python
from omni_datastream_py import OmniDatastreamClient

client = OmniDatastreamClient(api_key="your-api-key")

endpoint = client.webhook_endpoints.create(
    url="https://your-server.com/webhooks/filings",
    description="Filing monitor webhook",
    events=["filing.new"],
)

print(f"Endpoint ID: {endpoint.id}")
print(f"Signing secret: {endpoint.signing_secret}")
```

### JavaScript

```ts
import { OmniDatastreamClient } from "@omni-datastream/sdk-js";

const client = new OmniDatastreamClient({
  apiKey: process.env.OMNI_DATASTREAM_API_KEY!,
});

const endpoint = await client.webhookEndpoints.create({
  url: "https://your-server.com/webhooks/filings",
  description: "Filing monitor webhook",
  events: ["filing.new"],
});

console.log(`Endpoint ID: ${endpoint.id}`);
console.log(`Signing secret: ${endpoint.signingSecret}`);
```

### Expected output

```json
{
  "id": "we_abc123",
  "url": "https://your-server.com/webhooks/filings",
  "signing_secret": "whsec_...",
  "events": ["filing.new"],
  "status": "active"
}
```

Save the `signing_secret` securely. You will use it to verify incoming webhook payloads.

## Step 2 — Create a filing monitor

A monitor defines what filings trigger a webhook delivery. Use `/v1/monitors` to watch for specific form types and companies.

### curl

```bash
curl -X POST \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "FAANG 8-K Monitor",
    "form_types": ["8-K", "8-K/A"],
    "tickers": ["AAPL", "AMZN", "GOOG", "META", "NFLX"],
    "webhook_endpoint_id": "we_abc123"
  }' \
  "https://api.secapi.ai/v1/monitors"
```

### Python

```python
monitor = client.monitors.create(
    name="FAANG 8-K Monitor",
    form_types=["8-K", "8-K/A"],
    tickers=["AAPL", "AMZN", "GOOG", "META", "NFLX"],
    webhook_endpoint_id=endpoint.id,
)

print(f"Monitor ID: {monitor.id}")
print(f"Status: {monitor.status}")
```

### JavaScript

```ts
const monitor = await client.monitors.create({
  name: "FAANG 8-K Monitor",
  formTypes: ["8-K", "8-K/A"],
  tickers: ["AAPL", "AMZN", "GOOG", "META", "NFLX"],
  webhookEndpointId: endpoint.id,
});

console.log(`Monitor ID: ${monitor.id}`);
console.log(`Status: ${monitor.status}`);
```

### Expected output

```json
{
  "id": "mon_xyz789",
  "name": "FAANG 8-K Monitor",
  "form_types": ["8-K", "8-K/A"],
  "tickers": ["AAPL", "AMZN", "GOOG", "META", "NFLX"],
  "webhook_endpoint_id": "we_abc123",
  "status": "active"
}
```

## Step 3 — Handle incoming webhooks

When a matching filing is published, the API sends a POST request to your webhook URL. Here is what the payload looks like and how to verify it.

### Webhook payload

```json
{
  "event": "filing.new",
  "timestamp": "2024-12-15T14:30:00Z",
  "data": {
    "accession_number": "0000320193-24-000095",
    "form": "8-K",
    "ticker": "AAPL",
    "company_name": "Apple Inc",
    "filed_at": "2024-12-15",
    "items": ["2.02", "9.01"],
    "description": "Results of Operations and Financial Condition"
  }
}
```

### Python handler (Flask)

```python
import hmac
import hashlib
from flask import Flask, request, jsonify

app = Flask(__name__)
SIGNING_SECRET = "whsec_..."

@app.route("/webhooks/filings", methods=["POST"])
def handle_webhook():
    # Verify signature
    signature = request.headers.get("X-Webhook-Signature")
    expected = hmac.new(
        SIGNING_SECRET.encode(),
        request.data,
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(signature, expected):
        return jsonify({"error": "Invalid signature"}), 401

    payload = request.json
    print(f"New {payload['data']['form']} from {payload['data']['ticker']}")
    print(f"Items: {payload['data']['items']}")

    return jsonify({"received": True}), 200
```

### JavaScript handler (Express)

```ts
import express from "express";
import crypto from "crypto";

const app = express();
const SIGNING_SECRET = "whsec_...";

app.post("/webhooks/filings", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.headers["x-webhook-signature"] as string;
  const expected = crypto
    .createHmac("sha256", SIGNING_SECRET)
    .update(req.body)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const payload = JSON.parse(req.body.toString());
  console.log(`New ${payload.data.form} from ${payload.data.ticker}`);
  console.log(`Items: ${payload.data.items}`);

  res.json({ received: true });
});

app.listen(3000);
```

## Step 4 — List and manage monitors

### curl

```bash
# List all active monitors
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/monitors"

# Pause a monitor
curl -X PATCH \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}' \
  "https://api.secapi.ai/v1/monitors/mon_xyz789"

# Delete a monitor
curl -X DELETE \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/monitors/mon_xyz789"
```

## Next steps

- **Monitor more form types**: Add `10-K`, `10-Q`, `13F-HR`, or any other form type to your monitors.
- **Route by event type**: Create different webhook endpoints for different teams (e.g., compliance gets enforcement actions, research gets earnings filings).
- **Audit delivery**: Use the [Webhook Delivery Audit](/webhook-delivery-audit) page to inspect delivery logs and retry failures.

See the [Webhook Stream Workflows](/webhook-stream-workflows) guide for advanced patterns.
