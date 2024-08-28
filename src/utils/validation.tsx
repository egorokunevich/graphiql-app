export function validateEmail(email: string) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
}

export function validatePassword(password: string) {
  const errors = [];

  if (!/^.{8,}$/.test(password)) {
    errors.push('Password must be at least 8 characters long.');
  }
  if (!/(?=.*[a-zA-Z])/.test(password)) {
    errors.push('Password must contain at least one letter.');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one digit.');
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  return errors;
}
