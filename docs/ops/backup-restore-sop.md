# Backup and Restore SOP

## Backup

- use Neon branching/snapshots before risky migrations
- create named restore points before launch, payment rollout, and schema overhauls
- store migration artifacts in the repo and deployment logs externally

## Restore Drill

1. create a fresh branch from the target restore point
2. run schema verification and smoke tests
3. compare vote ledger counts, aggregate counts, and audit event counts
4. promote only after sign-off

## Success Criteria

- tenant routing still resolves correctly
- vote ledger remains intact
- aggregates can be recomputed
- back-office auth continues to function
