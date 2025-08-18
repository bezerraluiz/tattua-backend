export const PasswordStrong = (password: string): boolean => {
  // At least 8 characters, one uppercase letter, one lowercase letter, one number and one special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};