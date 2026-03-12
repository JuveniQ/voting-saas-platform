import { adminExportSchema } from "@/lib/contracts/api";
import { accepted, validationProblemResponse } from "@/lib/http/problem";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = adminExportSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  return accepted({
    status: "queued",
    resource: "export-job",
    message: "Export request accepted. Queue-backed export workers are the next implementation step.",
    draft: parsed.data,
  });
}
