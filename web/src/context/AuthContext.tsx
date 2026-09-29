// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthResponse, User } from "../../types/api";
import { httpClient } from "../services/httpClient";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      httpClient.get<User>("/auth/me")
        .then(setUser)
        .catch(() => {
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token, setToken]);

  const login = async (email: string, password: string) => {
    const response = await httpClient.post<AuthResponse>("/auth/login", { email, password });
    setToken(response.access_token);
  };

  const register = async (email: string, password: string) => {
    await httpClient.post<User>("/auth/register", { email, password });
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token), login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
