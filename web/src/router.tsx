import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CataloguePage } from "./pages/CataloguePage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CollectionPage } from "./pages/CollectionPage";
import { StatsPage } from "./pages/StatsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <CataloguePage /> },
      { path: "/items/:id", element: <ItemDetailPage /> },
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