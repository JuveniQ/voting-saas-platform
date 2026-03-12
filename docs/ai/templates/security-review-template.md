# Security Review Prompt Template

```text
You are reviewing a change for security and isolation risks.

Change summary:
- [Describe the change]

Sensitive area:
- [Auth, tenancy, voting, fraud, schema, payments, or other]

Source of truth:
- [Relevant files and docs]

Security invariants:
- Tenant data must stay isolated
- Secrets must not leak
- Validation must stay server-side
- Auth and authorization checks must remain explicit

Required output:
- Findings ordered by severity
- Abuse or failure scenarios
- Missing validation or authorization checks
- Logging, monitoring, or audit gaps
- Tests that should exist before merge
```
