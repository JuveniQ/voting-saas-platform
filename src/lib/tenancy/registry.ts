import { platformTheme, type TenantThemeTokens } from "@/lib/branding/theme";
import type { CampaignPhaseWindow } from "@/lib/voting/phase-engine";
import type { VotingRuleSet } from "@/lib/voting/vote-policy";

export interface DemoNominee {
  id: string;
  name: string;
}

export interface DemoCategory {
  id: string;
  name: string;
  description: string;
  nominees: DemoNominee[];
}

export interface DemoCampaign {
  id: string;
  name: string;
  phaseWindow: CampaignPhaseWindow;
  votingRule: VotingRuleSet;
  categories: DemoCategory[];
}

export interface DemoTenant {
  tenantId: string;
  domainId: string;
  themeId: string;
  slug: string;
  name: string;
  tagline: string;
  publicStatus: "active" | "inactive";
  theme: TenantThemeTokens;
  activeCampaign: DemoCampaign;
}

export const demoTenants: DemoTenant[] = [
  {
    tenantId: "0c7a6f7c-540f-4d49-8bdf-12612cb69410",
    domainId: "61ae39b2-04b7-4e05-af47-510a14ab42ba",
    themeId: "67665cf7-00eb-4f31-886d-8dd7fb224d73",
    slug: "communitychoice",
    name: "Community Choice Awards",
    tagline: "Celebrating community excellence with a premium black-and-gold identity.",
    publicStatus: "active",
    theme: {
      ...platformTheme,
      heroTo: "#69411c",
      accent: "#d6b176",
    },
    activeCampaign: {
      id: "ab6f2b1d-1d44-477d-b86f-0fdf818a7fa0",
      name: "Community Choice Awards 2026",
      phaseWindow: {
        nominationStartsAt: "2026-04-01T00:00:00.000Z",
        nominationEndsAt: "2026-04-12T23:59:59.000Z",
        votingStartsAt: "2026-04-18T00:00:00.000Z",
        votingEndsAt: "2026-05-10T23:59:59.000Z",
        resultsAt: "2026-05-11T12:00:00.000Z",
      },
      votingRule: {
        mode: "hybrid",
        verificationStrategy: "email_otp",
        shortlistSize: 4,
        leaderboardHiddenHoursBeforeClose: 24,
        maxVotesPerDay: 1,
      },
      categories: [
        {
          id: "4798827f-1c7d-413d-9c2f-d4877437d5f2",
          name: "Best Community Builder",
          description: "Recognition for leaders creating lasting local impact.",
          nominees: [
            { id: "3b79e48a-db1e-4607-8af1-6411ba7b35fd", name: "Ndlunkulu Nene" },
            { id: "4c68d299-247c-44b6-b359-d7f6dbe04a4f", name: "Simelane Hlengiwe" },
            { id: "13df84ef-18d0-4471-952a-bb69b1f55553", name: "Mawela Vusi" },
          ],
        },
        {
          id: "a2bd9cc7-5364-4350-9dea-1af63654f1ef",
          name: "Best Social Media Influencer",
          description: "Honoring digital creators shaping culture and community attention.",
          nominees: [
            { id: "20d2331f-3579-4b80-bf50-7c85d5efc598", name: "Malume Wabashana" },
            { id: "77a4778b-f3bf-491c-84ec-16e1b2713614", name: "Siyanda" },
            { id: "42f1e613-71b5-4475-8f85-6a63ad11756c", name: "Asinate Mlonyeni" },
          ],
        },
      ],
    },
  },
  {
    tenantId: "27ea2a7f-c51b-42bf-b710-2edc44ce6b3f",
    domainId: "6fdabb3c-c5a6-4d3d-8314-759d24e8fd11",
    themeId: "9f272bd0-f729-455b-ad14-a32728f87003",
    slug: "musicawards",
    name: "Music Awards Africa",
    tagline: "A brighter entertainment identity proving the theming model is tenant-driven.",
    publicStatus: "active",
    theme: {
      background: "#0e1b17",
      foreground: "#f4f9f7",
      card: "rgba(14, 27, 23, 0.9)",
      cardForeground: "#f4f9f7",
      muted: "rgba(7, 16, 13, 0.76)",
      mutedForeground: "#a8c6bb",
      border: "rgba(168, 198, 187, 0.18)",
      accent: "#44d39d",
      accentForeground: "#0e1b17",
      heroFrom: "#0e1b17",
      heroTo: "#157f5f",
      fontDisplay: "\"Merriweather\", Georgia, serif",
      fontBody: "\"Inter\", \"Segoe UI\", sans-serif",
    },
    activeCampaign: {
      id: "452113b1-c7fa-4655-8d3c-b67bd8ec8d65",
      name: "Music Awards 2026",
      phaseWindow: {
        nominationStartsAt: "2026-06-01T00:00:00.000Z",
        nominationEndsAt: "2026-06-14T23:59:59.000Z",
        votingStartsAt: "2026-06-20T00:00:00.000Z",
        votingEndsAt: "2026-07-05T23:59:59.000Z",
        resultsAt: "2026-07-06T10:00:00.000Z",
      },
      votingRule: {
        mode: "free",
        verificationStrategy: "email_otp",
        shortlistSize: 5,
        leaderboardHiddenHoursBeforeClose: 12,
        maxVotesPerDay: 1,
      },
      categories: [
        {
          id: "ac1e6e04-e726-4c0e-ac76-c1d6be40863b",
          name: "Best Artist",
          description: "Top headline talent in the current cycle.",
          nominees: [
            { id: "2d7c1e81-a9af-4e37-a374-ea46f618b2aa", name: "Inkanyezi SA" },
            { id: "2f510ec7-2c56-4901-bbd4-45e6ecb3eb0c", name: "Master Tizzer SA" },
            { id: "15a95e28-d7f8-4c8c-84fe-3ad7ce2d7a3f", name: "DJ Excessive SA" },
          ],
        },
      ],
    },
  },
];
