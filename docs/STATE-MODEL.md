# MR Flow — State and Decision Model

The observation contract in `src/triage.ts` is deliberately separate from GitLab response payloads.

## Principles
- GitLab is the source of truth. MR Flow derives insights; it does not own the MR lifecycle.
- Missing data is represented explicitly as `unknown` or `null`; never silently convert missing information to success.
- Every recommended action has a rationale, evidence, confidence, and commit SHA.
- An unresolved thread does not automatically imply that the author must change code.
- A GitLab CE approval does not prove that the team's required reviewer policy is satisfied.
- Reviewers and required approvers are different concepts. The latter requires an explicit team rule.
- `merge_candidate` is advisory. It is not authorization to merge.
- `onHold` must be an explicit signal, not inferred from inactivity.
- Reviewer acceptance, actual reviewing activity, and approval are distinct signals.

## Evaluation priority
1. Draft → author preparing.
2. Explicit on-hold → paused, no automatic reminder.
3. No assigned reviewers → assign reviewer.
4. Discussion data missing or discussions unresolved → clarification or triage.
5. Approval policy unknown/pending → clarification or review pending.
6. Pipeline failed/running/missing → investigate/wait/clarify.
7. Mergeability blocked/unknown → investigate/clarify.
8. All observed checks pass → merge candidate, subject to human confirmation.

The ordering is a prototype assumption, not a universal company policy. Experiment with counterexamples before enforcing it.

## Known omissions
No accurate Review SLO, review-start timestamps, reviewer workload, event transitions, or automatically inferred blocking comment severity. Avoid deriving those values from `updated_at`.

## Next adapter boundary
Map GitLab REST/GraphQL or `glab` responses to `MRObservation[]`, keeping API-specific schemas and networking outside the deterministic rules.
