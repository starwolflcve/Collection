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
    <form className="card form" onSubmit={handle}>
      <h1>{titre}</h1>
      <label>Email
        <input type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>Mot de passe
        <input type="password" required minLength={8} value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="state-error" role="alert">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "…" : bouton}
      </button>
    </form>
  );
}