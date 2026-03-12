import { index, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import {
  identifierTypeEnum,
  metadataColumn,
  otpPurposeEnum,
  primaryId,
  quantityColumn,
  riskDecisionEnum,
  timestampColumns,
  verificationStatusEnum,
  verificationStrategyEnum,
  voteAttemptStatusEnum,
  votingModeEnum,
} from "@/lib/db/schema/shared";
import { campaigns, categories, nominees } from "@/lib/db/schema/campaigns";
import { tenants } from "@/lib/db/schema/tenancy";

export const voterProfiles = pgTable(
  "voter_profiles",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    displayName: varchar("display_name", { length: 255 }),
    emailEncrypted: text("email_encrypted"),
    phoneEncrypted: text("phone_encrypted"),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    tenantIdx: index("voter_profiles_tenant_idx").on(table.tenantId),
  }),
);

export const voterIdentifiers = pgTable(
  "voter_identifiers",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    voterProfileId: uuid("voter_profile_id")
      .references(() => voterProfiles.id, { onDelete: "cascade" })
      .notNull(),
    kind: identifierTypeEnum("kind").notNull(),
    normalizedHash: varchar("normalized_hash", { length: 255 }).notNull(),
    ...timestampColumns,
  },
  (table) => ({
    voterHashIdx: uniqueIndex("voter_identifiers_hash_idx").on(
      table.tenantId,
      table.kind,
      table.normalizedHash,
    ),
  }),
);

export const verificationAttempts = pgTable(
  "verification_attempts",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    voterProfileId: uuid("voter_profile_id").references(() => voterProfiles.id, {
      onDelete: "set null",
    }),
    purpose: otpPurposeEnum("purpose").notNull(),
    channel: verificationStrategyEnum("channel").notNull(),
    targetHash: varchar("target_hash", { length: 255 }).notNull(),
    otpHash: text("otp_hash"),
    status: verificationStatusEnum("status").default("issued").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    campaignIdx: index("verification_attempts_campaign_idx").on(table.campaignId),
  }),
);

export const voteAttempts = pgTable(
  "vote_attempts",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    nomineeId: uuid("nominee_id").references(() => nominees.id, { onDelete: "cascade" }).notNull(),
    voterProfileId: uuid("voter_profile_id").references(() => voterProfiles.id, {
      onDelete: "set null",
    }),
    mode: votingModeEnum("mode").notNull(),
    idempotencyKey: varchar("idempotency_key", { length: 128 }).notNull(),
    status: voteAttemptStatusEnum("status").default("accepted").notNull(),
    riskDecision: riskDecisionEnum("risk_decision").default("allow").notNull(),
    quantity: quantityColumn,
    fingerprintHash: varchar("fingerprint_hash", { length: 255 }),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    idempotencyIdx: uniqueIndex("vote_attempts_idempotency_idx").on(
      table.tenantId,
      table.campaignId,
      table.idempotencyKey,
    ),
  }),
);

export const voteLedger = pgTable(
  "vote_ledger",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    nomineeId: uuid("nominee_id").references(() => nominees.id, { onDelete: "cascade" }).notNull(),
    voteAttemptId: uuid("vote_attempt_id").references(() => voteAttempts.id, {
      onDelete: "cascade",
    }),
    quantity: quantityColumn,
    recordedAt: timestamp("recorded_at", { withTimezone: true }).defaultNow().notNull(),
    metadata: metadataColumn,
  },
  (table) => ({
    campaignIdx: index("vote_ledger_campaign_idx").on(table.campaignId),
    nomineeIdx: index("vote_ledger_nominee_idx").on(table.nomineeId),
  }),
);

export const voteAggregates = pgTable(
  "vote_aggregates",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    nomineeId: uuid("nominee_id").references(() => nominees.id, { onDelete: "cascade" }).notNull(),
    bucketStart: timestamp("bucket_start", { withTimezone: true }).notNull(),
    quantity: quantityColumn,
    ...timestampColumns,
  },
  (table) => ({
    bucketIdx: uniqueIndex("vote_aggregates_bucket_idx").on(
      table.tenantId,
      table.campaignId,
      table.categoryId,
      table.nomineeId,
      table.bucketStart,
    ),
  }),
);
