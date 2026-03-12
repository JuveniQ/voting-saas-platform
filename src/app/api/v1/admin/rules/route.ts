import { adminVotingRuleSchema } from "@/lib/contracts/api";
import { accepted, validationProblemResponse } from "@/lib/http/problem";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminVotingRuleSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  return accepted({
    status: "scaffolded",
    resource: "voting-rule",
    message: "Voting rule contract validated. Rule persistence and enforcement already have a matching domain shape.",
    draft: parsed.data,
  });
}
