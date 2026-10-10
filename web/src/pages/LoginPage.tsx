import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import type { Credentials } from "../types/api";

interface LocationState { from?: string }

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const state = useLocation().state as LocationState | null;

  async function submit(c: Credentials): Promise<void> {
    await login(c);
    navigate(state?.from ?? "/collection", { replace: true });
  }

  return (
    <section className="auth-page">
      <AuthForm titre="Connexion" bouton="Se connecter" onSubmit={submit} />
      <p className="auth-footer">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>
    </section>
  );
}