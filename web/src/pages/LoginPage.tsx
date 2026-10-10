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
    <>
      <AuthForm titre="Connexion" bouton="Se connecter" onSubmit={submit} />
      <p>Pas de compte ? <Link to="/register">S'inscrire</Link></p>
    </>
  );
}