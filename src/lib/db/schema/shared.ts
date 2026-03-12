import { sql } from "drizzle-orm";
import { boolean, integer, jsonb, pgEnum, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const tenantPublicStatusEnum = pgEnum("tenant_public_status", ["active", "inactive"]);
export const tenantMembershipRoleEnum = pgEnum("tenant_membership_role", [
  "platform_owner",
  "client_admin",
  "client_analyst",
]);
export const assetKindEnum = pgEnum("asset_kind", ["image", "video"]);
export const votingModeEnum = pgEnum("voting_mode", ["free", "paid", "limited", "hybrid"]);
export const verificationStrategyEnum = pgEnum("verification_strategy", [
  "none",
  "email_otp",
  "phone_otp",
  "account",
]);
export const identifierTypeEnum = pgEnum("identifier_type", ["email", "phone", "device", "ip", "session"]);
export const otpPurposeEnum = pgEnum("otp_purpose", ["vote", "admin-signin"]);
export const verificationStatusEnum = pgEnum("verification_status", [
  "issued",
  "verified",
  "expired",
  "consumed",
]);
export const voteAttemptStatusEnum = pgEnum("vote_attempt_status", [
  "accepted",
  "blocked",
  "flagged",
  "replayed",
]);
export const riskDecisionEnum = pgEnum("risk_decision", ["allow", "review", "block"]);
export const exportStatusEnum = pgEnum("export_status", ["queued", "processing", "completed", "failed"]);
export const paymentProviderEnum = pgEnum("payment_provider", ["yoco", "paystack", "flutterwave"]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "reserved",
  "pending",
  "authorized",
  "captured",
  "failed",
]);

export function primaryId(name = "id") {
  return uuid(name).defaultRandom().primaryKey();
}

export const timestampColumns = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const metadataColumn = jsonb("metadata")
  .$type<Record<string, unknown>>()
  .default(sql`'{}'::jsonb`)
  .notNull();

export const descriptionColumn = text("description");
export const slugColumn = varchar("slug", { length: 160 }).notNull();
export const nameColumn = varchar("name", { length: 255 }).notNull();
export const publicFlagColumn = boolean("is_public").default(true).notNull();
export const quantityColumn = integer("quantity").default(1).notNull();
