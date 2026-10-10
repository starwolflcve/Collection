import { useState, type FormEvent } from "react";
import { ApiError } from "../services/httpClient";
import type { Credentials } from "../types/api";

interface Props {
  titre: string;
  bouton: string;
  onSubmit: (c: Credentials) => Promise<void>;
}

export function AuthForm({ titre, bouton, onSubmit }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handle(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ email, password });
    } catch (err: unknown) {
      setError(err instanceof ApiError ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-card" onSubmit={handle}>
      <div className="auth-card-heading">
        <span className="auth-card-mark" aria-hidden="true">MC</span>
        <p className="auth-eyebrow">Espace membre</p>
        <h1>{titre}</h1>
        <p className="auth-description">
          {titre === "Inscription"
            ? "Créez votre compte pour commencer votre registre personnel."
            : "Connectez-vous pour retrouver votre collection personnelle."}
        </p>
      </div>
      <div className="auth-fields">
        <label htmlFor="auth-email">Adresse e-mail</label>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          placeholder="nom@exemple.fr"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="auth-password">Mot de passe</label>
        <input
          id="auth-password"
          type="password"
          autoComplete={titre === "Inscription" ? "new-password" : "current-password"}
          placeholder="8 caractères minimum"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "Veuillez patienter..." : bouton}
      </button>
    </form>
  );
}