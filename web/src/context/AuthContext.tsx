import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { apiRequest } from '../services/httpClient';

export type AuthUser = {
  id: number;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const TOKEN_KEY = 'ma_collection_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = window.localStorage.getItem(TOKEN_KEY);
    return savedToken ? JSON.parse(savedToken) : null;
  });
  const [user, setUser] = useState<AuthUser | null>(null);

  const persistToken = (nextToken: string | null) => {
    setToken(nextToken);

    if (nextToken) {
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(nextToken));
      return;
    }

    window.localStorage.removeItem(TOKEN_KEY);
  };

  const refreshUser = async () => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const currentUser = await apiRequest<AuthUser>('/auth/me', { token });
      setUser(currentUser);
    } catch {
      persistToken(null);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiRequest<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const nextToken = response.access_token;
    persistToken(nextToken);

    const currentUser = await apiRequest<AuthUser>('/auth/me', { token: nextToken });
    setUser(currentUser);
  };

  const register = async (email: string, password: string) => {
    await apiRequest<AuthUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  };

  const logout = () => {
    persistToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      refreshUser,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
