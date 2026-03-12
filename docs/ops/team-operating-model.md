# Team Operating Model

## Purpose

- run `voting-saas-platform` as one product squad with one backlog, one repo, one design workspace, and one release path
- keep decisions visible, ownership clear, and quality consistent without paid tooling

## Core Tools

- `WhatsApp Community` for fast coordination and daily standups
- `GitHub Free` for issues, project tracking, code review, docs, and the permanent record
- `Penpot` for design, flows, component states, and handoff
- `Google Meet` for scheduled planning, syncs, demos, and retros

## Role Ownership

| Role | Primary focus | Final decisions |
| --- | --- | --- |
| CEO / Product Owner | priorities, scope, client input, acceptance | what ships and why |
| CTO | architecture, security, infrastructure, release readiness | how high-risk work is solved |
| Full Stack Lead | issue slicing, implementation flow, domain delivery | day-to-day engineering execution |
| UI/UX Frontend Lead | design system, flows, frontend quality, accessibility | UX consistency and UI readiness |

## Team Rules

- `WhatsApp` is for coordination; `GitHub` is the permanent record
- no final scope or technical decision may live only in chat
- every issue has exactly one owner
- each person carries only one major in-progress item at a time
- blocked for more than one business day means `Blocked` in GitHub plus a WhatsApp note
- the CEO can code, but should stay off the critical path unless the CTO rebalances the sprint

## Delivery Model

- use one-week iterations
- keep `main` releasable at all times
- use short-lived branches and reviewable PRs
- split anything larger than `L` before implementation
- treat docs, designs, and API contracts as part of the product, not side work
