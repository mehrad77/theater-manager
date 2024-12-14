export async function uploadFileLocally(file: File): Promise<string> {
  const blobUrl = URL.createObjectURL(file); // Generate Blob URL
  return blobUrl; // Return the Blob URL for storage
}

export function revokeBlobUrl(blobUrl: string): void {
  URL.revokeObjectURL(blobUrl); // Revoke when no longer needed
}
