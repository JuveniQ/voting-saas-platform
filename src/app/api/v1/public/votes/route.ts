import { publicVoteRequestSchema } from "@/lib/contracts/api";
import { readVerificationToken } from "@/lib/identity/email-otp-store";
import { accepted, problemResponse, validationProblemResponse } from "@/lib/http/problem";
import { resolveTenant } from "@/lib/tenancy/resolve-tenant";
import { submitVote } from "@/lib/voting/in-memory-vote-ledger";
import { validateVoteQuantity } from "@/lib/voting/vote-policy";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = publicVoteRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return validationProblemResponse(parsed.error);
  }

  const resolved = resolveTenant(new URL(request.url).host);

  if (!resolved.tenant || resolved.publicStatus !== "active") {
    return problemResponse(404, {
      title: "Tenant portal not available",
      detail: "Votes can only be submitted from an active tenant voting portal.",
      type: "/problems/tenant-not-active",
    });
  }

  const campaign = resolved.tenant.activeCampaign;

  if (parsed.data.campaignId !== campaign.id) {
    return problemResponse(400, {
      title: "Campaign mismatch",
      detail: "The supplied campaign ID does not match the active campaign for this tenant.",
      type: "/problems/campaign-mismatch",
    });
  }

  const category = campaign.categories.find((item) => item.id === parsed.data.categoryId);
  const nominee = category?.nominees.find((item) => item.id === parsed.data.nomineeId);

  if (!category || !nominee) {
    return problemResponse(404, {
      title: "Nominee not found",
      detail: "The selected category or nominee is not available in the active campaign.",
      type: "/problems/nominee-not-found",
    });
  }

  const quantityError = validateVoteQuantity(campaign.votingRule, parsed.data.quantity);
  if (quantityError) {
    return problemResponse(400, {
      title: "Invalid vote quantity",
      detail: quantityError,
      type: "/problems/invalid-vote-quantity",
    });
  }

  if (campaign.votingRule.verificationStrategy === "email_otp") {
    if (!parsed.data.verificationToken) {
      return problemResponse(401, {
        title: "Verification required",
        detail: "This campaign requires a valid email OTP verification token before voting.",
        type: "/problems/missing-verification-token",
      });
    }

    const verification = readVerificationToken(parsed.data.verificationToken);
    if (!verification || verification.tenantSlug !== resolved.tenant.slug || verification.campaignId !== campaign.id) {
      return problemResponse(401, {
        title: "Invalid verification token",
        detail: "The provided verification token is invalid, expired, or belongs to another tenant/campaign.",
        type: "/problems/invalid-verification-token",
      });
    }
  }

  const result = submitVote({
    tenantSlug: resolved.tenant.slug,
    campaignId: campaign.id,
    categoryId: category.id,
    nomineeId: nominee.id,
    nomineeName: nominee.name,
    quantity: parsed.data.quantity,
    idempotencyKey: parsed.data.idempotencyKey,
    verificationToken: parsed.data.verificationToken ?? null,
    fingerprint: parsed.data.fingerprint ?? null,
  });

  return accepted({
    status: "accepted",
    idempotentReplay: result.idempotentReplay,
    voteAttemptId: result.record.voteAttemptId,
    voteLedgerId: result.record.voteLedgerId,
    riskDecision: result.record.riskDecision,
    submittedAt: result.record.submittedAt,
    nominee: nominee.name,
  });
}
