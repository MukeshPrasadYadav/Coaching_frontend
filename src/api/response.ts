// src/api/response.ts
import type { ApiError, ApiResponse } from "./types";

export class ApiException extends Error {
  readonly status?: number;
  readonly apiError: ApiError | null;
  readonly response: ApiResponse<unknown> | null;

  constructor(
    message: string,
    options: {
      status?: number;
      apiError?: ApiError | null;
      response?: ApiResponse<unknown> | null;
      cause?: unknown;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiException";
    this.status = options.status;
    this.apiError = options.apiError ?? null;
    this.response = options.response ?? null;
  }
}

export function isApiResponse(value: unknown): value is ApiResponse<unknown> {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<ApiResponse<unknown>>;
  return (
    typeof candidate.success === "boolean" &&
    typeof candidate.message === "string" &&
    "data" in candidate &&
    "error" in candidate &&
    typeof candidate.timeStamp === "string"
  );
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiException ? error.message : fallback;
}

export function requireApiData<T>(response: ApiResponse<T>): T {
  if (response.data === null) {
    throw new ApiException("The server returned no data.", { response });
  }

  return response.data;
}
