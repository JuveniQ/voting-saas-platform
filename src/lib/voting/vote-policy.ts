export type VotingMode = "free" | "paid" | "limited" | "hybrid";
export type VerificationStrategy = "none" | "email_otp" | "phone_otp" | "account";

export interface VotingRuleSet {
  mode: VotingMode;
  verificationStrategy: VerificationStrategy;
  shortlistSize: number;
  leaderboardHiddenHoursBeforeClose: number;
  maxVotesPerDay?: number;
  maxVotesPerEmail?: number;
  maxVotesPerPhone?: number;
}

export function validateVoteQuantity(rule: VotingRuleSet, quantity: number) {
  if (quantity < 1) {
    return "A vote request must contain at least one vote.";
  }

  if (rule.mode === "limited" && quantity > 1) {
    return "Limited voting campaigns only allow one vote per request.";
  }

  return null;
}
