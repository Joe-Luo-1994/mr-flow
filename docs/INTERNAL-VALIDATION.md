# Internal Validation Checklist

Use only in the approved company development environment. Never upload internal MR metadata, credentials, or source code to this external GitHub repository.

## Before API experiments
- Verify GitLab CE version, `glab --version`, and `glab auth status` without printing secrets.
- Confirm repository/project access, API read permissions, and current token scope.
- Read: GitLab's official Merge Requests, Approvals, Discussions, and Reviewers API docs.
- All calls must be read-only. Do not post comments, approve, merge, or assign reviewers.

## Representative cases
Sample only a handful of authorized MRs: draft, unassigned reviewer, first review pending, two named approvals, unresolved discussion, pipeline blocked, ready candidate, explicitly deferred.

## Candidate read-only calls
```bash
glab api 'projects/<url-encoded-project-id>/merge_requests/<iid>'
glab api 'projects/<url-encoded-project-id>/merge_requests/<iid>/approvals'
glab api 'projects/<url-encoded-project-id>/merge_requests/<iid>/discussions'
```
Verify exact paths against your installed `glab` and GitLab version; do not assume the response has every field.

## Normalization rules
- Use an isolated GitLab adapter to produce `MRObservation[]`.
- Determine required approval policy from an explicit local team agreement; never infer from GitLab CE's `approved` boolean.
- Missing API fields remain `unknown` rather than falsy defaults.
- Tie outputs to the observed head commit SHA.
- Unresolved discussion count is not automatically the number of blocking comments.
- Do not conflate MR `updated_at` with review response time.
- Keep local snapshots, reports, and credential files outside tracked Git paths.

## Validation
Run `npm test`, then `npm run report` for synthetic data.
After validating your internal adapter, run `node tools/report.mjs internal/normalized.json output/internal-report.html`.
Compare each derived insight with the original GitLab page manually.
Record discrepancies and uncertainty; prefer fixing a data contract over adding heuristic rules.
