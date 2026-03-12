# Threat Model

## Primary Threats

- cross-tenant data leakage
- vote replay and duplicate submission
- bot traffic and OTP abuse
- nominee/result tampering by privileged users
- webhook spoofing in the future payment phase

## Defenses

- host resolution + tenant scoping + Postgres RLS
- idempotency keys on vote and webhook endpoints
- OTP verification before vote acceptance for default policy
- append-only audit events for privileged mutations
- signed webhooks and queue replay safety

## Immediate Gaps

- turnstile verification is planned but not yet wired
- in-memory OTP/vote scaffolding must move to Neon-backed repositories
- admin UI authorization still needs enforcement in route/page guards
