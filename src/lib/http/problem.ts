import type { ZodError } from "zod";

export interface ProblemDetails {
  type: string;
  title: string;
  detail: string;
  status?: number;
  errors?: unknown;
}

export function ok<T>(payload: T, status = 200) {
  return Response.json(payload, { status });
}

export function accepted<T>(payload: T) {
  return Response.json(payload, { status: 202 });
}

export function problemResponse(status: number, problem: ProblemDetails) {
  return new Response(
    JSON.stringify({
      ...problem,
      status,
    }),
    {
      status,
      headers: {
        "content-type": "application/problem+json",
      },
    },
  );
}

export function validationProblemResponse(error: ZodError) {
  return problemResponse(400, {
    type: "/problems/validation-error",
    title: "Validation failed",
    detail: "One or more request fields are invalid.",
    errors: error.flatten(),
  });
}
