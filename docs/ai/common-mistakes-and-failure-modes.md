# Common Mistakes and Failure Modes

## 1. Vague prompts

Mistake:

- asking for a feature or fix without clear scope, files, constraints, or acceptance criteria

Why it hurts:

- AI fills in gaps with guesses
- architectural drift becomes more likely

Safer pattern:

- provide the issue goal, exact files, non-goals, and tests to keep green

## 2. Overtrusting output

Mistake:

- accepting generated code because it looks polished

Why it hurts:

- AI can generate insecure, incorrect, or unnecessary code confidently

Safer pattern:

- treat AI output like untrusted input and review it line by line

## 3. Pasting sensitive context

Mistake:

- copying private logs, secrets, or tenant-specific details into consumer tools

Why it hurts:

- this creates privacy, security, and contractual risk

Safer pattern:

- sanitize, redact, and minimize every prompt

## 4. Missing tests and docs

Mistake:

- accepting AI-generated code without matching tests or docs

Why it hurts:

- regressions become harder to detect and maintain

Safer pattern:

- require tests, docs updates, and issue-linked acceptance checks

## 5. Letting AI make architecture decisions from thin context

Mistake:

- asking AI to redesign systems without clear boundaries or source-of-truth references

Why it hurts:

- the result often conflicts with current architecture, tradeoffs, or roadmap

Safer pattern:

- use AI to compare options, not to silently set direction

## 6. Ignoring prompt injection risk

Mistake:

- trusting unreviewed issue text, pasted docs, or code comments as safe instructions

Why it hurts:

- malicious or accidental prompt content can steer the model away from the real task

Safer pattern:

- treat external or untrusted content as data, not instructions

## 7. Granting too much tool access

Mistake:

- letting an AI tool browse broadly, call external systems, or make multi-step changes without limits

Why it hurts:

- the blast radius becomes too large

Safer pattern:

- use least privilege and keep agent workflows narrow

## 8. Using stale chat context

Mistake:

- continuing a long AI chat after the task or assumptions changed

Why it hurts:

- earlier wrong assumptions pollute later output

Safer pattern:

- reset the conversation when the task changes materially

## 9. Ignoring licensing or similarity concerns

Mistake:

- copying generated code or large snippets without checking origin or fit

Why it hurts:

- this can create legal and maintenance risk

Safer pattern:

- prefer small, explainable output and rewrite anything you do not fully understand

## 10. Letting AI skip security and performance thinking

Mistake:

- asking only for "working code"

Why it hurts:

- the result may work functionally but fail under real load or threat conditions

Safer pattern:

- require security, performance, and scalability checks in every serious prompt
