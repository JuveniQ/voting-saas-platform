import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";

export function middleware(request: NextRequest) {
  const resolved = resolveTenant(request.nextUrl.host);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-resolved-hostname", resolved.hostname);
  requestHeaders.set("x-platform-surface", resolved.surface);

  if (resolved.tenantSlug) {
    requestHeaders.set("x-tenant-slug", resolved.tenantSlug);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
