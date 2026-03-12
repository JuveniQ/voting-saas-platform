import { randomUUID } from "node:crypto";

export interface VoteCommand {
  tenantSlug: string;
  campaignId: string;
  categoryId: string;
  nomineeId: string;
  nomineeName: string;
  quantity: number;
  idempotencyKey: string;
  verificationToken: string | null;
  fingerprint: string | null;
}

export interface RecordedVote {
  voteAttemptId: string;
  voteLedgerId: string;
  tenantSlug: string;
  campaignId: string;
  categoryId: string;
  nomineeId: string;
  nomineeName: string;
  quantity: number;
  riskDecision: "allow";
  submittedAt: string;
}

const idempotencyIndex = new Map<string, RecordedVote>();

function getIdempotencyScope(command: VoteCommand) {
  return `${command.tenantSlug}:${command.campaignId}:${command.idempotencyKey}`;
}

export function submitVote(command: VoteCommand) {
  const scope = getIdempotencyScope(command);
  const replay = idempotencyIndex.get(scope);

  if (replay) {
    return {
      idempotentReplay: true,
      record: replay,
    };
  }

  const record: RecordedVote = {
    voteAttemptId: randomUUID(),
    voteLedgerId: randomUUID(),
    tenantSlug: command.tenantSlug,
    campaignId: command.campaignId,
    categoryId: command.categoryId,
    nomineeId: command.nomineeId,
    nomineeName: command.nomineeName,
    quantity: command.quantity,
    riskDecision: "allow",
    submittedAt: new Date().toISOString(),
  };

  idempotencyIndex.set(scope, record);

  return {
    idempotentReplay: false,
    record,
  };
}
