export function validateEmail(email: string) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
}

export function validatePassword(password: string) {
  const errors = [];

  if (!/^.{8,}$/.test(password)) {
    errors.push('passwordLength');
  }
  if (!/(?=.*[a-zA-Z])/.test(password)) {
    errors.push('passwordLetter');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('passwordDigit');
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('passwordSpecial');
  }

  return errors;
}
