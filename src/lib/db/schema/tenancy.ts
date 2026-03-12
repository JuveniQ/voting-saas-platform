import { index, pgTable, text, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import {
  metadataColumn,
  nameColumn,
  primaryId,
  publicFlagColumn,
  slugColumn,
  tenantMembershipRoleEnum,
  tenantPublicStatusEnum,
  timestampColumns,
} from "@/lib/db/schema/shared";

export const tenants = pgTable(
  "tenants",
  {
    id: primaryId(),
    slug: slugColumn,
    name: nameColumn,
    tagline: text("tagline"),
    publicStatus: tenantPublicStatusEnum("public_status").default("active").notNull(),
    isArchived: publicFlagColumn,
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    slugIdx: uniqueIndex("tenants_slug_idx").on(table.slug),
  }),
);

export const tenantDomains = pgTable(
  "tenant_domains",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    host: varchar("host", { length: 255 }).notNull(),
    isPrimary: publicFlagColumn,
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    hostIdx: uniqueIndex("tenant_domains_host_idx").on(table.host),
    tenantIdx: index("tenant_domains_tenant_idx").on(table.tenantId),
  }),
);

export const brandThemes = pgTable(
  "brand_themes",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    name: nameColumn,
    tokens: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    tenantIdx: index("brand_themes_tenant_idx").on(table.tenantId),
  }),
);

export const tenantMembers = pgTable(
  "tenant_members",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    userId: text("user_id").notNull(),
    role: tenantMembershipRoleEnum("role").notNull(),
    ...timestampColumns,
  },
  (table) => ({
    tenantUserIdx: uniqueIndex("tenant_members_tenant_user_idx").on(table.tenantId, table.userId),
  }),
);
