import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './composants/layout/ProtectedRoute';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CollectionPage from './pages/CollectionPage';

function AppLayout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav style={{ padding: '1rem', backgroundColor: '#1A1A1A', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Catalogue</Link>
        <Link to="/collection" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Ma Collection</Link>
        {!isAuthenticated ? (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link>
        ) : (
          <button type="button" onClick={logout} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Déconnexion
          </button>
        )}
      </nav>

      <main style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<CataloguePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <CollectionPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}