export type PipelineStatus = 'success' | 'failed' | 'running' | 'missing' | 'unknown';
export type Mergeability = 'mergeable' | 'blocked' | 'unknown';
export type Confidence = 'high' | 'medium' | 'unknown';
export type Action = 'author_preparing' | 'on_hold' | 'assign_reviewer' | 'review_pending' | 'discussion_triage' | 'pipeline_attention' | 'checks_pending' | 'merge_blocked' | 'merge_candidate' | 'needs_clarification';

export type ApprovalPolicy =
  | { kind: 'named'; requiredUserIds: number[] }
  | { kind: 'any_assigned'; count: number }
  | { kind: 'unknown' };

export interface MRObservation {
  projectId: number;
  iid: number;
  title: string;
  webUrl: string;
  headSha: string;
  draft: boolean;
  authorId: number;
  reviewerIds: number[];
  approvedByIds: number[];
  /** null means unknown, never zero */
  unresolvedThreads: number | null;
  pipeline: PipelineStatus;
  mergeability: Mergeability;
  /** Must come from an explicit signal */
  onHold: boolean;
  approvalPolicy: ApprovalPolicy;
}

export interface MRInsight {
  projectId: number;
  iid: number;
  title: string;
  webUrl: string;
  headSha: string;
  action: Action;
  nextActorIds: number[];
  rationale: string;
  evidence: string[];
  confidence: Confidence;
}

interface ApprovalAssessment {
  status: 'satisfied' | 'pending' | 'unknown';
  missingIds: number[];
  evidence: string[];
}

function unique(ids: readonly number[]): number[] {
  return [...new Set(ids)];
}

export function assessApprovals(mr: MRObservation): ApprovalAssessment {
  const assigned = unique(mr.reviewerIds);
  const approved = new Set(mr.approvedByIds);
  const policy = mr.approvalPolicy;
  if (policy.kind === 'unknown') {
    return { status: 'unknown', missingIds: [], evidence: ['approvalPolicy.kind=unknown'] };
  }
  if (policy.kind === 'named') {
    const required = unique(policy.requiredUserIds);
    if (!required.length) return { status: 'unknown', missingIds: [], evidence: ['approvalPolicy has no named reviewers'] };
    const missing = required.filter(id => !approved.has(id));
    return {
      status: missing.length ? 'pending' : 'satisfied',
      missingIds: missing,
      evidence: ['policy=named(' + required.join(',') + ')', 'approvedByIds=' + unique(mr.approvedByIds).join(',')]
    };
  }
  if (!Number.isInteger(policy.count) || policy.count < 1 || policy.count > assigned.length) {
    return { status: 'unknown', missingIds: [], evidence: ['approvalPolicy any_assigned has invalid count'] };
  }
  const matching = assigned.filter(id => approved.has(id));
  return {
    status: matching.length >= policy.count ? 'satisfied' : 'pending',
    missingIds: assigned.filter(id => !approved.has(id)),
    evidence: ['policy=any_assigned(' + policy.count + ')', 'assignedApprovals=' + matching.length]
  };
}

export function deriveInsight(mr: MRObservation): MRInsight {
  const result = (action: Action, nextActorIds: number[], rationale: string, evidence: string[], confidence: Confidence): MRInsight => ({
    projectId: mr.projectId, iid: mr.iid, title: mr.title, webUrl: mr.webUrl, headSha: mr.headSha,
    action, nextActorIds: unique(nextActorIds), rationale, evidence, confidence
  });

  if (mr.draft) {
    return result('author_preparing', [mr.authorId], 'Draft MR: not yet in the review queue.', ['draft=true'], 'high');
  }
  if (mr.onHold) {
    return result('on_hold', [], 'Explicitly paused: do not send automatic inactivity reminders.', ['onHold=true'], 'high');
  }
  if (mr.reviewerIds.length === 0) {
    return result('assign_reviewer', [mr.authorId], 'No reviewer is assigned; request an owner decision.', ['reviewerIds=[]'], 'high');
  }
  if (mr.unresolvedThreads === null) {
    return result('needs_clarification', [], 'Discussion data was not observed; cannot infer readiness.', ['unresolvedThreads=null'], 'unknown');
  }
  if (mr.unresolvedThreads > 0) {
    return result('discussion_triage', [], 'An unresolved thread needs a human decision, not necessarily a code change.', ['unresolvedThreads=' + mr.unresolvedThreads], 'high');
  }

  const approvals = assessApprovals(mr);
  if (approvals.status === 'unknown') {
    return result('needs_clarification', [], 'Approval requirements are unknown or invalid.', approvals.evidence, 'unknown');
  }
  if (approvals.status === 'pending') {
    const actors = mr.approvalPolicy.kind === 'named'
      ? approvals.missingIds
      : mr.reviewerIds.filter(id => !mr.approvedByIds.includes(id));
    return result('review_pending', actors, 'The agreed approval requirement has not been met.', approvals.evidence, 'high');
  }
  if (mr.pipeline === 'failed') {
    return result('pipeline_attention', [mr.authorId], 'Pipeline failed; investigate before merge.', ['pipeline=failed'], 'high');
  }
  if (mr.pipeline === 'running') {
    return result('checks_pending', [], 'Pipeline is running; no immediate human intervention inferred.', ['pipeline=running'], 'high');
  }
  if (mr.pipeline === 'unknown' || mr.pipeline === 'missing') {
    return result('needs_clarification', [], 'Pipeline result is unavailable; cannot infer merge readiness.', ['pipeline=' + mr.pipeline], 'unknown');
  }
  if (mr.mergeability === 'blocked') {
    return result('merge_blocked', [], 'GitLab indicates a merge blocker; investigate its cause.', ['mergeability=blocked'], 'medium');
  }
  if (mr.mergeability === 'unknown') {
    return result('needs_clarification', [], 'Mergeability is unknown; do not mark this MR ready.', ['mergeability=unknown'], 'unknown');
  }
  return result('merge_candidate', [mr.authorId],
    'Observed checks appear satisfied; a human must confirm any release or coordination constraints.',
    [...approvals.evidence, 'unresolvedThreads=0', 'pipeline=success', 'mergeability=mergeable'], 'medium');
}

export function deriveAll(observations: MRObservation[]): MRInsight[] {
  return observations.map(deriveInsight);
}
