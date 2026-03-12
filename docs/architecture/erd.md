# ERD

```mermaid
erDiagram
  tenants ||--o{ tenant_domains : has
  tenants ||--o{ brand_themes : has
  tenants ||--o{ tenant_members : has
  tenants ||--o{ campaigns : owns
  campaigns ||--|| campaign_phase_rules : schedules
  campaigns ||--o{ categories : contains
  categories ||--o{ nominees : contains
  nominees ||--o{ nominee_assets : has
  campaigns ||--|| voting_rules : governs
  tenants ||--o{ voter_profiles : owns
  voter_profiles ||--o{ voter_identifiers : tracks
  campaigns ||--o{ verification_attempts : issues
  campaigns ||--o{ vote_attempts : receives
  vote_attempts ||--o| vote_ledger : records
  campaigns ||--o{ vote_aggregates : summarizes
  campaigns ||--o{ fraud_signals : raises
  campaigns ||--o{ export_jobs : exports
  campaigns ||--o{ payment_intents : reserves
  payment_intents ||--o{ payment_events : logs
```

## Notes

- `vote_ledger` is the source of truth for accepted votes.
- `vote_aggregates` is a read model for leaderboards/results.
- `payment_intents` and `payment_events` are reserved now for future paid/hybrid voting.
