# Release Policy

## Principles

- `main` must stay releasable
- every merge to `main` happens through a reviewed pull request
- no release proceeds on failing checks
- high-risk changes require the CTO to approve the release

## Release Flow

1. merge completed work into `main`
2. confirm `CI / lint`, `CI / typecheck`, `CI / test`, and `CI / build` are green
3. review the linked issues and pull request notes
4. verify risky changes locally or in preview before production deployment
5. publish release notes from merged PRs and linked issues

## Release Cadence

- normal release window: after the Friday demo or when the sprint goal is complete
- hotfix releases: anytime for `Sev 1` or `Sev 2` incidents

## Hotfix Rules

- keep the change as small as possible
- document the incident or ops issue first
- add missing tests or follow-up issues immediately after the fix
- update runbooks or ADRs if the fix changes operating assumptions
