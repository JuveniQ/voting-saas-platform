# ADR 001: Shared Database + Shared Schema Tenancy

## Decision

Use one shared Postgres database with a shared schema and mandatory `tenant_id` on tenant-owned tables.

## Why

- lowest-cost path for early SaaS delivery
- simpler migrations and analytics
- easier staging/preview environments
- clean upgrade path to dedicated databases later

## Guardrails

- RLS on tenant-owned tables
- tenant-aware repositories only
- composite uniques scoped by tenant
- host resolution must happen before any tenant-scoped query
