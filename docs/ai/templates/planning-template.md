# Planning Prompt Template

```text
You are helping plan a change for voting-saas-platform.

Goal:
- [Describe the task]

Source of truth:
- [List the exact files and docs]

Current state:
- [What exists today]

Constraints:
- Use the current architecture and repo conventions
- Do not invent APIs, env vars, or architecture
- Keep tenant isolation, security, and performance intact

Non-goals:
- [List what must not change]

Questions to answer:
- Break the work into clear steps
- Identify risks, edge cases, and dependencies
- Call out any missing acceptance criteria

Required output:
- A short implementation plan
- Key risks
- Test scenarios
```
