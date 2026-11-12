# Proposed MR Review Working Agreement

This is a discussion draft, not an enforced team policy.

## Ownership
- Every non-draft MR should have a clear primary reviewer or an explicit pending-assignment action.
- A primary reviewer is accountable for a timely first response, not necessarily for approving every domain.
- Additional consulted reviewers should have a focused purpose (security, architecture, learning, domain expertise).
- The author remains accountable for resolving feedback and coordinating merge readiness.
- State who can make the final merge decision under the team's established controls.

## SLO experiments
Treat the following as starting hypotheses, not global rules:
- Reviewer acknowledges assignment within four working hours.
- First substantive response within one working day.
- Author responds to actionable feedback within one working day, including a decision to defer.
- Once checks pass, author confirms merge or explains why it is on hold.

Measure p50 and p90 rather than individual performance rankings. Exclude weekends, leave, drafts, and explicit holds when computing business-time durations.

## Comments
- `Blocking`: correctness, security, or important change safety concern. Must resolve or explicitly agree.
- `Suggestion`: worthwhile but not necessary for this merge. Optional follow-up.
- `Question`: decision or rationale is needed.
- `Learning`: optional explanation and knowledge sharing.

Do not let vague phrasing silently turn suggestions into blockers.

## Escalation
- Prefer a targeted reminder to the next accountable actor over tagging everyone.
- Respect explicit holds and avoid duplicate reminders.
- On exceeding an SLO, check whether the reviewer is available or whether reassignment is needed.
- Agent output is advisory and must not silently blame individuals.

## Evaluate
Track first-review response time, waiting-for-author time, stale MR count, rework, and escaped defects; avoid optimizing merge speed alone.
