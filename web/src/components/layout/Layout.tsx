import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Layout() {
  const { user, logout } = useAuth();
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-brand" aria-label="Ma Collection, accueil">
            <span className="site-brand-mark" aria-hidden="true">MC</span>
            <span className="site-brand-copy">
              <span className="site-brand-name">Ma Collection</span>
              <span className="site-brand-caption">Le registre automobile</span>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Navigation principale">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}
            >
              Catalogue
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/collection"
                  className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}
                >
                  Ma collection
                </NavLink>
                <NavLink
                  to="/stats"
                  className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}
                >
                  Statistiques
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}
                >
                  Inscription
                </NavLink>
              </>
            )}
          </nav>
          {user && (
            <div className="site-account">
              <span className="site-account-email" title={user.email}>{user.email}</span>
              <button className="site-logout" type="button" onClick={logout}>
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </header>
      <main><Outlet /></main>
    </>
  );
}
