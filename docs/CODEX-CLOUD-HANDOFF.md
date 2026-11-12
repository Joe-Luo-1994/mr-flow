# Codex Cloud handoff — MR Flow v0.1

## What is already done
This is a synthetic-data-only prototype, prepared outside the company. It includes:

- A pure TypeScript triage engine: `src/triage.ts`.
- Synthetic scenarios: `fixtures/mrs.json` and `tests/triage.test.mjs`.
- CLI and offline HTML reporting: `tools/demo.mjs`, `tools/report.mjs`.
- Product principles, state semantics, draft workflow agreement, and a decision log.

The previous conversation established three product values:
1. **Visibility** — identify what we know and what is unknown about each MR.
2. **Coordination** — explain the next actionable step, likely owner, and evidence without blaming people.
3. **Decision Quality** — eventually learn from repeated review/rework and improve change safety.

## Environment separation

**Codex Cloud (this repository):** research, refine product hypotheses, test deterministic models, develop synthetic scenario coverage and UI prototypes. No company network or real GitLab data.

**Company Dev VM (future):** approved `glab` CLI; validate GitLab CE version/API responses; implement a read-only adapter to `MRObservation`; compare with 5–10 real MRs. Keep raw responses and internal data inside the company. See `docs/INTERNAL-VALIDATION.md` and `docs/AGENT-HANDOFF.md`.

Do not attempt to connect Codex Cloud to company GitLab or move internal metadata into public/private cloud repositories without explicit organizational approval.

## Current known decisions
- `glab` is the preferred *future internal* transport, subject to installed-version verification.
- GitLab remains the source of truth; no duplicate manual status system.
- Policy and observations are distinct; CE's `approved` does not mean the team's multi-approver policy is satisfied.
- No SLO inferred from a generic `updated_at` timestamp.
- No AI or automatic reminders until deterministic correctness is validated.

## First cloud experiment (recommended)

Goal: make the existing output more **actionable** without increasing architecture complexity.

1. Inspect the current model, fixtures, and generated report. Run existing tests and report actual results.
2. Identify at most **three** concrete ways the model/report might mislead reviewers or authors. Each needs a synthetic counterexample.
3. Propose **one** small experiment with acceptance criteria and a low-complexity alternative.
4. Wait for the user's decision before broad changes; an approved small change should include tests, updated generated report, and a short findings summary.

Candidate themes: clearer next-actor uncertainty, review-vs-author waiting, approval policy visibility, triage prioritization, actionable dashboard UX. Do **not** build integrations, polling, or AI workflows in this experiment.

## Acceptance criteria
- Pure tests remain deterministic and require no company data.
- Evidence and uncertainty appear in both the underlying result and the UI.
- No feature depends on a real company token, hostname, MR, or permission.
- Any new rule names its underlying assumptions and a counterexample.
- Changes reduce ambiguity or coordination effort; cosmetic growth alone is not success.

## Open decisions
- What is the actual team approval policy (different for critical modules)?
- What constitutes an explicit hold or release dependency?
- Who owns merge after approval and how should that be communicated?
- Which GitLab CE review-progress fields exist in the deployed version?
- Which local reminder surface is approved and actually useful?

These questions should not block synthetic cloud research. Do not invent their answers.

## Suggested first message to Codex

> Read `AGENTS.md`, `PRODUCT.md`, `README.md`, `docs/STATE-MODEL.md`, `docs/DECISIONS.md`, and `docs/CODEX-CLOUD-HANDOFF.md`. Run the existing synthetic tests and inspect the current report. Our next goal is to improve Visibility and Coordination with the smallest possible experiment, without real GitLab access. Identify up to three important gaps, cite concrete code/fixture evidence, propose one prioritized experiment and acceptance criteria, and stop before implementation so we can agree on scope. Do not add infrastructure or AI integrations.