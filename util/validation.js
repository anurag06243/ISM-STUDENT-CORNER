function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
}

function userDetailsAreValid(
  email,
  password,
  name,
  Admission_Number,
  Hostel_Name,
  Room_Number
) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(Admission_Number) &&
    !isEmpty(Hostel_Name) &&
    !isEmpty(Room_Number)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
