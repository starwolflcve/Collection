import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CollectionProvider } from "./context/CollectionContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CataloguePage from "./pages/CataloguePage";
import VoitureDetailPage from "./pages/VoitureDetailPage";
import CollectionPage from "./pages/CollectionPage";
import StatsPage from "./pages/StatsPage";

export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/catalogue" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/catalogue/:itemId" element={<VoitureDetailPage />} />

            <Route
              path="/collection"
              element={
                <ProtectedRoute>
                  <CollectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <StatsPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/catalogue" replace />} />
          </Routes>
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}