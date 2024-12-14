import { openDB } from 'idb';

const DB_NAME = 'MediaStore';
const STORE_NAME = 'media';

// Initialize IndexedDB
async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

// Upload file to IndexedDB
export async function uploadFileLocally(file: File): Promise<string> {
  const fileBlob = await file.arrayBuffer();
  const id = crypto.randomUUID();
  const db = await getDb();

  await db.put(STORE_NAME, {
    id,
    fileBlob,
    type: file.type, // Store MIME type for correct Blob reconstruction
    name: file.name, // Optional for display
  });

  return id;
}

// Retrieve file and create Blob URL
export async function getFileBlob(id: string): Promise<string | null> {
  const db = await getDb();
  const record = await db.get(STORE_NAME, id);
  if (record && record.fileBlob && record.type) {
    const blob = new Blob([record.fileBlob], { type: record.type });
    return URL.createObjectURL(blob);
  }
  return null;
}

// Revoke and delete file from IndexedDB
export async function revokeBlobUrl(id: string): Promise<void> {
  const db = await getDb();
  const record = await db.get(STORE_NAME, id);

  if (record && record.fileBlob && record.type) {
    const blobUrl = URL.createObjectURL(
      new Blob([record.fileBlob], { type: record.type }),
    );
    URL.revokeObjectURL(blobUrl);
  }

  await db.delete(STORE_NAME, id);
}
