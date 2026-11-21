import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../lib/firebase";
import type { StorageProvider } from "./types";

export const firebaseProvider: StorageProvider = {
  name: "firebase",
  upload(path, file, onProgress) {
    return new Promise((resolve, reject) => {
      const task = uploadBytesResumable(ref(storage, path), file, { contentType: file.type });
      task.on(
        "state_changed",
        (s) => onProgress?.((s.bytesTransferred / s.totalBytes) * 100),
        reject,
        () => resolve()
      );
    });
  },
  getDownloadUrl: (path) => getDownloadURL(ref(storage, path)),
  remove: (path) => deleteObject(ref(storage, path)),
};
