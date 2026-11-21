import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail,
  signInWithEmailAndPassword, signOut, updateProfile, type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

interface AuthValue {
  user: User | null;
  loading: boolean;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const Ctx = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); }), []);

  const value: AuthValue = {
    user, loading,
    async register(username, email, password) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: username });
      // Le rôle et le quota sont imposés par les règles Firestore (100 Mo par défaut).
      await setDoc(doc(db, "users", cred.user.uid), {
        username, email, role: "user",
        quotaBytes: 104857600, usedBytes: 0,
        createdAt: serverTimestamp(),
      });
    },
    async login(email, password) { await signInWithEmailAndPassword(auth, email, password); },
    async logout() { await signOut(auth); },
    async resetPassword(email) { await sendPasswordResetEmail(auth, email); },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return v;
}
