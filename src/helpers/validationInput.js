export const validateName = (name) => {
  const regex = /^[A-Z][a-zA-Z]{2,}$/; // Перевірка першої великої букви і мінімум 3 букв
  return regex.test(name);
};

export const validateEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateOtp = (otp) => {
  return otp.length > 0;
};
