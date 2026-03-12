# Domain Glossary

- `Tenant`: a SaaS client or event organization using the platform.
- `TenantDomain`: a hostname bound to one tenant.
- `BrandTheme`: token set controlling a tenant's colors, type, and mood.
- `Campaign`: a voting program within a tenant, such as an awards edition.
- `CampaignPhaseRule`: the schedule controlling nomination, voting, and results transitions.
- `Category`: a competitive bucket inside a campaign.
- `Nominee`: a person, team, or entity receiving nominations or votes.
- `VotingRule`: configuration describing vote mode, verification, limits, and visibility.
- `VoterProfile`: a platform-side public voter record.
- `VerificationAttempt`: OTP or other identity challenge issued before a vote.
- `VoteAttempt`: an inbound vote command before final ledger recording.
- `VoteLedger`: immutable accepted votes; source of truth.
- `VoteAggregate`: precomputed read model for leaderboards, trends, and results.
- `FraudSignal`: a risk event or heuristic finding related to voting behavior.
- `AuditEvent`: append-only record of privileged actions.
- `ExportJob`: queued reporting/output request.
- `PaymentIntent`: future payment reservation object for paid or hybrid voting.
