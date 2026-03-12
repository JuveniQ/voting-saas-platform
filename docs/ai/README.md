# AI Governance Pack

This folder defines how `voting-saas-platform` uses AI without weakening code quality, security, scalability, or performance.

## Start Here

Read these in order:

1. [`ai-usage-policy.md`](./ai-usage-policy.md)
2. [`approved-tools-and-data-rules.md`](./approved-tools-and-data-rules.md)
3. [`prompting-standard.md`](./prompting-standard.md)
4. [`review-and-verification-checklist.md`](./review-and-verification-checklist.md)
5. [`task-risk-matrix.md`](./task-risk-matrix.md)
6. [`research-basis.md`](./research-basis.md)

Then use the templates in [`templates`](./templates).

## Public and Private Split

This public repo contains:

- day-to-day rules for AI use
- approved public guidance for prompts and reviews
- prompt templates for common engineering tasks
- repo instruction files for GitHub Copilot and agentic tools

Sensitive operational details stay out of this public repo. The recommended private location for those materials is:

- `JuveniQ/voting-saas-ops-private/docs/ai/`

That private pack should hold:

- provider settings and retention choices
- approved model and account inventory
- sensitive data examples and redaction examples
- incident handling steps for AI misuse
- internal onboarding details for admin-managed AI tools

## Use AI Like This

- treat AI output like untrusted third-party input
- provide clear constraints, paths, and acceptance criteria
- never paste secrets or sensitive customer data
- never let AI replace human review on risky changes
- prefer small, scoped prompts over broad open-ended requests

## Use These Templates

- planning: [`templates/planning-template.md`](./templates/planning-template.md)
- implementation: [`templates/implementation-template.md`](./templates/implementation-template.md)
- debugging: [`templates/debugging-template.md`](./templates/debugging-template.md)
- security review: [`templates/security-review-template.md`](./templates/security-review-template.md)
- performance: [`templates/performance-optimization-template.md`](./templates/performance-optimization-template.md)
- API or schema work: [`templates/api-schema-change-template.md`](./templates/api-schema-change-template.md)
- tests: [`templates/test-generation-template.md`](./templates/test-generation-template.md)
- frontend UI: [`templates/frontend-ui-template.md`](./templates/frontend-ui-template.md)
- docs: [`templates/docs-update-template.md`](./templates/docs-update-template.md)
