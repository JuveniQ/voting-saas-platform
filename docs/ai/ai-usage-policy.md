# AI Usage Policy

## Purpose

AI is allowed in this repo, but only in ways that preserve:

- tenant isolation
- security and privacy
- correctness
- maintainability
- performance
- human accountability

## Default Rules

- AI may assist with planning, debugging, implementation drafts, tests, docs, and review preparation.
- Humans remain accountable for every merged change.
- AI output must be understood before it is accepted.
- AI never bypasses the normal issue, PR, review, and testing process.
- AI code review supplements human review. It does not replace it.

## Allowed Uses

- drafting implementation options from a well-scoped issue
- drafting tests from known behavior
- summarizing docs already inside the repo
- proposing refactors when the constraints are explicit
- reviewing small diffs for clarity, defects, and edge cases
- drafting docs, runbooks, or checklists from approved source material

## Disallowed Uses

- pasting secrets, tokens, `.env` values, API keys, or private keys into any AI tool
- pasting raw production logs, DB exports, or customer data into any AI tool
- letting AI approve its own code or decide whether its output is safe
- using AI to make uncontrolled architectural changes
- asking AI to skip tests, validations, or security checks
- using AI browser or agent tooling against prod or admin consoles without explicit CTO approval
- using unapproved AI tools for company code, tickets, or internal context

## High-Risk Areas

These areas require extra care and human-owned acceptance criteria before AI use:

- auth and access control
- tenant isolation and hostname resolution
- voting integrity and fraud rules
- schema changes and data access logic
- security controls and incident handling
- payment logic

For these areas:

- keep prompts tightly scoped
- include exact source-of-truth files
- do not accept AI-generated changes without targeted human review
- prefer AI for analysis and review support before code generation

## Required Human Controls

Before merge:

- run the normal repo checks
- read and understand the diff
- verify tests are meaningful
- confirm docs were updated if behavior changed
- check for security, performance, and scalability impact
- confirm the output respects existing architecture and conventions

## PR Disclosure Default

For non-trivial AI-assisted work, the PR should state:

- whether AI was used
- what it was used for
- what validation was performed
- that no sensitive data was shared with unapproved tools

## Team Rollout Default

- first 2 weeks: assisted but conservative
- no autonomous agent PRs for auth, tenancy, voting, fraud, or DB schema work
- review AI-use patterns in Friday retros and tighten rules where misuse appears
