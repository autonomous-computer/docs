---
title: "Custom Skills"
description: "Create your own OMNI Datastream skills for domain-specific SEC workflows"
---

# Custom Skills

Build custom skills that combine OMNI Datastream endpoints into reusable workflows for your team.

## Skill Format

A skill is a Markdown file with frontmatter that describes the workflow:

```markdown
---
name: my-custom-skill
description: What this skill does and when to use it.
---

# My Custom Skill

## Endpoints Used
- GET /v1/filings?ticker={ticker}&form=10-K
- GET /v1/intelligence/company?ticker={ticker}

## Process
1. Resolve the entity
2. Fetch latest filings
3. Analyze with intelligence bundle

## Example
\`\`\`bash
curl "https://api.secapi.ai/v1/intelligence/company?ticker=AAPL" \
  -H "x-api-key: $OMNI_DATASTREAM_API_KEY"
\`\`\`
```

## Install Your Skill

Save as a `.md` file and install:

```bash
# Claude Code
cp my-skill.md .claude/skills/my-skill.md

# Or reference from a repo
claude skill install ./path/to/my-skill
```

## Skill Components

| Component | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier for the skill |
| `description` | Yes | When and how to use the skill |
| `Endpoints Used` | Recommended | List of API endpoints the skill calls |
| `Process` | Recommended | Step-by-step workflow |
| `Example` | Recommended | Working curl or SDK example |
| `Guidelines` | Optional | Edge cases and best practices |

## Built-in Skills

OMNI Datastream ships with 8 canonical skills:

| Skill | Use Case |
|---|---|
| `analyze-company-in-context` | Company briefing with intelligence bundles |
| `decompose-return-and-hedge` | Return attribution and hedge ideas |
| `investigate-filing-footnotes` | Footnote intelligence (lease, tax, revenue) |
| `make-portfolio-factor-neutral` | Portfolio neutralization workflows |
| `run-regime-aware-screen` | Regime-conditioned factor screening |
| `track-insiders-and-13fs` | Insider activity and ownership tracking |
| `use-live-factor-dashboard` | Live intraday factor monitoring |
| `write-country-regime-report` | Country macro reports |

## Sharing Skills

Skills are portable Markdown files. Share them via:
- Git repository (recommended)
- Direct file sharing
- npm package (for distribution)

## Automation

Combine skills with scheduling for automated workflows:

```bash
# Run a skill on a schedule (e.g., daily insider monitoring)
# In Claude Code:
claude run --skill track-insiders-and-13fs --ticker AAPL --schedule "0 9 * * 1-5"
```
