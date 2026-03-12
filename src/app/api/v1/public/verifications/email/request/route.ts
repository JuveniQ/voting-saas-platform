import { publicVerificationRequestSchema } from "@/lib/contracts/api";
import { createEmailOtpAttempt } from "@/lib/identity/email-otp-store";
import { accepted, problemResponse, validationProblemResponse } from "@/lib/http/problem";
import { getNotificationProvider } from "@/lib/notifications/provider";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = publicVerificationRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  const resolved = resolveTenant(new URL(request.url).host);
  const tenant = parsed.data.tenantSlug
    ? resolved.registry.find((item) => item.slug === parsed.data.tenantSlug)
    : resolved.tenant;

  if (!tenant) {
    return problemResponse(404, {
      title: "Tenant not found",
      detail: "The email OTP request could not be matched to an active tenant portal.",
      type: "/problems/tenant-not-found",
    });
  }

  const attempt = createEmailOtpAttempt({
    email: parsed.data.email,
    purpose: parsed.data.purpose,
    tenantSlug: tenant.slug,
    campaignId: parsed.data.campaignId ?? tenant.activeCampaign.id,
  });

  const notificationProvider = getNotificationProvider();
  await notificationProvider.sendVotingOtp({
    email: parsed.data.email,
    otp: attempt.otp,
    tenantName: tenant.name,
    campaignName: tenant.activeCampaign.name,
    expiresInMinutes: 10,
  });

  return accepted({
    requestId: attempt.requestId,
    status: "queued",
    channel: "email_otp",
    provider: notificationProvider.kind,
    tenantSlug: tenant.slug,
    campaignId: attempt.campaignId,
    expiresAt: attempt.expiresAt,
    debugCode: process.env.NODE_ENV === "production" ? undefined : attempt.otp,
  });
}
