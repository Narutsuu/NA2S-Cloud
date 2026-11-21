import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { formatBytes } from "../lib/utils";
import type { UserProfile } from "../types";

// Page provisoire : sert à vérifier que Auth + Firestore fonctionnent.
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid))
      .then((s) => (s.exists() ? setProfile(s.data() as UserProfile) : setError("Profil introuvable.")))
      .catch(() => setError("Lecture du profil refusée ou impossible."));
  }, [user]);

  const pct = profile ? Math.min(100, (profile.usedBytes / profile.quotaBytes) * 100) : 0;

  return (
    <div className="center">
      <div className="card wide">
        <h1>NA<span>CLOUD</span></h1>
        <p>Bienvenue <strong>{profile?.username ?? user?.displayName}</strong> 👋</p>
        <p className="muted small">{user?.email}</p>
        {error && <p className="error">{error}</p>}
        {profile && (
          <>
            <div className="bar"><div style={{ width: `${pct}%` }} /></div>
            <p className="muted small">{formatBytes(profile.usedBytes)} utilisés sur {formatBytes(profile.quotaBytes)}</p>
          </>
        )}
        <p className="ok small">✅ Base fonctionnelle : le tableau de bord complet arrive à l'étape suivante.</p>
        <button className="secondary" onClick={logout}>Se déconnecter</button>
      </div>
    </div>
  );
}
