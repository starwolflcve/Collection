import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import CollectionPage from './pages/CollectionPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', backgroundColor: '#1A1A1A', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Catalogue</Link>
        <Link to="/collection" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Ma Collection</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link>
      </nav>

      <main style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<CataloguePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}