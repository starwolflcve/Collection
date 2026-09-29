import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/collection');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Identifiants invalides.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-logo">M</div>
        <h1 className="login-title">Ma Collection</h1>
        <p className="login-subtitle">Accédez à votre garage virtuel d'exception.</p>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alexandre@macollection.fr"
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">
              Mot de passe
              <a href="#" className="login-forgot-password">Oublié ?</a>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primaire login-submit-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-footer">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}