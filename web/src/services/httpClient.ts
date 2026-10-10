import type { ApiErrorBody } from "../types/api";
import { readLocalStorage, writeLocalStorage } from "../utils/storage";

const BASE_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export const TOKEN_KEY = "token";

export class ApiError extends Error {
  readonly code: number;
  constructor(code: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

function isApiErrorBody(v: unknown): v is ApiErrorBody {
  if (typeof v !== "object" || v === null || !("erreur" in v)) return false;
  const e = (v as { erreur: unknown }).erreur;
  return (
    typeof e === "object" &&
    e !== null &&
    typeof (e as { code?: unknown }).code === "number" &&
    typeof (e as { message?: unknown }).message === "string"
  );
}

type Params = Record<string, string | number | undefined>;

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Params;
}

function buildUrl(path: string, params?: Params): string {
  const url = new URL(path, BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  const storedToken = readLocalStorage(TOKEN_KEY, "");
  const token = typeof storedToken === "string" && storedToken !== "" ? storedToken : null;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(buildUrl(path, opts.params), {
      method: opts.method ?? "GET",
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Serveur injoignable");
  }

  if (
    response.status === 401 &&
    token &&
    path !== "/auth/login" &&
    path !== "/auth/register"
  ) {
    writeLocalStorage(TOKEN_KEY, "");
    if (window.location.pathname !== "/login") {
      window.location.assign("/login");
    }
  }

  if (response.status === 204) return undefined as T;

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (isApiErrorBody(data)) throw new ApiError(data.erreur.code, data.erreur.message);
    throw new ApiError(response.status, "Erreur inattendue");
  }
  return data as T;
}