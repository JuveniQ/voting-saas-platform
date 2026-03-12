import { adminCampaignSchema } from "@/lib/contracts/api";
import { accepted, validationProblemResponse } from "@/lib/http/problem";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminCampaignSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  return accepted({
    status: "scaffolded",
    resource: "campaign",
    message: "Campaign contract validated. Persist this next through a Drizzle repository and audit trail.",
    draft: parsed.data,
  });
}
