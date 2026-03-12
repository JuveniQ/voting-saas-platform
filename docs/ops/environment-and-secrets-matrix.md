# Environment and Secrets Matrix

## Rules

- keep all secrets out of the public repo, public issues, public discussions, WhatsApp, and Penpot
- only store secrets in local `.env.local`, GitHub environment secrets, or the provider dashboard that owns them
- the CTO owns production secrets; the Full Stack Lead owns rotation follow-through; the CEO is informed for production-impacting changes

## Environments

| Environment | Purpose | Primary host | Data level |
| --- | --- | --- | --- |
| local | day-to-day development | `localhost:3000` | local or seeded |
| preview | pre-merge or release validation | branch-specific or temporary preview host | non-production |
| production | live tenant and admin traffic | `voting.company.com` and subdomains | production |

## Runtime Variables

| Variable | Secret | Used in | Owner | Notes |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | yes | local, preview, production | CTO | Neon connection string |
| `BETTER_AUTH_SECRET` | yes | local, preview, production | CTO | rotate on compromise or auth redesign |
| `BETTER_AUTH_URL` | no | local, preview, production | Full Stack Lead | match deployed auth base URL |
| `RESEND_API_KEY` | yes | preview, production | CTO | required when email delivery is live |
| `RESEND_FROM_EMAIL` | no | preview, production | Full Stack Lead | verified sender identity |
| `TURNSTILE_SITE_KEY` | no | preview, production | Full Stack Lead | public key |
| `TURNSTILE_SECRET_KEY` | yes | preview, production | CTO | server-side validation key |
| `PLATFORM_BASE_DOMAIN` | no | local, preview, production | Full Stack Lead | defaults to `voting.company.com` |
| `PLATFORM_MARKETING_HOST` | no | local, preview, production | Full Stack Lead | defaults to `voting.company.com` |
| `PLATFORM_APP_HOST` | no | local, preview, production | Full Stack Lead | defaults to `app.voting.company.com` |
| `NEXT_PUBLIC_PLATFORM_NAME` | no | local, preview, production | UI/UX Frontend Lead | display-only brand name |

## Deployment Secrets

| Secret | Stored in | Owner | Notes |
| --- | --- | --- | --- |
| Cloudflare API token | GitHub environment or local shell | CTO | required for CI deploys |
| Cloudflare account ID | GitHub environment or local shell | CTO | not highly sensitive, but keep out of issues |
| Neon admin credentials | Neon dashboard only | CTO | never post in chat |
| Resend admin access | Resend dashboard only | CTO | invite least privilege users only |
