---
title: "Compare Executive Compensation"
description: "Compare executive compensation across companies using the Datastream API. Pull salary, bonus, stock awards, and total comp data. Includes curl, Python, and JavaScript examples."
---

# Compare Executive Compensation

Proxy statements (DEF 14A) contain detailed executive compensation tables. This tutorial shows how to retrieve structured compensation data and compare it across companies without manually reading proxy filings.

## Prerequisites

- An Omni Datastream API key (set as `OMNI_DATASTREAM_API_KEY`)
- Basic familiarity with REST APIs
- (Optional) Python 3.8+ or Node.js 18+ for SDK examples

## Step 1 — Retrieve compensation for a single company

Use `/v1/compensation` to get the latest executive compensation data for a company.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/compensation?ticker=AAPL"
```

### Python

```python
from omni_datastream_py import OmniDatastreamClient

client = OmniDatastreamClient(api_key="your-api-key")

comp = client.compensation.get(ticker="AAPL")

for exec in comp.data:
    print(f"{exec.name} ({exec.title})")
    print(f"  Salary:       ${exec.salary:>14,.0f}")
    print(f"  Bonus:        ${exec.bonus:>14,.0f}")
    print(f"  Stock Awards: ${exec.stock_awards:>14,.0f}")
    print(f"  Total:        ${exec.total:>14,.0f}")
    print()
```

### JavaScript

```ts
import { OmniDatastreamClient } from "@omni-datastream/sdk-js";

const client = new OmniDatastreamClient({
  apiKey: process.env.OMNI_DATASTREAM_API_KEY!,
});

const comp = await client.compensation.get({ ticker: "AAPL" });

for (const exec of comp.data) {
  console.log(`${exec.name} (${exec.title})`);
  console.log(`  Salary:       $${exec.salary.toLocaleString()}`);
  console.log(`  Bonus:        $${exec.bonus.toLocaleString()}`);
  console.log(`  Stock Awards: $${exec.stockAwards.toLocaleString()}`);
  console.log(`  Total:        $${exec.total.toLocaleString()}`);
  console.log();
}
```

### Expected output

```
Tim Cook (Chief Executive Officer)
  Salary:       $    3,000,000
  Bonus:        $            0
  Stock Awards: $   40,000,000
  Total:        $   63,209,000

Luca Maestri (SVP, Chief Financial Officer)
  Salary:       $    1,000,000
  Bonus:        $            0
  Stock Awards: $   20,000,000
  Total:        $   26,900,000
```

## Step 2 — Compare compensation across companies

The `/v1/compensation/compare` endpoint lets you compare CEO or C-suite compensation side by side.

### curl

```bash
curl -H "x-api-key: $OMNI_DATASTREAM_API_KEY" \
  "https://api.secapi.ai/v1/compensation/compare?tickers=AAPL,MSFT,GOOG,AMZN&role=ceo"
```

### Python

```python
comparison = client.compensation.compare(
    tickers=["AAPL", "MSFT", "GOOG", "AMZN"],
    role="ceo",
)

print(f"{'Company':<12} {'CEO':<25} {'Total Comp':>15}")
print("-" * 55)

for entry in comparison.data:
    print(f"{entry.ticker:<12} {entry.name:<25} ${entry.total:>14,.0f}")
```

### JavaScript

```ts
const comparison = await client.compensation.compare({
  tickers: ["AAPL", "MSFT", "GOOG", "AMZN"],
  role: "ceo",
});

console.log("Company      CEO                       Total Comp");
console.log("-".repeat(55));

for (const entry of comparison.data) {
  console.log(
    `${entry.ticker.padEnd(12)} ${entry.name.padEnd(25)} $${entry.total.toLocaleString().padStart(14)}`
  );
}
```

### Expected output

```
Company      CEO                       Total Comp
-------------------------------------------------------
AAPL         Tim Cook                  $   63,209,000
MSFT         Satya Nadella             $   48,500,000
GOOG         Sundar Pichai             $  226,000,000
AMZN         Andy Jassy                $   29,200,000
```

## Step 3 — Analyze compensation composition

Break down the mix of salary, equity, and performance-based pay to understand how compensation is structured.

### Python

```python
comp = client.compensation.get(ticker="MSFT")

for exec in comp.data[:3]:  # top 3 executives
    total = exec.total or 1
    salary_pct = (exec.salary / total) * 100
    equity_pct = (exec.stock_awards / total) * 100
    other_pct = 100 - salary_pct - equity_pct

    print(f"{exec.name} ({exec.title})")
    print(f"  Total: ${exec.total:,.0f}")
    print(f"  Salary:  {salary_pct:5.1f}%  |  Equity: {equity_pct:5.1f}%  |  Other: {other_pct:5.1f}%")
    print()
```

### Expected output

```
Satya Nadella (Chairman and Chief Executive Officer)
  Total: $48,500,000
  Salary:    5.2%  |  Equity:  82.5%  |  Other:  12.3%

Amy Hood (EVP, Chief Financial Officer)
  Total: $25,300,000
  Salary:    3.9%  |  Equity:  79.1%  |  Other:  17.0%

Bradford Smith (Vice Chair and President)
  Total: $22,100,000
  Salary:    4.5%  |  Equity:  77.3%  |  Other:  18.2%
```

## Next steps

- **Track compensation trends**: Pull historical data to see how executive pay has changed year over year.
- **Screen by pay ratio**: Combine compensation data with employee count from 10-K filings to calculate CEO-to-median-worker pay ratios.
- **Build peer benchmarks**: Group companies by sector and market cap to create meaningful compensation benchmarks.

See the [Compensation Workflows](/compensation-workflows) guide for additional patterns.
