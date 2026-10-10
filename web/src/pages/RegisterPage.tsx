import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import type { Credentials } from "../types/api";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  async function submit(c: Credentials): Promise<void> {
    await register(c);
    navigate("/collection", { replace: true });
  }

  return (
    <section className="auth-page">
      <AuthForm titre="Inscription" bouton="Créer mon compte" onSubmit={submit} />
      <p className="auth-footer">Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
    </section>
  );
}