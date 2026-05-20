## Summary

<!-- What changed and why. One paragraph max. Link issues with "Closes #". -->

Closes #

## Monorepo Scope

<!-- Check ALL areas this PR touches. Reviewers and CI use this to gauge blast radius. -->

- [ ] `apps/omni-web/` — Vite + TanStack Router web app
- [ ] `apps/omni-desktop/` — Electron desktop app
- [ ] `services/agent-backend/` — Agent WebSocket backend
- [ ] `services/omni-api/` — Python REST API
- [ ] `pipelines/merlin-etl/` — Dagster ETL pipelines
- [ ] `pipelines/tws-api/` — IBKR TWS integration
- [ ] `packages/*` — Shared libraries
- [ ] `sdk/*` — Public SDK packages
- [ ] `vendor/` — Upstream dependencies
- [ ] `infra/` — Infrastructure configs
- [ ] `.github/` — CI/CD workflows
- [ ] `docs/` — Documentation

## Changes

<!-- Bullet points grouped by area. Be specific — diffs are for code, this is for intent. -->

-
-

## Verification

<!-- What you ran locally. Paste actual commands and their outcomes. -->

```bash
bun run typecheck   # ✅ / ❌
bun run lint        # ✅ / ❌
bun run build       # ✅ / ❌
bun run test        # ✅ / ❌
```

<details>
<summary>Additional verification (expand if applicable)</summary>

```bash
# Python (pipelines/services)
uv run ruff check merlin_etl --statistics
uv run pytest merlin_etl_tests -v
uv run mypy merlin_etl

# Desktop
bun run dev:desktop

# Agent backend
bun run dev:backend
```

</details>

## Deployment Impact

<!-- Skip this section entirely for code-only changes with no infra impact. -->

- [ ] Environment variables added/changed → listed in `docs/agents-reference/09-env-vars.md`
- [ ] Database migration required
- [ ] Feature flag added/changed → registered in `apps/omni-web/lib/feature-flags/registry.ts`
- [ ] Worker/service redeployment needed
- [ ] Secrets to configure (AWS SM / CF / GH Actions)

## Completion Attestation

<!-- You MUST select one. This is a binding statement of delivery status. -->

- [ ] **100% complete, 100% functional.** All code is written, tested, deployed (if applicable), and working end-to-end. No outstanding work remains.
- [ ] **Not fully complete or functional.** Deltas listed below.

### Deltas (only if attesting incomplete)

<!-- Short bullets. Do NOT repeat TODOs from the codebase — only items that are
     intentionally deferred from this PR's stated scope. -->

-

## Screenshots / Demo

<!-- For UI changes. Delete section if not applicable. -->

---

<details>
<summary>Agent Context</summary>

<!-- This section is for AI coding agents that may continue or review this work.
     Fill in what's relevant; delete what isn't. -->

**Key files to read first:**
<!-- List the 3-5 most important files for understanding this PR's changes. -->
-

**Decisions made:**
<!-- Non-obvious choices and why. Agents should not re-litigate these. -->
-

**Relevant docs:**
<!-- Reference by number — agents have these in context via AGENTS.md index. -->
<!-- Example: 09-env-vars.md, 17-ci-cd.md, 13-eslint.md -->
-

**Monorepo conventions applied:**
<!-- Which row(s) from AGENTS.md [Monorepo Path Routing] table governed this work? -->
-

</details>
