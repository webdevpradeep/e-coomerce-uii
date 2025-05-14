export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

export const validateName = (name) => {
  // regex for name validation at least two letter and only space and letters
  if (name.length < 2) {
    return false;
  }
  const re = /^[a-zA-Z\s]+$/;
  return re.test(name);
};
