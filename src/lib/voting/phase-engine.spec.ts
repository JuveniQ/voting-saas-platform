import { describe, expect, it } from "vitest";
import { isLeaderboardVisible, resolveCampaignPhase } from "@/lib/voting/phase-engine";

const window = {
  nominationStartsAt: "2026-04-01T00:00:00.000Z",
  nominationEndsAt: "2026-04-10T23:59:59.000Z",
  votingStartsAt: "2026-04-15T00:00:00.000Z",
  votingEndsAt: "2026-04-30T23:59:59.000Z",
  resultsAt: "2026-05-02T12:00:00.000Z",
};

describe("resolveCampaignPhase", () => {
  it("returns pre_nomination before nomination starts", () => {
    expect(resolveCampaignPhase(new Date("2026-03-31T12:00:00.000Z"), window)).toBe("pre_nomination");
  });

  it("returns nomination during the nomination window", () => {
    expect(resolveCampaignPhase(new Date("2026-04-03T12:00:00.000Z"), window)).toBe("nomination");
  });

  it("returns processing between nomination and voting", () => {
    expect(resolveCampaignPhase(new Date("2026-04-12T12:00:00.000Z"), window)).toBe("processing");
  });

  it("returns voting during the voting window", () => {
    expect(resolveCampaignPhase(new Date("2026-04-20T12:00:00.000Z"), window)).toBe("voting");
  });

  it("returns results after the results release time", () => {
    expect(resolveCampaignPhase(new Date("2026-05-03T12:00:00.000Z"), window)).toBe("results");
  });
});

describe("isLeaderboardVisible", () => {
  it("hides the leaderboard inside the suspense window", () => {
    expect(isLeaderboardVisible(new Date("2026-04-30T10:00:00.000Z"), window, 24)).toBe(false);
  });

  it("shows the leaderboard earlier in voting", () => {
    expect(isLeaderboardVisible(new Date("2026-04-20T12:00:00.000Z"), window, 24)).toBe(true);
  });
});
