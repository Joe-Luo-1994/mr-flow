# MR Flow — external-first starter

A **small, read-only MR coordination prototype** designed to be prepared outside a restricted company environment, then integrated inside it. This package uses **synthetic MR data only** and makes **no network calls**.

## What this package proves

- GitLab-specific data can be normalized into a vendor-independent observation contract.
- A pure deterministic function can derive *next-action suggestions* with evidence and explicit uncertainty.
- A local HTML dashboard can display those suggestions without a server, framework, database, or AI API.
- Core behavior can be validated using synthetic fixtures before connecting to an internal GitLab instance.

## Quick start

Prerequisites: Node.js 22+ and TypeScript compiler. The only declared development dependency is TypeScript; if your environment already has `tsc` available, no installation is needed.

```bash
npm run test
npm run demo
npm run report
# Open output/mr-flow.html in a local browser
# Inside an approved environment, after producing an MRObservation[] JSON file:
node tools/report.mjs internal/normalized.json output/internal-report.html
```

The archive includes precompiled `dist/`, so a machine with Node.js 22+ can also run `node --test tests/*.test.mjs`, `node tools/demo.mjs`, and `node tools/report.mjs` **without** installing TypeScript.

To install TypeScript on a permitted external machine: `npm install` (do not assume external package registries are available from the company network). Compile outside and carry the files if company policy permits; preserve the source and tests for auditing.

## Structure

```text
PRODUCT.md                  Product principles and non-goals
AGENTS.md                   Durable Codex instructions
src/triage.ts               Pure deterministic rules and typed observation contract
tests/triage.test.mjs        Synthetic behavior tests
fixtures/mrs.json           Artificial MR scenarios only
tools/demo.mjs              CLI output
tools/report.mjs            Offline static HTML generation
docs/STATE-MODEL.md         Semantics, uncertainty, important pitfalls
docs/INTERNAL-VALIDATION.md Minimal glab validation checklist
docs/AGENT-HANDOFF.md       Short, tightly scoped company-agent prompt
docs/CODEX-CLOUD-HANDOFF.md Scope and kickoff for cloud Codex work
docs/DECISIONS.md           Decisions / assumptions / unknowns
docs/WORKING-AGREEMENT.md Draft human collaboration agreement
```

## Continue in Codex Cloud

For cloud research, import this repository into a **Codex Cloud environment** using a GitHub repository. Codex reads the root `AGENTS.md` as durable guidance; begin with `docs/CODEX-CLOUD-HANDOFF.md`. Keep this cloud repository synthetic-only. **Do not** connect it to the company GitLab or upload internal MR data.

## What this package deliberately does NOT do

- Connect to GitLab or request authentication.
- Call any AI API or export internal data.
- Automatically assign/approve/merge MRs.
- Determine SLO breaches using only `updated_at`.
- Infer a review policy from an arbitrary list of assigned reviewers.
- Claim that all satisfied observables mean a merge is safe.

## Internal integration sequence (recommended)

1. Validate glab availability and API fields using **read-only** commands in `docs/INTERNAL-VALIDATION.md`.
2. Write a tiny adapter that maps supported GitLab responses into `MRObservation`.
3. Add locally created/sanitized fixtures from the observed shapes **inside the company's permitted environment**; never transfer real MR data out without approval.
4. Run existing tests unchanged, then add tests only for confirmed GitLab-specific behavior.
5. Make the static report useful before adding polling, reminders, or AI reasoning.

**Stop condition:** if a required field is unavailable or ambiguous, use `unknown`/`null` rather than inventing certainty. The tool should still show observable facts.