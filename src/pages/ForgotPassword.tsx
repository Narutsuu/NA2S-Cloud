import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../lib/utils";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(""); setMsg("");
    try { await resetPassword(email); setMsg("Si ce compte existe, un e-mail vient d'être envoyé."); }
    catch (err) { setError(errorMessage(err)); }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h1>NA<span>CLOUD</span></h1>
        <p className="muted">Réinitialiser le mot de passe.</p>
        <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        {msg && <p className="ok">{msg}</p>}
        <button>Envoyer le lien</button>
        <p className="muted small"><Link to="/login">Retour à la connexion</Link></p>
      </form>
    </div>
  );
}
