import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@127.0.0.1:5432/voting_saas_platform",
  },
});
