import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth/auth";
import { problemResponse } from "@/lib/http/problem";

async function authHandler(request: Request) {
  const auth = getAuth();

  if (!auth) {
    return problemResponse(503, {
      title: "Authentication unavailable",
      detail:
        "Better Auth is configured in code but requires DATABASE_URL and BETTER_AUTH_SECRET before the auth surface can be used.",
      type: "/problems/auth-not-configured",
    });
  }

  return auth.handler(request);
}

export const { GET, POST, PATCH, PUT, DELETE } = toNextJsHandler(authHandler);
