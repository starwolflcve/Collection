import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as authService from "../services/authService";
import { TOKEN_KEY } from "../services/httpClient";
import type { Credentials, User } from "../types/api";

interface AuthContextValue {
  token: string;
  user: User | null;
  ready: boolean;
  login: (c: Credentials) => Promise<void>;
  register: (c: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface Props { children: ReactNode }

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useLocalStorage<string>(TOKEN_KEY, "");
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const logout = useCallback((): void => {
    setToken("");
    setUser(null);
  }, [setToken]);

  useEffect(() => {
    if (!token) { setUser(null); setReady(true); return; }
    let annule = false;
    authService.me()
      .then((u) => { if (!annule) setUser(u); })
      .catch(() => { if (!annule) logout(); })
      .finally(() => { if (!annule) setReady(true); });
    return () => { annule = true; };
  }, [token, logout]);

  const login = useCallback(async (c: Credentials): Promise<void> => {
    const res = await authService.login(c);
    setToken(res.access_token);
  }, [setToken]);

  const register = useCallback(async (c: Credentials): Promise<void> => {
    await authService.register(c);
    await login(c);
  }, [login]);

  const value = useMemo<AuthContextValue>(
    () => ({ token, user, ready, login, register, logout }),
    [token, user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}