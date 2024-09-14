export const encodeBase64 = (input: string): string => {
  const utf8Encoder = new TextEncoder();
  const byteArray = utf8Encoder.encode(input); // Convert input to Uint8Array
  let binaryString = '';
  byteArray.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
};

export const decodeBase64 = (input: string): string => {
  return decodeURIComponent(escape(atob(input)));
};
