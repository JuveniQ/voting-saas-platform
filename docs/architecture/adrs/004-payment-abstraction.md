# ADR 004: Payment Abstraction Before Payment Integration

## Decision

Define payment contracts and schema now, but do not implement live payments in the MVP.

## Why

- preserves a clean path for paid and hybrid voting
- avoids redesigning vote ledgers or webhook reconciliation later
- lets South Africa-first gateway selection happen closer to the payment phase

## Initial Provider Order

1. Yoco for South Africa hosted checkout
2. Paystack for broader regional reach
3. Flutterwave when deeper cross-country/mobile money support is needed
