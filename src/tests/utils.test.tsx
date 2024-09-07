import { decodeBase64, encodeBase64 } from '@/src/utils/base64';

const mockString = 'base64 mock string';
const mockEncodedString = 'YmFzZTY0IG1vY2sgc3RyaW5n';

describe('utils', () => {
  test('base64 encoder', () => {
    expect(encodeBase64(mockString)).toBe(mockEncodedString);
  });
  test('base64 decoder', () => {
    expect(decodeBase64(mockEncodedString)).toBe(mockString);
  });
});
