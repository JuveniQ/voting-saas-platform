import { describe, expect, it } from "vitest";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";

describe("resolveTenant", () => {
  it("treats the platform host as marketing", () => {
    const resolved = resolveTenant("voting.company.com");

    expect(resolved.surface).toBe("marketing");
    expect(resolved.publicStatus).toBe("platform");
  });

  it("treats the admin host as the app surface", () => {
    const resolved = resolveTenant("app.voting.company.com");

    expect(resolved.surface).toBe("app");
    expect(resolved.publicStatus).toBe("platform");
  });

  it("resolves seeded tenant subdomains", () => {
    const resolved = resolveTenant("communitychoice.voting.company.com");

    expect(resolved.surface).toBe("tenant-portal");
    expect(resolved.tenantSlug).toBe("communitychoice");
    expect(resolved.tenant?.name).toBe("Community Choice Awards");
  });

  it("supports subdomains on localhost for local tenant previewing", () => {
    const resolved = resolveTenant("musicawards.localhost:3000");

    expect(resolved.surface).toBe("tenant-portal");
    expect(resolved.tenantSlug).toBe("musicawards");
  });

  it("marks unknown subdomains as unknown hosts", () => {
    const resolved = resolveTenant("unknown.voting.company.com");

    expect(resolved.surface).toBe("unknown");
    expect(resolved.publicStatus).toBe("unknown-host");
  });
});
