import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../lib/utils";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (username.trim().length < 3 || username.trim().length > 30) return setError("Le pseudo doit faire 3 à 30 caractères.");
    if (password.length < 8) return setError("Mot de passe : 8 caractères minimum.");
    setBusy(true);
    try { await register(username.trim(), email, password); nav("/"); }
    catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h1>NA<span>CLOUD</span></h1>
        <p className="muted">Crée ton espace privé.</p>
        <input placeholder="Pseudo" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe (8 car. min.)" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button disabled={busy}>{busy ? "Création…" : "Créer mon compte"}</button>
        <p className="muted small">Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
      </form>
    </div>
  );
}
