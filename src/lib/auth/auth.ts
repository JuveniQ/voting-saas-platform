import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, organization, twoFactor } from "better-auth/plugins";
import { getDb } from "@/lib/db/client";
import { getPlatformEnv } from "@/lib/env";
import { getNotificationProvider } from "@/lib/notifications/provider";

function createAuthInstance() {
  const env = getPlatformEnv();
  const notificationProvider = getNotificationProvider();

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET ?? "development-secret-change-me-before-deploying",
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [
      `https://${env.PLATFORM_MARKETING_HOST}`,
      `https://${env.PLATFORM_APP_HOST}`,
      "http://localhost:3000",
    ],
    database: drizzleAdapter(getDb(), {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    plugins: [
      nextCookies(),
      organization({
        allowUserToCreateOrganization: false,
      }),
      emailOTP({
        expiresIn: 10 * 60,
        async sendVerificationOTP({ email, otp, type }) {
          await notificationProvider.sendVotingOtp({
            email,
            otp,
            tenantName: "Voting SaaS Platform",
            campaignName: type === "sign-in" ? "Admin sign-in" : "Email verification",
            expiresInMinutes: 10,
          });
        },
      }),
      twoFactor(),
    ],
  });
}

type AuthInstance = ReturnType<typeof createAuthInstance>;

let authInstance: AuthInstance | null | undefined;

export function getAuth() {
  if (authInstance !== undefined) {
    return authInstance;
  }

  const env = getPlatformEnv();

  if (!env.DATABASE_URL) {
    authInstance = null;
    return authInstance;
  }

  authInstance = createAuthInstance();

  return authInstance;
}
