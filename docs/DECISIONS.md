# MR Flow — Decision Log

## D-001 External-first baseline
**Decision:** Develop the synthetic prototype and product principles outside the company environment, then integrate inside the Dev VM.

**Why:** Company AI tokens are limited; product discovery and deterministic logic can be tested without private MR data.

**Trade-off:** Real GitLab API details and organizational policies remain unverified.

## D-002 Local-first and read-only
**Decision:** Prefer a local CLI and static HTML report before services, database, browser extension, or notifications.

**Why:** Reduce security, setup, maintenance, and operational cost.

**Trade-off:** No multiuser live sync or proactive notifications in the baseline.

## D-003 Rules before LLM
**Decision:** Derive first-pass actions with deterministic TypeScript functions and explicit evidence.

**Why:** Predictable behavior, cheap testing, easy auditability.

**Trade-off:** Cannot infer nuanced human intent or comment severity.

## D-004 Use glab first
**Decision:** Validate company GitLab using installed `glab` as an initial adapter, not a webhook listener.

**Why:** No incoming network dependency and no additional authentication stack.

**Trade-off:** Exact CLI/version/API behavior and rate limits need internal validation.

## D-005 Do not infer approval policy
**Decision:** Unknown required reviewer rules remain unknown even if GitLab reports approval.

**Why:** CE approvals may be advisory; preventing false readiness is more important than convenience.

## Open decisions
- How to distinguish required reviewers from consulted reviewers.
- Whether reviewers explicitly accept work, start GitLab reviews, or rely on assignment.
- How to represent on-hold reasons and dates with the least duplicated state.
- What constitutes a blocking comment, and who can decide.
- Which events and time windows deserve reminders.
- When an LLM recommendation materially outperforms deterministic rules.

Revisit decisions based on observed use and smallest reproducible counterexamples.
