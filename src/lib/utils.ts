export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  const units = ["Ko", "Mo", "Go", "To"];
  let v = bytes / 1024, i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v < 10 ? 1 : 0)} ${units[i]}`;
}

const MESSAGES: Record<string, string> = {
  "auth/email-already-in-use": "Cette adresse e-mail est déjà utilisée.",
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/weak-password": "Mot de passe trop faible (8 caractères minimum).",
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/user-not-found": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "E-mail ou mot de passe incorrect.",
  "auth/too-many-requests": "Trop de tentatives. Réessaie plus tard.",
  "auth/network-request-failed": "Problème de connexion réseau.",
  "permission-denied": "Action refusée par les règles de sécurité.",
};

export function errorMessage(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  return MESSAGES[code] ?? `Une erreur est survenue (${code || "inconnue"}).`;
}
