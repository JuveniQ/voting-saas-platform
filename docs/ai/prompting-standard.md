# Prompting Standard

Every serious engineering prompt should follow the same structure.

## Canonical Structure

```text
Goal:
- What needs to be achieved?

Source of truth:
- Exact files, docs, or contracts to rely on

Constraints:
- Architecture, framework, coding style, validation, deployment, or product rules

Non-goals:
- What must not change?

Security and privacy limits:
- What sensitive data is excluded?
- What invariants must be preserved?

Performance and scalability expectations:
- Latency, load, caching, indexing, bundle size, mobile impact, or queue behavior

Acceptance criteria:
- Concrete outcomes that define done

Required output:
- Plan, patch, test cases, review findings, or a specific file format

Validation:
- Tests, checks, benchmarks, or manual verification steps that must be run
```

## Default Prompting Rules

- point to exact files and docs instead of saying "look around"
- ask for the smallest safe change
- include non-goals so the AI does not broaden scope
- state architecture rules explicitly
- require tests, docs, and validation output when relevant
- ask for risks and edge cases when the task is high impact

## What Good Prompts Include

- issue or ticket context
- relevant file paths
- repo-specific constraints
- security and performance requirements
- acceptance criteria
- expected output shape

## What Bad Prompts Usually Miss

- source-of-truth files
- non-goals
- data sensitivity limits
- performance expectations
- how to validate correctness

## For High-Risk Work

Prompts for auth, tenancy, voting, fraud, schema, and security work must:

- identify the sensitive area up front
- include the invariants that cannot change
- require the AI to call out risks and unanswered questions
- avoid pasting real sensitive data
