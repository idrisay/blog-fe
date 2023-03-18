export const validateLogin = (info) => {
  const { email, password } = info;
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};
