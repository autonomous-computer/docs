## Summary

<!-- What changed and why. One paragraph max. Link issues with "Closes #". -->

Closes #

## Scope

<!-- Check ALL areas this PR touches. Reviewers and CI use this to gauge blast radius. -->

- [ ] `docs.json` — Mintlify navigation, theme, redirects, API config, SEO, footer
- [ ] `openapi/` — public OpenAPI source used by the API reference and playground
- [ ] `api-reference/` — generated or hand-edited API reference pages
- [ ] `tutorials/` — step-by-step implementation guides
- [ ] `use-cases/` — customer workflow and industry pages
- [ ] `clients/` / SDK pages — SDK, CLI, MCP, and client setup docs
- [ ] `llms.txt` / LLM guide — agent-facing docs entrypoints
- [ ] `.github/` — repository workflows, templates, or automation
- [ ] Other docs pages

## Changes

<!-- Bullet points grouped by area. Be specific — diffs are for code, this is for intent. -->

-
-

## Verification

<!-- What you ran locally. Paste actual commands and their outcomes. -->

```bash
# Paste exact commands and outcomes here.
```

<details>
<summary>Additional verification (expand if applicable)</summary>

```bash
# Examples:
npx mintlify broken-links
npx mintlify dev
rg -n "<legacy brand regex>" .
```

</details>

## Deployment Impact

<!-- Skip this section entirely for code-only changes with no infra impact. -->

- [ ] Mintlify deploy expected
- [ ] Navigation/sidebar changes
- [ ] OpenAPI/API playground changes
- [ ] Redirects or removed pages
- [ ] SEO metadata, sitemap, or canonical URL changes

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
