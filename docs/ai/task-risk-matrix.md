# Task Risk Matrix

Use this matrix before you use AI on a task.

| Task type | Risk | AI use | Required human controls |
| --- | --- | --- | --- |
| Docs updates, summaries, glossary cleanup | Green | Full assistance allowed | Normal review and docs check |
| Non-sensitive test scaffolding | Green | Full assistance allowed | Verify tests are meaningful |
| Small UI text or presentation refinements | Green | Full assistance allowed | Check responsive and accessibility impact |
| Clearly scoped implementation from an issue | Yellow | Allowed with strong prompt constraints | Review code, run checks, keep diff small |
| Debugging from sanitized logs or repro steps | Yellow | Allowed with sanitized context | Confirm root cause before accepting fix |
| Refactors with no behavior change | Yellow | Allowed with explicit non-goals | Confirm no hidden behavior drift |
| API changes with existing contract context | Yellow | Allowed with exact contract references | Update docs and verify compatibility |
| Auth changes | Red | Analysis and review support first; code generation only with explicit task context | CTO review, manual invariant check |
| Tenancy or hostname resolution | Red | Analysis and review support first; code generation only with explicit task context | CTO review, tenant isolation check |
| Voting logic or fraud controls | Red | Analysis and review support first; code generation only with explicit task context | Manual rule review and edge-case testing |
| DB schema changes | Red | Analysis and review support first; code generation only with explicit task context | Migration review, rollback thinking |
| Payment logic | Red | Analysis and review support first; code generation only with explicit task context | Security and reconciliation review |
| Security incidents or unpublished vulnerabilities | Red | Do not use external AI tools with live details | Use internal process only |

## Interpretation

- `Green`: AI can help directly, but normal validation still applies.
- `Yellow`: AI can help if the prompt is tightly scoped and the output stays within issue boundaries.
- `Red`: Use AI conservatively. Prefer analysis, review support, and carefully constrained drafting over open-ended generation.
