import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function checkPullRequest(pr) {
  if (pr.base.ref !== 'main') throw new Error('Contribution PRs must target main.');
  const closing = /\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#\d+\b/i;
  if (!closing.test(pr.body ?? '')) throw new Error('PR body must include Closes #<issue>.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  checkPullRequest(event.pull_request);
}
