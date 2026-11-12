# MR Flow: Product contract (v0.1)

## Problem

An increasing number of merge requests creates invisible waiting, duplicated reviews, unclear ownership, and stalled post-review decisions. In a free/self-managed GitLab instance, the UI and approval rules may not encode a team's actual review policy.

## Outcomes (in priority order)

1. **Visibility:** What is the observable state of each open MR? Which facts are missing?
2. **Coordination:** Who can act next, and why? Reduce human time spent searching, asking, and reminding.
3. **Decision Quality:** Learn from repeated discussion/rework and improve change safety *later*, after observable workflow data exists.

## Non-negotiable product principles

1. **GitLab remains the source of truth.** Never invent a separate manually-maintained MR workflow.
2. **Facts ≠ inferences ≠ decisions.** Preserve source facts; label derived conclusions; human operators decide.
3. **Unknown means unknown.** Missing data must not be silently mapped to zero, success, or inactivity.
4. **Actions over counters.** A useful screen answers who could act next and what evidence supports it.
5. **No automatic blame.** Open threads are not proof the author is blocking; inactivity is not negligence.
6. **Deterministic first, agent second.** Rules handle observable facts; LLMs later help explain ambiguity, with citations and review.
7. **Lightweight by default.** No background service, database, React app, LLM framework, or webhooks for the first vertical slice.
8. **Local-first, read-only, least privilege.** Keep company code, tokens, names, comments, and API payloads inside approved infrastructure.
9. **Policy is explicit.** `approved: true` does not mean the team's two-reviewer requirement is met in Community Edition.
10. **Every analysis has a code version.** Carry MR head SHA; reconsider conclusions after a push.

## Definition of Done for first vertical slice

- Given synthetic observations, derive a human-readable action, optional next actor(s), and a verifiable evidence trail.
- Distinguish no reviewer, incomplete approval, open discussion, failing/running checks, paused/draft, ambiguous information, and merge candidate.
- Static report is accessible offline and does not depend on external services.
- Tests pass; no secret, employee, company URL, or genuine source-code content is bundled.
- Future extension points are documented, not pre-implemented.

## Non-goals

- No workflow automation or GitLab writes.
- No authoritative "safe to merge" decision.
- No performance scoring of individual engineers.
- No production infrastructure or webhook listener.
- No AI review bot until deterministic value is validated.

## Evaluation for follow-up experiments

Measure: review wait/response time by actual events, time spent finding an MR's next action, unknown-state rate, reminder usefulness, and review rework. Exclude draft and intentionally on-hold periods; avoid treating `updated_at` as a reliable state-transition event. Pair speed with quality signals (defects, reverts, critical regressions).