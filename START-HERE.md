# Start Here

This is the fastest way for the team to get aligned on `voting-saas-platform`.

## If You Read Only Three Things

1. [`README.md`](./README.md)
2. [`CONTRIBUTING.md`](./CONTRIBUTING.md)
3. [`docs/ops/onboarding.md`](./docs/ops/onboarding.md)

That is enough to understand:

- what this repo is
- how the team works
- how to start contributing safely

## Team Workflow in One Minute

- `WhatsApp` is for fast coordination and blockers
- `GitHub` is the source of truth for issues, PRs, decisions, and release history
- every change starts from an issue
- every change goes through a pull request
- do not merge if checks are failing
- keep PRs small and easy to review

## Before You Start Work

1. pick or create a GitHub issue
2. confirm the issue is clear and marked `Ready`
3. check whether design, API, or schema notes are needed
4. create a short-lived branch from `main`

## Before You Open a PR

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Then:

- link the issue
- attach screenshots for UI changes
- note API or schema changes
- disclose meaningful AI assistance and validation if AI was used
- request the right reviewer

## If You Need More Detail

- daily workflow: [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- AI rules and templates: [`docs/ai/README.md`](./docs/ai/README.md)
- first-day setup: [`docs/ops/onboarding.md`](./docs/ops/onboarding.md)
- team expectations: [`docs/ops/working-agreement.md`](./docs/ops/working-agreement.md)
- GitHub setup: [`docs/ops/github-setup-checklist.md`](./docs/ops/github-setup-checklist.md)
- QA expectations: [`docs/ops/qa-strategy.md`](./docs/ops/qa-strategy.md)

## For Team Leads

Use these docs when setting up the team:

- [`docs/ops/team-operating-model.md`](./docs/ops/team-operating-model.md)
- [`docs/ops/github-setup-checklist.md`](./docs/ops/github-setup-checklist.md)
- [`docs/ops/definition-of-ready.md`](./docs/ops/definition-of-ready.md)
- [`docs/ops/definition-of-done.md`](./docs/ops/definition-of-done.md)
