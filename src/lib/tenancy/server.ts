import { headers } from "next/headers";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";

export async function getTenantContextFromRequest() {
  const headerStore = await headers();
  return resolveTenant(
    headerStore.get("x-resolved-hostname") ?? headerStore.get("host") ?? "localhost:3000",
  );
}
