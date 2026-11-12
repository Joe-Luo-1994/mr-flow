# Internal agent handoff — intentionally small

You are integrating an externally prepared **MR Flow** starter into our approved company Dev VM. Token budget is limited. Avoid re-deriving product vision or proposing a large architecture.

## Context

- GitLab CE is self-managed; `glab` is approved. Most REST API endpoints are expected to work but must be verified.
- No inbound webhook, additional service, external AI call, or new database is assumed.
- Repository contains `PRODUCT.md`, `src/triage.ts`, synthetic `fixtures/`, runnable tests, and a static HTML report.
- All actual GitLab data and secrets must stay inside approved company infrastructure.

## Required workflow

1. Read `README.md`, `PRODUCT.md`, `docs/STATE-MODEL.md`, and `docs/INTERNAL-VALIDATION.md`.
2. Run existing synthetic tests; do not rewrite the pure rule engine prematurely.
3. Validate only the API fields needed by `MRObservation` with read-only `glab` commands.
4. Report a compact compatibility matrix: field / available / endpoint / mapping caveat.
5. Implement only a read-only `glab` adapter with explicit mapping and failure handling; unknown/missing fields must remain unknown.
6. Use 5–10 representative internal MRs to evaluate next-action usefulness against GitLab UI, without exporting raw data.
7. Report mismatches and minimal fixes, then ask for **only** decisions that materially change policy, security, or behavior.

## Constraints

- No GitLab writes; do not approve, assign reviewers, comment, or merge.
- No AI inference of review owner, release decisions, or individual performance.
- No persistent service, scheduler, new UI framework, or notification integration in this iteration.
- No raw logs containing credentials, company source, or entire discussion bodies.
- Distinguish API 403, 404, missing fields, and legitimate empty data.
- If the approval policy is not established, mark it `unknown` rather than assuming 1 approval is sufficient.

## Response format (keep under ~600 words before coding)

- **Confirmed:** environment / API capabilities relevant to the MVP.
- **Missing / ambiguous:** fields and semantics requiring decisions.
- **Plan:** minimal adapter tasks and test cases.
- **Stop/go:** whether we have enough signal to justify a local dashboard.

Do not expand scope without an explicit value hypothesis and a smaller alternative.