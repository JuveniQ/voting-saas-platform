import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import {
  assetKindEnum,
  descriptionColumn,
  metadataColumn,
  nameColumn,
  primaryId,
  publicFlagColumn,
  slugColumn,
  timestampColumns,
  verificationStrategyEnum,
  votingModeEnum,
} from "@/lib/db/schema/shared";
import { tenants } from "@/lib/db/schema/tenancy";

export const campaigns = pgTable(
  "campaigns",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    slug: slugColumn,
    name: nameColumn,
    description: descriptionColumn,
    heroImageUrl: text("hero_image_url"),
    isPrimary: publicFlagColumn,
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    slugIdx: uniqueIndex("campaigns_tenant_slug_idx").on(table.tenantId, table.slug),
    tenantIdx: index("campaigns_tenant_idx").on(table.tenantId),
  }),
);

export const campaignPhaseRules = pgTable(
  "campaign_phase_rules",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    nominationStartsAt: timestamp("nomination_starts_at", { withTimezone: true }).notNull(),
    nominationEndsAt: timestamp("nomination_ends_at", { withTimezone: true }).notNull(),
    votingStartsAt: timestamp("voting_starts_at", { withTimezone: true }).notNull(),
    votingEndsAt: timestamp("voting_ends_at", { withTimezone: true }).notNull(),
    resultsAt: timestamp("results_at", { withTimezone: true }).notNull(),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    campaignIdx: uniqueIndex("campaign_phase_rules_campaign_idx").on(table.campaignId),
    tenantIdx: index("campaign_phase_rules_tenant_idx").on(table.tenantId),
  }),
);

export const categories = pgTable(
  "categories",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    slug: slugColumn,
    name: nameColumn,
    description: descriptionColumn,
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestampColumns,
  },
  (table) => ({
    slugIdx: uniqueIndex("categories_campaign_slug_idx").on(table.campaignId, table.slug),
    campaignIdx: index("categories_campaign_idx").on(table.campaignId),
  }),
);

export const nominees = pgTable(
  "nominees",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    slug: slugColumn,
    name: nameColumn,
    description: descriptionColumn,
    shortBio: text("short_bio"),
    socialLinks: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    slugIdx: uniqueIndex("nominees_category_slug_idx").on(table.categoryId, table.slug),
    categoryIdx: index("nominees_category_idx").on(table.categoryId),
  }),
);

export const nomineeAssets = pgTable(
  "nominee_assets",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    nomineeId: uuid("nominee_id").references(() => nominees.id, { onDelete: "cascade" }).notNull(),
    kind: assetKindEnum("kind").notNull(),
    storageKey: varchar("storage_key", { length: 255 }),
    externalUrl: text("external_url"),
    altText: text("alt_text"),
    ...timestampColumns,
  },
  (table) => ({
    nomineeIdx: index("nominee_assets_nominee_idx").on(table.nomineeId),
  }),
);

export const votingRules = pgTable(
  "voting_rules",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    mode: votingModeEnum("mode").notNull(),
    verificationStrategy: verificationStrategyEnum("verification_strategy").notNull(),
    shortlistSize: integer("shortlist_size").default(4).notNull(),
    leaderboardHiddenHoursBeforeClose: integer("leaderboard_hidden_hours_before_close")
      .default(24)
      .notNull(),
    maxVotesPerDay: integer("max_votes_per_day"),
    maxVotesPerEmail: integer("max_votes_per_email"),
    maxVotesPerPhone: integer("max_votes_per_phone"),
    cooldownSeconds: integer("cooldown_seconds"),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    campaignIdx: uniqueIndex("voting_rules_campaign_idx").on(table.campaignId),
  }),
);
