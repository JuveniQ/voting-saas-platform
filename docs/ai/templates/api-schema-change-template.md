# API and Schema Change Prompt Template

```text
You are planning an API or schema change in voting-saas-platform.

Goal:
- [Describe the change]

Source of truth:
- [Relevant route handlers, contracts, schema files, docs]

Constraints:
- Do not invent fields, env vars, or compatibility rules
- Preserve tenant scoping and validation requirements
- Keep backward compatibility explicit

Non-goals:
- [List what must not change]

Required output:
- Proposed request and response changes
- Data model impact
- Migration or compatibility concerns
- Docs and tests that must be updated
```
