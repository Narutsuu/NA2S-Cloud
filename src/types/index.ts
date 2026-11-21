export interface UserProfile {
  username: string;
  email: string;
  role: "user" | "admin";
  quotaBytes: number;
  usedBytes: number;
}

// Métadonnées d'un fichier (collection Firestore "files")
export interface FileMeta {
  id: string;
  ownerId: string;
  name: string;
  size: number;
  mimeType: string;
  folderId: string | null; // null = racine
  provider: string;        // "firebase" aujourd'hui, autre plus tard
  storagePath: string;     // emplacement dans le fournisseur
  trashed: boolean;
  createdAt: number;
}

// Dossier (collection Firestore "folders")
export interface FolderMeta {
  id: string;
  ownerId: string;
  name: string;
  parentId: string | null;
  trashed: boolean;
  createdAt: number;
}
