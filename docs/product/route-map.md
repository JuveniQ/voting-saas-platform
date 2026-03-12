# Route Map

## Public Surface

- `/` on `voting.company.com`: platform marketing/landing
- `/` on `tenantSlug.voting.company.com`: tenant-branded public portal
- `/api/health`: health and tenant-resolution check
- `/api/v1/public/verifications/email/request`
- `/api/v1/public/verifications/email/confirm`
- `/api/v1/public/votes`

## Back Office Surface

- `/app`: shared admin shell
- `/api/auth/*`: Better Auth endpoints
- `/api/v1/admin/campaigns`
- `/api/v1/admin/categories`
- `/api/v1/admin/nominees`
- `/api/v1/admin/rules`
- `/api/v1/admin/exports`

## Reserved Future Routes

- `/api/v1/payments/webhooks/:provider`
- `/app/platform/*` for platform-owner tools
- `/app/tenant/*` for client admin tooling
