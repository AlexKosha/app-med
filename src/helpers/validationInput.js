export const validateName = (name) => {
  const regex = /^[A-Z][a-zA-Z]{3,}$/; // Перевірка першої великої букви і мінімум 3 букв
  return regex.test(name);
};

export const validateEmail = (email) => {
  return email.includes("@");
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
