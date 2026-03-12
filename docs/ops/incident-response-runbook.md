# Incident Response Runbook

## Severity 1 Examples

- platform-wide voting outage
- confirmed cross-tenant exposure
- corrupted vote ledger

## First Response

1. freeze deployments
2. capture scope: tenant, campaign, route, and time window
3. preserve logs and queue state
4. switch affected tenant/campaign to safe mode if needed

## Communications

- platform owner lead
- affected client admins
- engineering incident channel

## After Action

- root cause summary
- blast radius
- remediation tasks
- control gaps and ADR updates
