import type { ApiError } from "../types";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

function formatApiError(error: ApiError, fallback: string): string {
  if (typeof error.detail === "string") return error.detail;

  const parts = [error.detail.message, error.detail.error].filter(Boolean);
  if (error.detail.missing_columns?.length) {
    parts.push(`Missing columns: ${error.detail.missing_columns.join(", ")}`);
  }

  return parts.length > 0 ? parts.join(" ") : fallback;
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const fallback = `Request failed with status ${response.status}`;
    const error = (await response.json().catch(() => ({ detail: fallback }))) as ApiError;
    throw new ApiRequestError(formatApiError(error, fallback), response.status);
  }
  return response.json() as Promise<T>;
}

export async function postJson<T, B extends object>(
  url: string,
  body: B
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}
