# ADR 002: Better Auth for Back Office, Separate Voter Verification Domain

## Decision

Use `Better Auth` for platform/client admin identity and keep public voter verification as a separate platform-owned domain model.

## Why

- back-office auth needs stronger session and MFA support
- public voting identity has different friction and abuse requirements
- separating them avoids overloading admin auth with public vote flows

## Consequence

- admin auth tables and voter verification tables evolve independently
- email OTP can be launched first without blocking future phone OTP or payment-linked verification
