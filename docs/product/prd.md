# Product Requirements Document

## Goal

Deliver a multi-tenant SaaS voting platform where each client gets a branded public portal and a shared back-office, while all tenant data stays isolated on one platform.

## Primary Users

- Platform owners: onboard tenants, manage plans, monitor fraud, review exports, and control global settings.
- Client admins: create campaigns, categories, nominees, rules, media, and reports for their own tenant only.
- Public voters: browse public portals and cast verified votes with low friction on mobile devices.

## MVP Scope

- Tenant-aware public portals on platform subdomains
- Shared back-office shell for platform and client admins
- Campaign, category, nominee, and rule domain model
- Email OTP verification for public voting
- Vote submission API with idempotency support
- Results/leaderboard phase logic
- Audit, fraud, export, and payment-ready schemas/interfaces

## Non-MVP

- Customer-owned custom domains
- Phone OTP
- Hosted video transcoding
- Payments, tickets, and donations
- Separate databases per tenant

## Success Criteria

- Tenant isolation is enforced at host, application, and database layers.
- A tenant portal can be re-themed without code changes.
- Vote flows remain fast and correct under replay and high-traffic conditions.
- Platform owners can extend into fraud, analytics, and payments without redesigning the core model.
