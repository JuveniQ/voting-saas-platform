import { adminNomineeSchema } from "@/lib/contracts/api";
import { accepted, validationProblemResponse } from "@/lib/http/problem";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminNomineeSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  return accepted({
    status: "scaffolded",
    resource: "nominee",
    message: "Nominee contract validated. Media ingestion and storage bindings are the next integration step.",
    draft: parsed.data,
  });
}
