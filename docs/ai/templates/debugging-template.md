# Debugging Prompt Template

```text
You are debugging a problem in voting-saas-platform.

Problem:
- [Describe the bug]

Observed behavior:
- [Sanitized symptoms, logs, or screenshots]

Expected behavior:
- [What should happen]

Source of truth:
- [Relevant files and docs]

Constraints:
- Use only sanitized evidence
- Do not guess root cause without connecting it to the code
- Preserve current architecture unless evidence requires change

Required output:
- Likely root causes ranked by probability
- What to inspect first
- Smallest safe fix direction
- Tests or repro steps that should confirm the fix
```
