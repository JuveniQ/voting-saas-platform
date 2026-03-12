# Copilot Instructions

Use AI in this repo as an assistant, not as the decision-maker.

- Stay inside the linked issue scope.
- Prefer small diffs and short-lived branches.
- Do not invent APIs, env vars, or architecture.
- Keep secrets, customer data, tenant identifiers, and production details out of prompts and output.
- Preserve tenant isolation, validation, auth checks, and auditability.
- Prefer tests and docs updates when behavior changes.
- For auth, tenancy, voting, fraud, schema, or payment work, be conservative and flag uncertainty instead of guessing.
- If the task is unclear, ask for clarification instead of broadening scope.

Before suggesting code, look at the relevant source files and docs:

- `README.md`
- `CONTRIBUTING.md`
- `docs/ai/`
- `docs/security/`
- `docs/api/openapi.yaml`

Never recommend skipping tests, reviews, or security checks.
