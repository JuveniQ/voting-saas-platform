import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {
  exportStatusEnum,
  metadataColumn,
  paymentProviderEnum,
  paymentStatusEnum,
  primaryId,
  riskDecisionEnum,
  timestampColumns,
} from "@/lib/db/schema/shared";
import { campaigns } from "@/lib/db/schema/campaigns";
import { tenants } from "@/lib/db/schema/tenancy";

export const fraudSignals = pgTable(
  "fraud_signals",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    decision: riskDecisionEnum("decision").notNull(),
    signalType: varchar("signal_type", { length: 120 }).notNull(),
    summary: text("summary").notNull(),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    campaignIdx: index("fraud_signals_campaign_idx").on(table.campaignId),
  }),
);

export const auditEvents = pgTable(
  "audit_events",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    actorUserId: text("actor_user_id"),
    actorType: varchar("actor_type", { length: 50 }).notNull(),
    action: varchar("action", { length: 120 }).notNull(),
    entityType: varchar("entity_type", { length: 120 }).notNull(),
    entityId: varchar("entity_id", { length: 255 }).notNull(),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    tenantIdx: index("audit_events_tenant_idx").on(table.tenantId),
  }),
);

export const exportJobs = pgTable(
  "export_jobs",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    requestedByUserId: text("requested_by_user_id"),
    format: varchar("format", { length: 32 }).notNull(),
    status: exportStatusEnum("status").default("queued").notNull(),
    storageKey: varchar("storage_key", { length: 255 }),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    campaignIdx: index("export_jobs_campaign_idx").on(table.campaignId),
  }),
);

export const paymentIntents = pgTable(
  "payment_intents",
  {
    id: primaryId(),
    tenantId: uuid("tenant_id").references(() => tenants.id, { onDelete: "cascade" }).notNull(),
    campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }).notNull(),
    provider: paymentProviderEnum("provider").notNull(),
    status: paymentStatusEnum("status").default("reserved").notNull(),
    externalReference: varchar("external_reference", { length: 255 }),
    amountMinor: text("amount_minor").notNull(),
    currency: varchar("currency", { length: 8 }).notNull(),
    metadata: metadataColumn,
    ...timestampColumns,
  },
  (table) => ({
    campaignIdx: index("payment_intents_campaign_idx").on(table.campaignId),
  }),
);

export const paymentEvents = pgTable(
  "payment_events",
  {
    id: primaryId(),
    paymentIntentId: uuid("payment_intent_id")
      .references(() => paymentIntents.id, { onDelete: "cascade" })
      .notNull(),
    receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow().notNull(),
    payload: metadataColumn,
  },
  (table) => ({
    paymentIntentIdx: index("payment_events_payment_intent_idx").on(table.paymentIntentId),
  }),
);
