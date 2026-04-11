---
title: "MCP Server Installation"
description: "Connect OMNI Datastream to Claude Desktop, Claude Code, Cursor, and other MCP clients"
---

# MCP Server Installation

OMNI Datastream provides a hosted MCP server for AI agents. Connect once, get access to 155+ SEC data tools.

## Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "omni-datastream": {
      "url": "https://api.secapi.ai/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}
```

On macOS, the config is at `~/Library/Application Support/Claude/claude_desktop_config.json`.

## Claude Code

```bash
claude mcp add omni-datastream https://api.secapi.ai/mcp \
  --header "x-api-key: YOUR_API_KEY"
```

## Cursor

Add to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "omni-datastream": {
      "url": "https://api.secapi.ai/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}
```

## Get Your API Key

1. Sign up at [secapi.ai](https://secapi.ai) (free — 250 calls/month)
2. Your API key is auto-generated on first login
3. Set it as `OMNI_DATASTREAM_API_KEY` in your environment

## Available Tools

Once connected, your agent has access to:

| Tool | Description |
|---|---|
| `entities.resolve` | Resolve company by ticker, CIK, FIGI, ISIN, CUSIP |
| `filings.search` | Search SEC filings with 20+ filters |
| `filings.latest` | Get latest filing for a company |
| `sections.search` | Search filing sections (full-text + semantic) |
| `statements.get` | Get financial statements (income, balance, cash flow) |
| `facts.get` | Get XBRL facts by concept |
| `owners.13f` | Get institutional holdings |
| `insiders.list` | List insider trades |
| `compensation.get` | Get executive compensation |
| `enforcement.list` | Search enforcement actions |
| `intelligence.company` | One-call company briefing |
| `intelligence.security` | One-call security analysis |

## Verify Connection

Ask your agent:

> "Use OMNI Datastream to look up Apple's latest 10-K filing"

The agent should call `filings.latest` with `ticker: AAPL, form: 10-K`.

## Agent Bootstrap (Ephemeral Credentials)

For automated agent workflows, use sponsor tokens for short-lived credentials:

```bash
# Create a bootstrap token (valid for 1 hour)
curl -X POST https://api.secapi.ai/v1/agent/bootstrap_tokens \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ttlSeconds": 3600}'

# Agent uses the token to get ephemeral credentials
curl -X POST https://api.secapi.ai/v1/agent/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"token": "BOOTSTRAP_TOKEN"}'
```
