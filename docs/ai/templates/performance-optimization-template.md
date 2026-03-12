# Performance Optimization Prompt Template

```text
You are optimizing a part of voting-saas-platform.

Goal:
- [Describe the slow path or performance target]

Current evidence:
- [Sanitized metrics, traces, or symptoms]

Source of truth:
- [Relevant files]

Constraints:
- Do not trade correctness or security for speed
- Keep mobile and slow-network users in mind
- Prefer measurable improvements over stylistic changes

Required output:
- Likely bottlenecks
- Highest-value fixes first
- Expected tradeoffs
- Tests, benchmarks, or measurements to confirm improvement
```
