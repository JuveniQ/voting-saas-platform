export type CampaignPhase =
  | "pre_nomination"
  | "nomination"
  | "processing"
  | "voting"
  | "results";

export interface CampaignPhaseWindow {
  nominationStartsAt: string;
  nominationEndsAt: string;
  votingStartsAt: string;
  votingEndsAt: string;
  resultsAt: string;
}

function parseDate(value: string) {
  return new Date(value);
}

export function resolveCampaignPhase(now: Date, window: CampaignPhaseWindow): CampaignPhase {
  const nominationStartsAt = parseDate(window.nominationStartsAt);
  const nominationEndsAt = parseDate(window.nominationEndsAt);
  const votingStartsAt = parseDate(window.votingStartsAt);
  const votingEndsAt = parseDate(window.votingEndsAt);
  const resultsAt = parseDate(window.resultsAt);

  if (now < nominationStartsAt) {
    return "pre_nomination";
  }

  if (now >= nominationStartsAt && now <= nominationEndsAt) {
    return "nomination";
  }

  if (now > nominationEndsAt && now < votingStartsAt) {
    return "processing";
  }

  if (now >= votingStartsAt && now <= votingEndsAt) {
    return "voting";
  }

  if (now < resultsAt) {
    return "processing";
  }

  return "results";
}

export function isLeaderboardVisible(
  now: Date,
  window: CampaignPhaseWindow,
  hiddenHoursBeforeClose: number,
) {
  const phase = resolveCampaignPhase(now, window);
  if (phase !== "voting") {
    return false;
  }

  const hiddenAt = new Date(
    parseDate(window.votingEndsAt).getTime() - hiddenHoursBeforeClose * 60 * 60 * 1000,
  );
  return now < hiddenAt;
}
