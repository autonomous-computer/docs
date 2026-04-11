---
title: "Analyze Insider Trading Patterns"
description: "Track insider buys and sells using SEC Form 4 data from the Datastream API. Identify patterns in executive transactions. Includes curl, Python, and JavaScript examples."
---

# Analyze Insider Trading Patterns

Corporate insiders (officers, directors, and 10% shareholders) must report their trades within two business days on SEC Form 4. This tutorial shows how to retrieve insider transaction data, filter by transaction type, and identify patterns.

## Prerequisites

- An Omni Datastream API key (set as `OMNI_DATASTREAM_API_KEY`)
- Basic familiarity with REST APIs
- (Optional) Python 3.8+ or Node.js 18+ for SDK examples

## Step 1 — Get insider transactions for a company

Use `/v1/insiders` to retrieve recent insider transactions for a given ticker.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/insiders?ticker=AAPL&limit=10"
```

### Python

```python
from omni_datastream_py import OmniDatastreamClient

client = OmniDatastreamClient(api_key="your-api-key")

transactions = client.insiders.list(ticker="AAPL", limit=10)

for txn in transactions.data:
    direction = "BUY" if txn.transaction_type == "purchase" else "SELL"
    print(f"{txn.transaction_date} | {txn.insider_name} ({txn.insider_title})")
    print(f"  {direction}: {txn.shares:,} shares @ ${txn.price:.2f} = ${txn.value:,.0f}")
    print()
```

### JavaScript

```ts
import { OmniDatastreamClient } from "@omni-datastream/sdk-js";

const client = new OmniDatastreamClient({
  apiKey: process.env.OMNI_DATASTREAM_API_KEY!,
});

const transactions = await client.insiders.list({
  ticker: "AAPL",
  limit: 10,
});

for (const txn of transactions.data) {
  const direction = txn.transactionType === "purchase" ? "BUY" : "SELL";
  console.log(`${txn.transactionDate} | ${txn.insiderName} (${txn.insiderTitle})`);
  console.log(
    `  ${direction}: ${txn.shares.toLocaleString()} shares @ $${txn.price.toFixed(2)} = $${txn.value.toLocaleString()}`
  );
  console.log();
}
```

### Expected output

```
2024-12-10 | Tim Cook (Chief Executive Officer)
  SELL: 200,000 shares @ $248.50 = $49,700,000

2024-12-05 | Jeff Williams (Chief Operating Officer)
  SELL: 100,000 shares @ $243.20 = $24,320,000

2024-11-20 | Deirdre O'Brien (SVP, Retail + People)
  SELL: 50,000 shares @ $231.45 = $11,572,500
```

## Step 2 — Filter for insider purchases

Insider purchases are often considered more meaningful than sales (insiders sell for many reasons, but they buy for only one). Filter by transaction type.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/insiders?ticker=JPM&transaction_type=purchase&limit=10"
```

### Python

```python
buys = client.insiders.list(
    ticker="JPM",
    transaction_type="purchase",
    limit=10,
)

total_value = sum(txn.value for txn in buys.data)
print(f"Recent insider purchases at JPM: {len(buys.data)} transactions")
print(f"Total value: ${total_value:,.0f}")
print()

for txn in buys.data:
    print(f"  {txn.transaction_date} | {txn.insider_name}: {txn.shares:,} shares (${txn.value:,.0f})")
```

### JavaScript

```ts
const buys = await client.insiders.list({
  ticker: "JPM",
  transactionType: "purchase",
  limit: 10,
});

const totalValue = buys.data.reduce((sum, txn) => sum + txn.value, 0);
console.log(`Recent insider purchases at JPM: ${buys.data.length} transactions`);
console.log(`Total value: $${totalValue.toLocaleString()}`);
console.log();

for (const txn of buys.data) {
  console.log(
    `  ${txn.transactionDate} | ${txn.insiderName}: ${txn.shares.toLocaleString()} shares ($${txn.value.toLocaleString()})`
  );
}
```

## Step 3 — Scan for cluster buying across a sector

When multiple insiders at different companies in the same sector start buying, it can signal sector-wide conviction. Scan a list of tickers for recent insider purchases.

### Python

```python
BANK_TICKERS = ["JPM", "BAC", "WFC", "C", "GS", "MS"]

print("Sector Insider Buy Scan - Major Banks")
print("=" * 60)

for ticker in BANK_TICKERS:
    buys = client.insiders.list(
        ticker=ticker,
        transaction_type="purchase",
        date_from="2024-10-01",
        limit=5,
    )

    if buys.data:
        total = sum(t.value for t in buys.data)
        print(f"\n{ticker}: {len(buys.data)} insider buys (${total:,.0f} total)")
        for txn in buys.data:
            print(f"  {txn.transaction_date} {txn.insider_name}: ${txn.value:,.0f}")
    else:
        print(f"\n{ticker}: No insider purchases since 2024-10-01")
```

### Expected output

```
Sector Insider Buy Scan - Major Banks
============================================================

JPM: 3 insider buys ($4,250,000 total)
  2024-12-01 Jamie Dimon: $3,000,000
  2024-11-15 Mary Erdoes: $750,000
  2024-10-20 Daniel Pinto: $500,000

BAC: 1 insider buys ($250,000 total)
  2024-11-10 Brian Moynihan: $250,000

WFC: No insider purchases since 2024-10-01

C: 2 insider buys ($1,100,000 total)
  2024-12-05 Jane Fraser: $800,000
  2024-10-30 Mark Mason: $300,000
```

## Step 4 — Track an individual insider over time

Focus on a single insider to understand their trading history.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/insiders?ticker=JPM&insider_name=Jamie+Dimon&limit=20"
```

### Python

```python
history = client.insiders.list(
    ticker="JPM",
    insider_name="Jamie Dimon",
    limit=20,
)

buys = [t for t in history.data if t.transaction_type == "purchase"]
sells = [t for t in history.data if t.transaction_type == "sale"]

print(f"Jamie Dimon - JPM Trading History")
print(f"  Purchases: {len(buys)} ({sum(t.shares for t in buys):,} shares)")
print(f"  Sales:     {len(sells)} ({sum(t.shares for t in sells):,} shares)")
```

## Next steps

- **Combine with 13F data**: Cross-reference insider trades with [institutional holdings changes](/tutorials/monitor-13f-holdings) for a complete ownership picture.
- **Set up alerts**: Use the [Filing Monitor tutorial](/tutorials/build-filing-monitor) to get notified when new Form 4 filings are published.
- **Build scoring models**: Weight insider purchases by position (CEO buys often carry more signal than director buys) and transaction size relative to holdings.

See the [API Reference](/api-reference/insiders) for the full insider transactions endpoint specification.
