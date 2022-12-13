export function validateUser(user) {
  if (
    validateEmail(user.email) &&
    validatePassword(user.password) &&
    validatePhoneNumber(user.phoneNumber) &&
    validateMeasurements(user) &&
    validateAge(user.date, 15)
  )
    return true;
  else false;
}

export function validateTrainer(user) {
  if (
    validateEmail(user.email) &&
    validatePassword(user.password) &&
    validatePhoneNumber(user.phoneNumber) &&
    validateAge(user.date, 18)
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

export function validateAge(birthDate, minAge) {
  // console.log(new Date().getFullYear());
  // console.log(new Date(birthDate).getFullYear());
  if (new Date().getFullYear() - new Date(birthDate).getFullYear() > minAge) {
    return true;
  } else {
    console.log("User must be older than %s", minAge);
    return false;
  }
}

export function validateMeasurements(user) {
  let check = /^\d+\.\d+$|^\d+$/;

  let mockDate = new Date();
  mockDate = user.date;
  console.log(mockDate);
  if (mockDate - new Date() > 0) {
    console.log("Can't select future date while saving measurement");
    return false;
  } else {
    console.log("valid date");
  }

  if (user.waist < 1 || !check.test(user.waist)) return false;
  if (user.shoulder < 1 || !check.test(user.shoulder)) return false;
  if (user.weight < 1 || !check.test(user.weight)) return false;
  if (user.height < 1 || !check.test(user.height)) return false;
  console.log(check.test(user.waist));

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

export function validateFeedback(feedback) {
  return feedback.length > 10 ? true : false;
}

export function validateWorkout(workout) {
  // console.log(workout);
  if (workout.trainer_id == "") {
    console.log("Please select trainer");
    return false;
  }
  let mockDate = new Date();
  mockDate = workout.workout_date;
  if (mockDate - new Date() < 0) {
    console.log("Can't select past date while creating workout");
    return false;
  }

  return true;
}
