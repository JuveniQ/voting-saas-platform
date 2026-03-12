import { AppSurfaceHome } from "@/components/surfaces/app-home";
import { PlatformSurfaceHome } from "@/components/surfaces/platform-home";
import { TenantSurfaceHome } from "@/components/surfaces/tenant-home";
import { getTenantContextFromRequest } from "@/lib/tenancy/server";

export default async function Home() {
  const resolved = await getTenantContextFromRequest();

  if (resolved.surface === "app") {
    return <AppSurfaceHome />;
  }

  if (resolved.surface === "tenant-portal" && resolved.tenant) {
    return <TenantSurfaceHome context={resolved} tenant={resolved.tenant} />;
  }

  return <PlatformSurfaceHome context={resolved} />;
}
