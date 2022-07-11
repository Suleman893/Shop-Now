export const Validate = (user) => {
  const errors = {};
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!user.email) {
    errors.email = "Email is required";
  } else if (!regex.test(user.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!user.password) {
    errors.password = "Password  is required";
  } else if (user.password.length < 2 || user.password.length > 15) {
    errors.password = "Password must be between 10 - 15 digits";
  }
  return errors;
};
