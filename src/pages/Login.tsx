import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../lib/utils";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(""); setBusy(true);
    try { await login(email, password); nav("/"); }
    catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h1>NA<span>CLOUD</span></h1>
        <p className="muted">Connecte-toi à ton espace.</p>
        <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button disabled={busy}>{busy ? "Connexion…" : "Se connecter"}</button>
        <p className="muted small"><Link to="/forgot">Mot de passe oublié ?</Link></p>
        <p className="muted small">Pas de compte ? <Link to="/register">Créer un compte</Link></p>
      </form>
    </div>
  );
}
