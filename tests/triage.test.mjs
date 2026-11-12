import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { deriveInsight, assessApprovals } from '../dist/triage.js';

const cases = JSON.parse(readFileSync(new URL('../fixtures/mrs.json', import.meta.url), 'utf8'));
const mr = iid => cases.find(item => item.iid === iid);
const expected = new Map([
  [101, 'author_preparing'], [102, 'assign_reviewer'], [103, 'review_pending'],
  [104, 'review_pending'], [105, 'discussion_triage'], [106, 'pipeline_attention'],
  [107, 'merge_candidate'], [108, 'needs_clarification'], [109, 'on_hold'],
  [110, 'needs_clarification'], [111, 'needs_clarification'], [112, 'discussion_triage']
]);
for (const [iid, action] of expected) {
  test('synthetic MR ' + iid + ': ' + action, () => {
    const finding = deriveInsight(mr(iid));
    assert.equal(finding.action, action);
    assert.equal(finding.headSha, mr(iid).headSha);
    assert.ok(finding.evidence.length > 0);
  });
}
test('two named approvals: still pending with one approval', () => {
  assert.deepEqual(deriveInsight(mr(104)).nextActorIds, [22]);
});
test('only assigned reviewers count for any_assigned approval policy', () => {
  assert.equal(assessApprovals({ ...mr(107), approvedByIds: [999] }).status, 'pending');
});
test('unresolved discussions never automatically become author fault', () => {
  assert.deepEqual(deriveInsight(mr(105)).nextActorIds, []);
});
test('missing data must not be converted into success', () => {
  assert.equal(deriveInsight({ ...mr(107), unresolvedThreads: null }).action, 'needs_clarification');
});
test('unknown policy never becomes merge candidate', () => {
  assert.equal(deriveInsight({ ...mr(107), approvalPolicy: { kind: 'unknown' } }).action, 'needs_clarification');
});
test('on-hold has precedence over review waiting', () => {
  assert.equal(deriveInsight(mr(109)).action, 'on_hold');
});
