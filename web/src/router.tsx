import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import CataloguePage from "./pages/CataloguePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import CollectionPage from "./pages/CollectionPage";
import StatsPage from "./pages/StatsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <CataloguePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/collection", element: <CollectionPage /> },
          { path: "/stats", element: <StatsPage /> },
        ],
      },
    ],
  },
]);