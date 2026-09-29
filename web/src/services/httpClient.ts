// src/services/httpClient.ts
import type { ApiErrorFormat } from "../../types/api";

const API_URL = "http://localhost:8000";

export class ApiError extends Error {
  public code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token")?.replace(/"/g, "");
  
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    let errorMessage = "Une erreur est survenue";
    try {
      const errorData = (await response.json()) as ApiErrorFormat;
      if (errorData.erreur) {
        errorMessage = errorData.erreur.message;
      }
    } catch (e) {
      // Ignorer si le format d'erreur n'est pas du JSON valide
    }
    throw new ApiError(response.status, errorMessage);
  }

  if (response.status === 204) {
    return {} as T; // Pas de contenu
  }

  return response.json() as Promise<T>;
}

export const httpClient = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),
  post: <T>(url: string, body: unknown) => request<T>(url, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(url: string, body: unknown) => request<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};
