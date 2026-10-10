import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Layout() {
  const { user, logout } = useAuth();
  return (
    <>
      <header className="header">
        <Link to="/" className="brand">Ma Collection</Link>
        <nav className="nav">
          <NavLink to="/">Catalogue</NavLink>
          {user ? (
            <>
              <NavLink to="/collection">Ma collection</NavLink>
              <NavLink to="/stats">Stats</NavLink>
              <button onClick={logout}>Déconnexion</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/register">Inscription</NavLink>
            </>
          )}
        </nav>
      </header>
      <main className="container"><Outlet /></main>
    </>
  );
}
