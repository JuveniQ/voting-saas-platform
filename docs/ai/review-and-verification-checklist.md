# Review and Verification Checklist

## Before You Prompt

- [ ] I know the exact goal of the task
- [ ] I identified the source-of-truth files or docs
- [ ] I removed secrets, tenant identifiers, customer data, and production details
- [ ] I know whether the task is green, yellow, or red in the risk matrix
- [ ] I included constraints, non-goals, and acceptance criteria

## Before You Accept AI Output

- [ ] I understand the output and could explain it to a teammate
- [ ] The output fits the existing architecture instead of inventing a new one
- [ ] The output does not add unexplained dependencies, env vars, or APIs
- [ ] The output does not weaken validation, auth, tenancy, or logging
- [ ] The output is scoped to the issue instead of broadening the change

## Before You Merge AI-Assisted Code

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] Tests meaningfully cover the changed behavior
- [ ] Docs were updated where relevant
- [ ] Reviewers can see what AI was used for and how the result was checked

## Extra Checks for High-Risk Changes

Apply these for auth, tenancy, voting, fraud, schema, payments, and security-sensitive changes:

- [ ] Human-written acceptance criteria existed before AI use
- [ ] Sensitive files and data were not pasted into external tools
- [ ] The change preserves tenant isolation and security invariants
- [ ] Performance impact was considered
- [ ] Failure modes and edge cases were reviewed manually

## If Something Feels Off

- stop using the generated output
- narrow the scope
- start a fresh prompt
- escalate to the CTO or Full Stack Lead
