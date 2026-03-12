import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getPlatformEnv } from "@/lib/env";
import * as schema from "@/lib/db/schema";

const buildDb = (connectionString: string) =>
  drizzle(neon(connectionString), {
    schema,
    casing: "snake_case",
  });

type Database = ReturnType<typeof buildDb>;

let database: Database | null = null;

export function getDb() {
  const env = getPlatformEnv();

  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required before the database client can be used.");
  }

  if (!database) {
    database = buildDb(env.DATABASE_URL);
  }

  return database;
}

export type { Database };
