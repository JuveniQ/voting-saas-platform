# Fraud Playbook

## Signals to Track

- repeated votes with shared IP/device/email hashes
- rapid OTP requests for the same target
- repeated idempotency collisions
- burst voting concentrated on one nominee
- sudden geographic or ASN concentration shifts

## Automated Actions

- throttle OTP issuance
- flag suspicious vote attempts
- block obvious replay or token misuse
- hide or delay suspicious counts from read models pending review

## Manual Review Queue

- tenant/campaign context
- signal summary
- related identifiers
- action taken
- reviewer and timestamp
