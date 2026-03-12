---
applyTo: "src/app/api/**/*.ts,src/lib/contracts/**/*.ts,src/lib/identity/**/*.ts,src/lib/notifications/**/*.ts,src/lib/payments/**/*.ts"
---

# Backend Instructions

- Preserve current contracts and validation rules.
- Do not invent route shapes, fields, env vars, or background systems.
- Keep changes issue-scoped and prefer small helpers over broad rewrites.
- Call out security, rate-limit, retry, and failure-mode implications when relevant.
- If a behavior change affects contracts or docs, update them in the same change.
