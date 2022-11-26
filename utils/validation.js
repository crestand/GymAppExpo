export function validateUser(user) {
  if (
    validateEmail(user.email) &&
    validatePassword(user.password) &&
    validatePhoneNumber(user.phoneNumber) &&
    validateMeasurments(user)
  )
    return true;
  else false;
}

export function validateTrainer(user) {
  if (
    validateEmail(user.email) &&
    validatePassword(user.password) &&
    validatePhoneNumber(user.phoneNumber)
  )
    return true;
  else false;
}

export function validateEmail(email) {
  let check = /^\S+@\S+\.\S+$/;
  if (email.match(check)) {
    return true;
  } else {
    console.log("Invalid Email");
    return false;
  }
}

export function validateMeasurments(user) {
  if (user.waist < 1) return false;
  if (user.shoulder < 1) return false;
  if (user.weight < 1) return false;
  if (user.height < 1) return false;

  return true;
}
export function validatePassword(password) {
  let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (password.match(check)) {
    return true;
  } else {
    console.log("Invalid Password");
    return false;
  }
}

export function validatePhoneNumber(phoneNumber) {
  let check = /(^05[0-9]{9}$)/;
  if (phoneNumber.match(check)) {
    return true;
  } else {
    console.log("Invalid Phone Number");
    return false;
  }
}
