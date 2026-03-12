import { getPlatformEnv } from "@/lib/env";
import { demoTenants, type DemoTenant } from "@/lib/tenancy/registry";

export type PlatformSurface = "marketing" | "app" | "tenant-portal" | "unknown";
export type TenantPublicStatus = "platform" | "active" | "inactive" | "unknown-host";

export interface ResolvedTenantContext {
  hostname: string;
  surface: PlatformSurface;
  publicStatus: TenantPublicStatus;
  baseDomain: string;
  marketingHost: string;
  appHost: string;
  tenantSlug?: string;
  tenant?: DemoTenant;
  tenantId?: string;
  domainId?: string;
  themeId?: string;
  registry: DemoTenant[];
}

function normalizeHostname(input: string) {
  return input.trim().toLowerCase().replace(/:\d+$/, "");
}

function resolveLocalhost(hostname: string) {
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return { kind: "marketing" as const };
  }

  if (hostname.endsWith(".localhost")) {
    const slug = hostname.slice(0, -".localhost".length);
    return slug ? { kind: "subdomain" as const, slug } : { kind: "marketing" as const };
  }

  return null;
}

export function resolveTenant(hostInput: string): ResolvedTenantContext {
  const env = getPlatformEnv();
  const hostname = normalizeHostname(hostInput);
  const registry = demoTenants;

  if (!hostname || hostname === env.PLATFORM_MARKETING_HOST) {
    return {
      hostname,
      surface: "marketing",
      publicStatus: "platform",
      baseDomain: env.PLATFORM_BASE_DOMAIN,
      marketingHost: env.PLATFORM_MARKETING_HOST,
      appHost: env.PLATFORM_APP_HOST,
      registry,
    };
  }

  if (hostname === env.PLATFORM_APP_HOST) {
    return {
      hostname,
      surface: "app",
      publicStatus: "platform",
      baseDomain: env.PLATFORM_BASE_DOMAIN,
      marketingHost: env.PLATFORM_MARKETING_HOST,
      appHost: env.PLATFORM_APP_HOST,
      registry,
    };
  }

  const localResolution = resolveLocalhost(hostname);
  if (localResolution) {
    if (localResolution.kind === "marketing") {
      return {
        hostname,
        surface: "marketing",
        publicStatus: "platform",
        baseDomain: env.PLATFORM_BASE_DOMAIN,
        marketingHost: env.PLATFORM_MARKETING_HOST,
        appHost: env.PLATFORM_APP_HOST,
        registry,
      };
    }

    if (localResolution.slug === "app") {
      return {
        hostname,
        surface: "app",
        publicStatus: "platform",
        baseDomain: env.PLATFORM_BASE_DOMAIN,
        marketingHost: env.PLATFORM_MARKETING_HOST,
        appHost: env.PLATFORM_APP_HOST,
        registry,
      };
    }

    const tenant = registry.find((item) => item.slug === localResolution.slug);

    if (!tenant) {
      return {
        hostname,
        surface: "unknown",
        publicStatus: "unknown-host",
        baseDomain: env.PLATFORM_BASE_DOMAIN,
        marketingHost: env.PLATFORM_MARKETING_HOST,
        appHost: env.PLATFORM_APP_HOST,
        tenantSlug: localResolution.slug,
        registry,
      };
    }

    return {
      hostname,
      surface: "tenant-portal",
      publicStatus: tenant.publicStatus,
      baseDomain: env.PLATFORM_BASE_DOMAIN,
      marketingHost: env.PLATFORM_MARKETING_HOST,
      appHost: env.PLATFORM_APP_HOST,
      tenantSlug: tenant.slug,
      tenant,
      tenantId: tenant.tenantId,
      domainId: tenant.domainId,
      themeId: tenant.themeId,
      registry,
    };
  }

  const suffix = `.${env.PLATFORM_BASE_DOMAIN}`;
  if (hostname.endsWith(suffix)) {
    const slug = hostname.slice(0, -suffix.length);
    const tenant = registry.find((item) => item.slug === slug);

    if (!tenant) {
      return {
        hostname,
        surface: "unknown",
        publicStatus: "unknown-host",
        baseDomain: env.PLATFORM_BASE_DOMAIN,
        marketingHost: env.PLATFORM_MARKETING_HOST,
        appHost: env.PLATFORM_APP_HOST,
        tenantSlug: slug,
        registry,
      };
    }

    return {
      hostname,
      surface: "tenant-portal",
      publicStatus: tenant.publicStatus,
      baseDomain: env.PLATFORM_BASE_DOMAIN,
      marketingHost: env.PLATFORM_MARKETING_HOST,
      appHost: env.PLATFORM_APP_HOST,
      tenantSlug: tenant.slug,
      tenant,
      tenantId: tenant.tenantId,
      domainId: tenant.domainId,
      themeId: tenant.themeId,
      registry,
    };
  }

  return {
    hostname,
    surface: "unknown",
    publicStatus: "unknown-host",
    baseDomain: env.PLATFORM_BASE_DOMAIN,
    marketingHost: env.PLATFORM_MARKETING_HOST,
    appHost: env.PLATFORM_APP_HOST,
    registry,
  };
}
