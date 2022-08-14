export const Validate = (user) => {
  const errors = {};
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const nameRegex = /^[a-z ,.'-]+$/i;
  if (!user.name) {
    errors.name = "Name is required";
    return errors;
  } else if (!nameRegex.test(user.name)) {
    errors.name = "Please enter a valid name";
    return errors;
  } else if (user.name.length < 5 || user.name.length > 15) {
    errors.name = "Name must be between 5- 15 digits";
    return errors;
  }
  if (!user.email) {
    errors.email = "Email is required";
    return errors;
  } else if (!regex.test(user.email)) {
    errors.email = "Please enter a valid email";
    return errors;
  }
  return errors;
};
