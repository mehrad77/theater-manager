/* eslint-disable no-restricted-syntax */
import { openDB, type IDBPDatabase } from 'idb';
import type { Content } from './contents/types';

const DB_NAME = 'MediaStore';
const STORE_NAME = 'media';

/**
 * Opens a connection to the IndexedDB database with the specified name and version.
 * If the object store does not exist, it creates a new one with the specified key path.
 */
async function getDb(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

/**
 * Uploads a file locally by storing it in the database.
 *
 * @param file - The file to be uploaded.
 * @param content - The content metadata associated with the file.
 * @returns A promise that resolves to the ID of the content.
 */
export async function uploadFileLocally(
  file: File,
  content: Content,
): Promise<string> {
  const fileBlob = await file.arrayBuffer();
  const db = await getDb();

  await db.put(STORE_NAME, {
    id: content.id,
    fileBlob,
    type: file.type, // Store MIME type for correct Blob reconstruction
    name: file.name, // Optional for display
  });

  return content.id;
}

/**
 * Retrieves a file blob from the database and returns a URL object representing the blob.
 *
 * @param id - The unique identifier of the file blob to retrieve.
 * @returns A promise that resolves to a string representing the URL object of the file blob, or null if the file blob is not found.
 */
export async function getFileBlob(id: string): Promise<string | null> {
  const db = await getDb();
  const record = await db.get(STORE_NAME, id);
  if (record && record.fileBlob && record.type) {
    const blob = new Blob([record.fileBlob], { type: record.type });
    return URL.createObjectURL(blob);
  }
  return null;
}

/**
 * Revokes a Blob URL associated with a given record ID and deletes the record from the database.
 *
 * @param id - The unique identifier of the record to be processed.
 * @returns A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function retrieves a record from the database using the provided ID. If the record contains
 * a fileBlob and a type, it creates a Blob URL and immediately revokes it to free up memory.
 * Finally, it deletes the record from the database.
 */
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

//
//
//
// ======================== [ Import / Export ] ========================
//
//
//

/**
 * Exports data from the database and local storage into a JSON Blob.
 *
 * This function retrieves data from the IndexedDB and local storage,
 * serializes it into a JSON object, and returns it as a Blob.
 *
 * @returns {Promise<Blob>} A promise that resolves to a Blob containing the exported data in JSON format.
 */
export async function exportData(): Promise<Blob> {
  const db = await getDb();
  const contents = localStorage.getItem('contents');
  const mediaRecords = await db.getAll(STORE_NAME);

  const exportObject = {
    contents,
    mediaRecords: mediaRecords.map((record) => ({
      ...record,
      fileBlob: record.fileBlob
        ? Array.from(new Uint8Array(record.fileBlob))
        : null,
    })),
  };

  return new Blob([JSON.stringify(exportObject)], {
    type: 'application/json',
  });
}

/**
 * Imports data from a given file and updates the local storage and database.
 *
 * @param {File} file - The file to import data from.
 * @returns {Promise<void>} A promise that resolves when the data has been imported.
 *
 * The function performs the following steps:
 * 1. Reads the text content of the file.
 * 2. Parses the text content as JSON.
 * 3. Retrieves the database instance.
 * 4. If the JSON object contains a `contents` property, it stores it in local storage.
 * 5. If the JSON object contains a `mediaRecords` array, it processes each record:
 *    - Converts `fileBlob` property to an ArrayBuffer if it exists.
 *    - Stores the record in the database.
 */
export async function importData(file: File): Promise<void> {
  const text = await file.text();
  const importObject = JSON.parse(text);

  const db = await getDb();

  if (importObject.contents) {
    localStorage.setItem('contents', importObject.contents);
  }

  if (Array.isArray(importObject.mediaRecords)) {
    await Promise.all(
      importObject.mediaRecords.map(async (record: Record<string, any>) => {
        if (record.fileBlob) {
          record.fileBlob = new Uint8Array(record.fileBlob).buffer;
        }
        await db.put(STORE_NAME, record);
      }),
    );
  }
}
