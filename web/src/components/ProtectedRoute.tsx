import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader } from "./ui/Loader";

export function ProtectedRoute() {
  const { token, user, ready } = useAuth();
  const location = useLocation();
  if (!ready) return <Loader />;
  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}