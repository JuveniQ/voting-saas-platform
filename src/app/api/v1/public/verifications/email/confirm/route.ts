import { publicVerificationConfirmSchema } from "@/lib/contracts/api";
import { verifyEmailOtp } from "@/lib/identity/email-otp-store";
import { ok, problemResponse, validationProblemResponse } from "@/lib/http/problem";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = publicVerificationConfirmSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  const verified = verifyEmailOtp(parsed.data);

  if (!verified) {
    return problemResponse(400, {
      title: "Invalid verification code",
      detail: "The provided request ID, email, and OTP combination is invalid or has expired.",
      type: "/problems/invalid-otp",
    });
  }

  return ok({
    status: "verified",
    verificationToken: verified.verificationToken,
    tenantSlug: verified.tenantSlug,
    campaignId: verified.campaignId,
    expiresAt: verified.expiresAt,
  });
}
