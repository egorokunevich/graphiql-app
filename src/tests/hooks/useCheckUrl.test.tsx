import { isValidUrl } from '@src/hooks/useCheckUrl';

describe('isValidUrl', () => {
  it('should return true for a valid URL', () => {
    expect(isValidUrl('https://www.example.com')).toBe(true);
  });

  it('should return false for an invalid URL', () => {
    expect(isValidUrl('invalid-url')).toBe(false);
  });
});
