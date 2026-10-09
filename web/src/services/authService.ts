import { request } from "./httpClient";
import type { Credentials, TokenResponse, User } from "../types/api";

export const register = (c: Credentials): Promise<User> =>
  request<User>("/auth/register", { method: "POST", body: c });

export const login = (c: Credentials): Promise<TokenResponse> =>
  request<TokenResponse>("/auth/login", { method: "POST", body: c });

export const me = (): Promise<User> => request<User>("/auth/me");