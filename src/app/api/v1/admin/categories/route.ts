import { adminCategorySchema } from "@/lib/contracts/api";
import { accepted, validationProblemResponse } from "@/lib/http/problem";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminCategorySchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  return accepted({
    status: "scaffolded",
    resource: "category",
    message: "Category contract validated. Wire this to campaign-scoped persistence next.",
    draft: parsed.data,
  });
}
