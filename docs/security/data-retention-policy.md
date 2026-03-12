# Data Retention Policy

## Keep

- vote ledger and audit events: retained long term
- campaign, category, nominee, and rules history: retained long term

## Limit

- raw OTP codes: never store in plaintext in production
- IP/device raw values: hash or encrypt; keep only as needed for abuse defense
- exported files: expire and purge after policy-defined windows

## Review Triggers

- tenant offboarding
- legal deletion requests
- storage cost spikes
- regional privacy/compliance changes
