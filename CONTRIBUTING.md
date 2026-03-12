# Contributing

Thanks for contributing to `voting-saas-platform`.

This repo is run with a simple rule: keep delivery fast, but keep the record clean.

## Start Here

Before opening code changes:

1. read [`README.md`](./README.md)
2. read [`docs/ops/team-operating-model.md`](./docs/ops/team-operating-model.md)
3. read [`docs/ops/working-agreement.md`](./docs/ops/working-agreement.md)
4. read [`docs/ops/definition-of-ready.md`](./docs/ops/definition-of-ready.md)
5. read [`docs/ops/definition-of-done.md`](./docs/ops/definition-of-done.md)

## Workflow

1. pick or create a GitHub issue
2. make sure the issue is `Ready`
3. create a short-lived branch from `main`
4. make the smallest change that solves the issue
5. run:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
6. open a pull request using the template
7. link the issue and request the right reviewer

## Pull Request Rules

- every PR must link to an issue
- every PR should be small enough to review in about 30 minutes
- UI changes need screenshots or video
- API or schema changes must update docs or contracts
- behavior or process changes must update the relevant docs
- do not merge with failing checks

## AI-Assisted Work

- read [`docs/ai/README.md`](./docs/ai/README.md) before using AI on repo work
- only use approved AI tools and only with allowed data classes
- never paste secrets, raw logs, tenant identifiers, or sensitive internal context into consumer tools
- treat AI output like untrusted input until it is reviewed and validated
- disclose meaningful AI assistance in the PR and note how the result was checked
- do not use autonomous or broad-scope AI workflows for auth, tenancy, voting, fraud, schema, or payment changes without explicit CTO approval

## Branching and Commits

- use short-lived branches
- prefer one issue per pull request
- use Conventional Commits when possible

Examples:

- `feat: add campaign close action`
- `fix: prevent duplicate vote submissions`
- `docs: clarify onboarding flow`

## Reviews

- first review target is within one business day
- if your PR touches auth, tenancy, infra, or schema, include the CTO
- if your PR touches `src/app` or `src/components`, include the UI/UX Frontend Lead
- the PR author remains responsible for driving the change to safe merge

## Communication

- use `WhatsApp` for quick coordination and blockers
- use `GitHub` for the permanent record
- if a decision happens in WhatsApp, summarize it in GitHub within 24 hours

## Security and Sensitive Information

- never commit secrets, tokens, or private client information
- never post sensitive values in issues, PRs, Discussions, or WhatsApp
- use `.env.local`, GitHub environment secrets, or provider dashboards for secrets
- never paste sensitive values into unapproved or consumer AI tools
- read [`SECURITY.md`](./SECURITY.md) before reporting a security issue

## Need More Context?

- product context: [`docs/product/prd.md`](./docs/product/prd.md)
- API contracts: [`docs/api/openapi.yaml`](./docs/api/openapi.yaml)
- AI governance: [`docs/ai/README.md`](./docs/ai/README.md)
- onboarding: [`docs/ops/onboarding.md`](./docs/ops/onboarding.md)
- QA expectations: [`docs/ops/qa-strategy.md`](./docs/ops/qa-strategy.md)
