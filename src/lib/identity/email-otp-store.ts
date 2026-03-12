import { createHash, randomInt, randomUUID } from "node:crypto";

type OtpPurpose = "vote" | "admin-signin";

interface OtpAttempt {
  requestId: string;
  email: string;
  purpose: OtpPurpose;
  tenantSlug: string;
  campaignId: string;
  otp: string;
  expiresAt: string;
}

interface VerificationTokenRecord {
  token: string;
  emailHash: string;
  tenantSlug: string;
  campaignId: string;
  expiresAt: string;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const TOKEN_TTL_MS = 30 * 60 * 1000;
const attempts = new Map<string, OtpAttempt>();
const verificationTokens = new Map<string, VerificationTokenRecord>();

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function cleanupExpiredEntries() {
  const now = Date.now();

  for (const [requestId, attempt] of attempts.entries()) {
    if (new Date(attempt.expiresAt).getTime() <= now) {
      attempts.delete(requestId);
    }
  }

  for (const [token, record] of verificationTokens.entries()) {
    if (new Date(record.expiresAt).getTime() <= now) {
      verificationTokens.delete(token);
    }
  }
}

export function createEmailOtpAttempt(input: {
  email: string;
  purpose: OtpPurpose;
  tenantSlug: string;
  campaignId: string;
}) {
  cleanupExpiredEntries();
  const otp = randomInt(100000, 999999).toString();
  const requestId = randomUUID();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();
  const attempt: OtpAttempt = {
    requestId,
    email: input.email.toLowerCase(),
    purpose: input.purpose,
    tenantSlug: input.tenantSlug,
    campaignId: input.campaignId,
    otp,
    expiresAt,
  };

  attempts.set(requestId, attempt);
  return attempt;
}

export function verifyEmailOtp(input: { requestId: string; email: string; otp: string }) {
  cleanupExpiredEntries();
  const attempt = attempts.get(input.requestId);

  if (!attempt) {
    return null;
  }

  const normalizedEmail = input.email.toLowerCase();
  if (attempt.email !== normalizedEmail || attempt.otp !== input.otp) {
    return null;
  }

  attempts.delete(input.requestId);

  const verificationToken = randomUUID().replaceAll("-", "");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();
  verificationTokens.set(verificationToken, {
    token: verificationToken,
    emailHash: hashValue(normalizedEmail),
    tenantSlug: attempt.tenantSlug,
    campaignId: attempt.campaignId,
    expiresAt,
  });

  return {
    verificationToken,
    tenantSlug: attempt.tenantSlug,
    campaignId: attempt.campaignId,
    expiresAt,
  };
}

export function readVerificationToken(token: string) {
  cleanupExpiredEntries();
  return verificationTokens.get(token) ?? null;
}
