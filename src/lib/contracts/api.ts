import { z } from "zod";

export const votePurposeSchema = z.enum(["vote", "admin-signin"]);
export const votingModeSchema = z.enum(["free", "paid", "limited", "hybrid"]);
export const verificationStrategySchema = z.enum(["none", "email_otp", "phone_otp", "account"]);
export const exportFormatSchema = z.enum(["csv", "json", "pdf"]);

export const publicVerificationRequestSchema = z.object({
  email: z.string().email(),
  purpose: votePurposeSchema.default("vote"),
  tenantSlug: z.string().min(2).max(63).optional(),
  campaignId: z.string().uuid().optional(),
  turnstileToken: z.string().min(8).optional(),
});

export const publicVerificationConfirmSchema = z.object({
  requestId: z.string().uuid(),
  email: z.string().email(),
  otp: z.string().length(6),
});

export const publicVoteRequestSchema = z.object({
  campaignId: z.string().uuid(),
  categoryId: z.string().uuid(),
  nomineeId: z.string().uuid(),
  quantity: z.number().int().positive().max(100).default(1),
  idempotencyKey: z.string().min(8).max(128),
  verificationToken: z.string().min(16).optional(),
  fingerprint: z.string().min(8).max(256).optional(),
  context: z.record(z.string(), z.unknown()).optional(),
});

export const adminCampaignSchema = z.object({
  tenantId: z.string().uuid(),
  name: z.string().min(3),
  slug: z.string().min(3).max(120),
  description: z.string().min(10),
  nominationStartsAt: z.string().datetime(),
  nominationEndsAt: z.string().datetime(),
  votingStartsAt: z.string().datetime(),
  votingEndsAt: z.string().datetime(),
  resultsAt: z.string().datetime(),
});

export const adminCategorySchema = z.object({
  campaignId: z.string().uuid(),
  name: z.string().min(3),
  slug: z.string().min(3).max(120),
  description: z.string().min(10),
});

export const adminNomineeSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(2),
  description: z.string().min(10),
  photoUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  socialLinks: z.array(z.string().url()).default([]),
});

export const adminVotingRuleSchema = z.object({
  campaignId: z.string().uuid(),
  mode: votingModeSchema,
  verificationStrategy: verificationStrategySchema,
  shortlistSize: z.number().int().positive().max(20),
  leaderboardHiddenHoursBeforeClose: z.number().int().nonnegative().max(168),
  maxVotesPerDay: z.number().int().positive().optional(),
  maxVotesPerEmail: z.number().int().positive().optional(),
  maxVotesPerPhone: z.number().int().positive().optional(),
  cooldownSeconds: z.number().int().nonnegative().optional(),
});

export const adminExportSchema = z.object({
  tenantId: z.string().uuid(),
  campaignId: z.string().uuid(),
  format: exportFormatSchema,
  includeAuditTrail: z.boolean().default(false),
});
