# Voting SaaS Platform

Multi-tenant SaaS voting platform foundation built with `Next.js`, `Cloudflare Workers`, `OpenNext`, `Neon Postgres`, and `Better Auth`.

New team members should begin with [`START-HERE.md`](./START-HERE.md).

## What This Repo Contains

This repository starts with the architecture and pre-development pack from the planning phase, then implements the first platform foundation layer:

- host-based tenant resolution for `voting.company.com`, `app.voting.company.com`, and `tenantSlug.voting.company.com`
- branded tenant and public surface rendering
- Cloudflare/OpenNext deployment configuration
- Drizzle schema for the core domain model
- Better Auth server setup for platform and client admins
- email OTP scaffolding for voter verification
- public and admin API contract stubs
- architecture, security, product, and ops docs under [`docs`](./docs)

## Start Here

- team entry point: [`START-HERE.md`](./START-HERE.md)
- contribution guide: [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- AI governance pack: [`docs/ai/README.md`](./docs/ai/README.md)
- security reporting: [`SECURITY.md`](./SECURITY.md)
- onboarding guide: [`docs/ops/onboarding.md`](./docs/ops/onboarding.md)

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run cf:build
npm run cf:preview
```

## Environment

Copy [`.env.example`](./.env.example) to `.env.local` for local development.

The app can boot without secrets for UI work, but auth, database, and email features only become fully active after the required variables are provided.

## Team Operations

The operating model for the four-person team lives in [`docs/ops`](./docs/ops):

- [`team-operating-model.md`](./docs/ops/team-operating-model.md)
- [`github-setup-checklist.md`](./docs/ops/github-setup-checklist.md)
- [`working-agreement.md`](./docs/ops/working-agreement.md)
- [`definition-of-ready.md`](./docs/ops/definition-of-ready.md)
- [`definition-of-done.md`](./docs/ops/definition-of-done.md)
- [`qa-strategy.md`](./docs/ops/qa-strategy.md)
- [`onboarding.md`](./docs/ops/onboarding.md)

AI usage guidance lives in [`docs/ai`](./docs/ai):

- [`ai-usage-policy.md`](./docs/ai/ai-usage-policy.md)
- [`approved-tools-and-data-rules.md`](./docs/ai/approved-tools-and-data-rules.md)
- [`prompting-standard.md`](./docs/ai/prompting-standard.md)
- [`review-and-verification-checklist.md`](./docs/ai/review-and-verification-checklist.md)
- [`task-risk-matrix.md`](./docs/ai/task-risk-matrix.md)

Repository workflow files live under [`.github`](./.github), including issue forms, the pull request template, the CI workflow, and the CODEOWNERS template.

## Project Structure

```text
src/
  app/                  Next.js surfaces and route handlers
  components/surfaces/  Marketing, tenant portal, and back-office UI shells
  lib/auth/             Better Auth setup and role helpers
  lib/branding/         Theme tokens and CSS variable mapping
  lib/contracts/        Zod API contracts
  lib/db/               Drizzle client and schema
  lib/identity/         OTP and verification scaffolding
  lib/notifications/    Notification provider abstraction
  lib/payments/         Future payment adapter contracts
  lib/tenancy/          Tenant registry and hostname resolution
  lib/voting/           Phase engine, policy helpers, and vote ledger scaffolding
docs/
  api/
  ai/
  architecture/
  ops/
  product/
  security/
```

## Current Scope

This repo currently implements the platform foundation and documentation pack, not the full SaaS feature set.

The next coding passes should focus on:

1. persistent repositories over Neon and Drizzle
2. authenticated back-office flows
3. real OTP persistence and delivery tracking
4. full CRUD for campaigns, categories, nominees, and rules
5. queue-backed aggregates, exports, and fraud workflows
