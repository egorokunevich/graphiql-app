import { decodeBase64, encodeBase64 } from '@/src/utils/base64';
import { validateEmail, validatePassword } from '@/src/utils/validation';

const mockString = 'base64 mock string';
const mockEncodedString = 'YmFzZTY0IG1vY2sgc3RyaW5n';
const mockPasswords = {
  validPassword: 'aA123456!',
  withLengthError: 'aA123!',
  withLetterError: '12345678!',
  withDigitError: 'aaaaAAAA!',
  withSpecialError: 'aA123456',
};
const mockEmails = {
  validEmail: 'email@email.com',
  invalidEmail: 'a@D!',
};

describe('utils', () => {
  test('base64 encoder', () => {
    expect(encodeBase64(mockString)).toBe(mockEncodedString);
  });
  test('base64 decoder', () => {
    expect(decodeBase64(mockEncodedString)).toBe(mockString);
  });
  test('Email validation', () => {
    expect(validateEmail(mockEmails.validEmail)).toBe(true);
    expect(validateEmail(mockEmails.invalidEmail)).toBe(false);
  });
  test('Password validation', () => {
    expect(validatePassword(mockPasswords.validPassword)).toStrictEqual([]);
    expect(validatePassword(mockPasswords.withLengthError)).toStrictEqual([
      'passwordLength',
    ]);
    expect(validatePassword(mockPasswords.withLetterError)).toStrictEqual([
      'passwordLetter',
    ]);
    expect(validatePassword(mockPasswords.withDigitError)).toStrictEqual([
      'passwordDigit',
    ]);
    expect(validatePassword(mockPasswords.withSpecialError)).toStrictEqual([
      'passwordSpecial',
    ]);
  });
});
