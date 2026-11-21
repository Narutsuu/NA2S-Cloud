// Contrat commun à tous les fournisseurs de stockage.
// Pour ajouter un fournisseur plus tard : écrire une nouvelle classe qui respecte cette interface.
export interface StorageProvider {
  readonly name: string;
  upload(path: string, file: File, onProgress?: (pct: number) => void): Promise<void>;
  getDownloadUrl(path: string): Promise<string>;
  remove(path: string): Promise<void>;
}
