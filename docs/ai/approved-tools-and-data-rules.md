# Approved Tools and Data Rules

## Phase 1 Approved Tools

These are approved now, under strict data limits:

| Tool | Status | Allowed input now | Notes |
| --- | --- | --- | --- |
| GitHub Copilot and GitHub-native AI features | Approved | Public repo context and sanitized internal prompts | Do not rely on content exclusion as the main control. |
| OpenAI ChatGPT or Codex | Approved for sanitized use | Sanitized, non-sensitive prompts only | No secrets, private logs, or client context. |
| Anthropic Claude | Approved for sanitized use | Sanitized, non-sensitive prompts only | No secrets, private logs, or client context. |

Anything not listed above is unapproved for company engineering use until the CTO adds it to the approved list.

## Phase 2 Approved Tools

Later, the team may expand to business-tier tools with stronger admin controls:

- GitHub Copilot Business or Enterprise
- OpenAI business-tier or API-managed usage
- Anthropic business-tier or API-managed usage

Business-tier approval does not remove the need for prompt hygiene or review. It only expands what can be handled under controlled conditions.

## Current Data Classes

| Class | Examples | Allowed in phase 1 |
| --- | --- | --- |
| Public | README text, public framework docs, non-sensitive snippets | Yes |
| Sanitized internal | Redacted errors, redacted pseudocode, general architecture questions with no secrets or identifiers | Yes |
| Restricted internal | Real tickets, private roadmap details, internal configs, tenant-specific logic with identifiers | No |
| Prohibited | Secrets, keys, `.env` values, raw logs, DB dumps, payment data, incident details, unpublished vulnerabilities | Never |

## Sanitization Rules

Before using an external AI tool:

- remove tenant names, client names, phone numbers, emails, tokens, URLs, IDs, and internal hostnames
- replace production values with placeholders
- trim prompts to the minimum useful excerpt
- avoid sending whole files if a focused snippet is enough

## Explicitly Prohibited Data

Never paste:

- `.env` values
- API keys or private keys
- session tokens or cookies
- raw SQL dumps
- raw production logs
- internal contracts or legal material
- payment details
- unpublished security findings
- screenshots that expose sensitive dashboards or data

## Browser, Agent, and Connector Rules

- No AI browser or coding agent may access production systems.
- No AI browser or coding agent may access cloud consoles, email, or ticketing tools without explicit CTO approval.
- No custom connector, MCP server, or repo indexer may be attached to sensitive data sources until it is reviewed and approved.

## If In Doubt

If you are unsure whether a prompt is safe:

1. stop
2. remove or redact more context
3. ask the CTO or Full Stack Lead before using the tool
