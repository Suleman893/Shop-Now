export const Validate = (user) => {
  const errors = {};
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const nameRegex = /^[a-z ,.'-]+$/i;
  if (!user.name) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(user.name)) {
    errors.name = "Please enter a valid name";
  }
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
