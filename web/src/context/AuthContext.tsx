// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
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
    let actif = true;

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return () => {
        actif = false;
      };
    }

    setIsLoading(true);
    httpClient.get<User>("/auth/me")
      .then((utilisateur) => {
        if (actif) setUser(utilisateur);
      })
      .catch(() => {
        if (actif) {
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (actif) setIsLoading(false);
      });

    return () => {
      actif = false;
    };
  }, [token, setToken]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await httpClient.post<AuthResponse>("/auth/login", { email, password });
      setToken(response.access_token);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    await httpClient.post<User>("/auth/register", { email, password });
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token && user), login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
