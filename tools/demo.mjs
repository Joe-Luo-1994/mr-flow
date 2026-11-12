import { readFileSync } from 'node:fs';
import { deriveAll } from '../dist/triage.js';
const inputPath = process.argv[2];
const observations = JSON.parse(readFileSync(inputPath || new URL('../fixtures/mrs.json', import.meta.url), 'utf8'));
for (const insight of deriveAll(observations)) {
  console.log('#' + insight.iid + ' ' + insight.action.padEnd(22) + ' actors=' + (insight.nextActorIds.join(',') || '?') + ' evidence=' + insight.evidence.join('; '));
}
