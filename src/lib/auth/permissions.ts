export const platformRoles = ["platform_owner"] as const;
export const tenantRoles = ["client_admin", "client_analyst"] as const;

export type PlatformRole = (typeof platformRoles)[number];
export type TenantRole = (typeof tenantRoles)[number];

export function isPlatformRole(role: string): role is PlatformRole {
  return (platformRoles as readonly string[]).includes(role);
}

export function isTenantRole(role: string): role is TenantRole {
  return (tenantRoles as readonly string[]).includes(role);
}
