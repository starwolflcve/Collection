import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
<<<<<<< HEAD
import ProtectedRoute from './components/layout/ProtectedRoute';
=======
import { CollectionProvider } from './context/CollectionContext';
import ProtectedRoute from './composants/layout/ProtectedRoute';
>>>>>>> 1c7b3f3 (mise en place collection)
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CollectionPage from './pages/CollectionPage';
import VoitureDetailPage from './pages/VoitureDetailPage';

function AppLayout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="topbar">
        <div className="topbar-inner">
          <div className="brand-wrap">
            <div className="brand-mark">M</div>
            <div>
              <div className="brand-title">MA COLLECTION</div>
              <div className="brand-subtitle">REGISTRE AUTOMOBILE</div>
            </div>
          </div>

          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Rechercher une voiture, une marque..." />
          </div>

          <div className="nav-links">
            <Link to="/">Catalogue</Link>
            <Link to="/collection">Ma Collection</Link>
            <Link to="/stats">Statistiques</Link>
            {!isAuthenticated ? (
              <Link to="/login">Connexion</Link>
            ) : (
              <button type="button" onClick={logout} className="logout-btn">Déconnexion</button>
            )}
          </div>
        </div>
      </nav>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<CataloguePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/voiture/:slug" element={<VoitureDetailPage />} />
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
        <CollectionProvider>
          <AppLayout />
        </CollectionProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}