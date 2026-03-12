# Agent Instructions

This repo allows AI assistance, but the human team owns final correctness.

## Non-Negotiable Rules

- stay inside the linked issue scope
- do not invent architecture, APIs, env vars, or security rules
- keep secrets, tokens, customer data, and production details out of prompts and output
- treat AI-generated code as untrusted until reviewed and tested
- prefer small diffs over broad rewrites

## Sensitive Areas

Be conservative in:

- `src/lib/auth`
- `src/lib/tenancy`
- `src/lib/db`
- `src/lib/voting`
- `src/app/api`

For these areas:

- ask for clarification instead of guessing
- preserve tenant isolation and validation
- flag security, performance, or scalability risks

## Source of Truth

Check these before proposing or applying changes:

- `README.md`
- `CONTRIBUTING.md`
- `docs/ai/`
- `docs/api/openapi.yaml`
- `docs/security/`

## Required Validation

Do not treat work as complete without appropriate validation:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
