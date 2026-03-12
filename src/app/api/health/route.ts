import { ok } from "@/lib/http/problem";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";

export async function GET(request: Request) {
  const resolved = resolveTenant(new URL(request.url).host);

  return ok({
    ok: true,
    service: "voting-saas-platform",
    surface: resolved.surface,
    hostname: resolved.hostname,
    tenantSlug: resolved.tenantSlug ?? null,
    time: new Date().toISOString(),
  });
}
