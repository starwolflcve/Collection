import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CollectionProvider } from "./context/CollectionContext";
import { router } from "./router";

export default function App() {
  return (
    <AuthProvider>
      <CollectionProvider>
        <RouterProvider router={router} />
      </CollectionProvider>
    </AuthProvider>
  );
}