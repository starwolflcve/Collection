// src/layout/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingState from "../common/LoadingState";

export default function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { token, isLoading } = useAuth();

  if (isLoading) return <LoadingState />;
  if (!token) return <Navigate to="/login" replace />;

  return children ?? <Outlet />;
}
