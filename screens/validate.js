export default function validateInfo(email, password) {
  let errors = {};
  if (!email) {
    errors.email = "Camp obligatoriu";
  } else if (!/^[A-Z0-9._%+=]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Email adress is invalid";
  }

  if (!password) {
    errors.password = "Camp obligatoriu";
  } else if (password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }
  return errors;
}
