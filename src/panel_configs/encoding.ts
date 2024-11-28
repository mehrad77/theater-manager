export const encodeFileToBase64 = (file: File | string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    if (file instanceof File) {
      reader.readAsDataURL(file); // Reads the file as Base64
    } else {
      reject(new Error('Invalid file type'));
    }
  });
};

export const decodeBase64ToBlob = (base64: string): Blob => {
  const byteString = atob(base64.split(',')[1]); // Extract Base64 payload
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type
  const buffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    buffer[i] = byteString.charCodeAt(i);
  }
  return new Blob([buffer], { type: mimeString });
};
