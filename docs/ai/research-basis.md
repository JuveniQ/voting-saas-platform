# Research Basis

This AI governance pack is grounded in current guidance from platform vendors, security guidance, and public research.

## Human Review and Validation

- GitHub Copilot best practices: human review, testing, and validation remain essential
- GitHub AI code review guidance: AI review can help, but it does not replace human review

## Repo and Tool Instructions

- GitHub supports repo-wide and path-specific custom instructions for Copilot and related workflows
- GitHub documents limits around content exclusion and advises against treating it as a complete protection layer

## Privacy and Data Use

- OpenAI documents that business and API data is not used for training by default
- Anthropic documents that enterprise data is not used for training by default and that zero-data-retention applies only to eligible commercial API arrangements

## Prompting Quality

- OpenAI prompt guidance favors clear tasks, constraints, examples, and explicit output expectations
- Anthropic prompt guidance favors structured prompts, clear instructions, and example-driven context

## Security Risks

- OWASP highlights prompt injection, sensitive data disclosure, excessive agency, and overreliance as major LLM risks
- OpenAI prompt-injection guidance recommends layered defenses and limiting the impact of compromised instructions
- NIST and NCSC both emphasize governance, measurement, and secure-by-default practices for AI systems

## Code Generation Risk

- public research has repeatedly shown that AI-assisted code generation can produce insecure code when used without strong human verification

## Source Links

- GitHub Copilot best practices: https://docs.github.com/en/copilot/get-started/best-practices
- GitHub responsible use for code review: https://docs.github.com/en/copilot/responsible-use/code-review
- GitHub repository and path instructions: https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions
- GitHub content exclusion: https://docs.github.com/en/copilot/concepts/context/content-exclusion
- GitHub content exclusion limits: https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
- OpenAI enterprise privacy: https://openai.com/enterprise-privacy/
- OpenAI prompt best practices: https://help.openai.com/en/articles/6654000-best-practices-for-writing-prompts
- Anthropic prompt best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Anthropic enterprise: https://claude.com/pricing/enterprise
- Anthropic zero-data-retention note: https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to
- OWASP LLM Top 10: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- OWASP prompt injection prevention cheat sheet: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
- OpenAI prompt-injection guidance: https://openai.com/safety/prompt-injections/
- OpenAI agent prompt-injection guidance: https://openai.com/index/designing-agents-to-resist-prompt-injection/
- NIST AI RMF GenAI profile: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- NIST AI RMF playbook: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook
- NCSC secure AI system development: https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development
- Research paper on insecure code generation risk: https://arxiv.org/abs/2108.09293
