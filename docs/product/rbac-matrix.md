# RBAC Matrix

| Role | Scope | Key Abilities |
| --- | --- | --- |
| `platform_owner` | global | onboard tenants, view all analytics, manage fraud tooling, manage plans, approve exports |
| `client_admin` | tenant | manage campaigns, categories, nominees, rules, exports, branding for own tenant |
| `client_analyst` | tenant | view analytics, exports, leaderboards, results for own tenant |
| `public_voter` | tenant portal | browse publicly and vote when verification rules are satisfied |

## Guardrails

- Platform owners can impersonate support-only views, never alter vote ledgers directly.
- Client roles are always tenant-scoped.
- Public voters never receive cross-tenant identifiers.
