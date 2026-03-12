# GitHub Setup Checklist

## Repository

1. create a public repository for `voting-saas-platform`
2. set the default branch to `main`
3. enable `Discussions`
4. enable `Actions`
5. enable `Dependabot` alerts and security updates

## Discussions

Create these categories:

- `Announcements`
- `RFCs`
- `Product Ideas`
- `Q&A`

## Project

Create one GitHub Project called `Delivery`.

Fields:

- use built-in `Assignees` instead of a custom `Owner` field
- keep the built-in `Status` field available for default GitHub workflows if needed
- use custom `Workflow Status`: Inbox, Ready, In Progress, In Review, Blocked, QA, Done
- use custom `Work Type`: Epic, Feature, Task, Bug, Spike, Ops
- `Area`: Frontend, Design, Backend, Auth, Tenancy, Voting, Fraud, Analytics, Infra, Docs
- `Priority`: P0, P1, P2, P3
- `Size`: XS, S, M, L
- `Iteration`
- `Design Ready`: No, Yes, N/A
- `API Ready`: No, Yes, N/A
- `Risk`: Low, Medium, High

Suggested views:

- `Backlog`
- `This Week`
- `In Review`
- `Blocked`
- `Bugs`
- `Done`

## Labels

Create labels for:

- `type: epic`, `type: feature`, `type: task`, `type: bug`, `type: spike`, `type: ops`
- `area: frontend`, `area: design`, `area: backend`, `area: auth`, `area: tenancy`, `area: voting`, `area: fraud`, `area: analytics`, `area: infra`, `area: docs`
- `priority: p0`, `priority: p1`, `priority: p2`, `priority: p3`
- `risk: high`, `risk: medium`, `risk: low`

## Branch Protection

Configure branch protection for `main`:

- require a pull request before merging
- require at least one approval
- dismiss stale approvals on new commits
- require conversation resolution before merge
- require status checks:
  - `lint`
  - `typecheck`
  - `test`
  - `build`
- block direct pushes
- block force pushes
- require linear history

## CODEOWNERS

1. replace the placeholder entries in `.github/CODEOWNERS` with real team slugs or GitHub handles
2. only after that, enable `Require review from Code Owners`

Suggested team mapping:

- `CTO`: auth, tenancy, infra, schema, security-sensitive changes
- `Full Stack Lead`: domain logic, APIs, shared backend flows
- `UI/UX Frontend Lead`: `src/app`, `src/components`, branding, accessibility, responsive behavior

## Templates and Automation

- keep issue forms enabled
- keep blank issues disabled
- require the PR template on all pull requests
- add new issues to the `Delivery` project automatically if your org settings allow it

## Secrets and Environments

Create environments:

- `preview`
- `production`

Store secrets outside the repo:

- Cloudflare tokens
- Neon database credentials
- Better Auth secrets
- Resend keys
- Turnstile keys
