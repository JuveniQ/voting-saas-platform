# QA Strategy

## Current Quality Gates

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

These checks must pass locally before review and in GitHub Actions before merge.

## Manual QA Focus

Verify the highest-risk flows first:

- tenant host routing
- admin sign-in and auth guards
- campaign, category, nominee, and rule management
- email OTP request and confirmation
- vote submission and result visibility rules
- responsive layouts on mobile and desktop

## Test Expectations by Change Type

- UI changes: screenshots plus mobile and desktop checks
- API or schema changes: contract update plus regression checks
- infra or auth changes: build, smoke flow, and runbook review
- bug fixes: reproduction steps in the issue and proof of resolution in the PR

## Next Quality Milestones

1. add Playwright smoke tests for sign-in, tenant routing, campaign CRUD, and voting
2. add visual regression for branded high-traffic screens
3. add load testing for the vote path before public launch
