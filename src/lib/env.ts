import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  BETTER_AUTH_SECRET: z.string().min(32).optional(),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  PLATFORM_BASE_DOMAIN: z.string().min(3).default("voting.company.com"),
  PLATFORM_MARKETING_HOST: z.string().min(3).default("voting.company.com"),
  PLATFORM_APP_HOST: z.string().min(3).default("app.voting.company.com"),
  NEXT_PUBLIC_PLATFORM_NAME: z.string().min(3).default("Voting SaaS Platform"),
  TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

export type PlatformEnv = z.infer<typeof envSchema>;

let cachedEnv: PlatformEnv | null = null;

export function getPlatformEnv(): PlatformEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = envSchema.parse(process.env);
  return cachedEnv;
}
