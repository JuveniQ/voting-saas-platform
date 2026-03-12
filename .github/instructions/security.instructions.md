---
applyTo: "src/lib/auth/**/*.ts,src/lib/db/**/*.ts,src/lib/tenancy/**/*.ts,src/lib/voting/**/*.ts,docs/security/**/*.md"
---

# Security Instructions

- Be conservative in sensitive areas.
- Do not weaken auth, authorization, tenant isolation, validation, or audit behavior.
- Do not guess security invariants; surface uncertainty clearly.
- Never introduce silent fallback behavior in sensitive code paths.
- Prefer explicit checks, clear failure modes, and test coverage for edge cases.
- If a change affects risk posture, mention it in docs or review notes.
