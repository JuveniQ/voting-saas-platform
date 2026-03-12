import { describe, expect, it } from "vitest";
import { createEmailOtpAttempt, readVerificationToken, verifyEmailOtp } from "@/lib/identity/email-otp-store";

describe("email OTP store", () => {
  it("issues and verifies a code for the same email", () => {
    const attempt = createEmailOtpAttempt({
      email: "demo@example.com",
      purpose: "vote",
      tenantSlug: "umuntu",
      campaignId: "ab6f2b1d-1d44-477d-b86f-0fdf818a7fa0",
    });

    const verified = verifyEmailOtp({
      requestId: attempt.requestId,
      email: "demo@example.com",
      otp: attempt.otp,
    });

    expect(verified).not.toBeNull();
    expect(readVerificationToken(verified!.verificationToken)?.tenantSlug).toBe("umuntu");
  });

  it("rejects the wrong OTP", () => {
    const attempt = createEmailOtpAttempt({
      email: "demo2@example.com",
      purpose: "vote",
      tenantSlug: "musicawards",
      campaignId: "452113b1-c7fa-4655-8d3c-b67bd8ec8d65",
    });

    const verified = verifyEmailOtp({
      requestId: attempt.requestId,
      email: "demo2@example.com",
      otp: "000000",
    });

    expect(verified).toBeNull();
  });
});
