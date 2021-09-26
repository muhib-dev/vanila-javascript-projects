//selectors
const formSignup = document.getElementById("formSignup");
const inputUserName = formSignup.userName;
const inputEmail = formSignup.email;
const inputAddress = formSignup.address;
const inputPassword = formSignup.password;
const inputConfirmPassword = formSignup.confirmPassword;

//username check
const checkUsername = () => {
  let valid = false;
  const min = 3;
  const max = 25;
  const username = inputUserName.value.trim();

  if (!isRequired(username)) {
    showErrorStatus(inputUserName, "Username cannot be blank.", true);
  } else if (!isBetween(username.length, min, max)) {
    showErrorStatus(
      inputUserName,
      `Username must be between ${min} and ${max} characters.`,
      true
    );
  } else {
    showErrorStatus(inputUserName);
    valid = true;
  }
  return valid;
};

//check email
const checkEmail = () => {
  let valid = false;
  const email = inputEmail.value.trim();
  if (!isRequired(email)) {
    showErrorStatus(inputEmail, "Email cannot be blank.", true);
  } else if (!isEmailValid(email)) {
    showErrorStatus(inputEmail, "Email is not valid.", true);
  } else {
    showErrorStatus(inputEmail);
    valid = true;
  }
  return valid;
};

//check password
const checkPassword = () => {
  let valid = false;

  const password = inputPassword.value.trim();

  if (!isRequired(password)) {
    showErrorStatus(inputPassword, "Password cannot be blank.", true);
  } else if (!isPasswordSecure(password)) {
    showErrorStatus(
      inputPassword,
      "Password must has at least 8 characters at least 1 lowercase, 1 uppercase, 1 number, and 1 special character in (_!@#$%^&*)",
      true
    );
  } else {
    showErrorStatus(inputPassword);
    valid = true;
  }

  return valid;
};

//check confirm password
const checkConfirmPassword = () => {
  let valid = false;
  const password = inputPassword.value.trim();
  const confirmPassword = inputConfirmPassword.value.trim();

  if (!isRequired(confirmPassword)) {
    showErrorStatus(inputConfirmPassword, "Enter the password again", true);
  } else if (password !== confirmPassword) {
    showErrorStatus(inputConfirmPassword, "The password does not match", true);
  } else {
    showErrorStatus(inputConfirmPassword);
    valid = true;
  }

  return valid;
};

//email validity
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//password options
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

//required field
const isRequired = (value) => (value === "" ? false : true);

//min and max length
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//show error/success
const showErrorStatus = (input, message = "", isError = false) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");

  if (isError) {
    formField.classList.remove("success");
    formField.classList.add("error");
  } else {
    formField.classList.remove("error");
    formField.classList.add("success");
  }
  error.textContent = isError ? message : "";
};

//delay check function
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return function (...args) {
    // cancel the previous timer
    if (timeoutId) clearTimeout(timeoutId);

    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

//on input validate
formSignup.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.name) {
      case "userName":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirmPassword":
        checkConfirmPassword();
        break;
    }
  })
);

//toggle label active class
function toggleLabelActive(element, status) {
  const label = element.parentElement.getElementsByTagName("label")[0];
  status === "add"
    ? label.classList.add("active")
    : label.classList.remove("active");
}

//on input add label active
formSignup.addEventListener("input", function (evt) {
  const element = evt.target;
  const onInput = element.classList.contains("form-control");

  if (onInput) toggleLabelActive(element, "add");
});

//remove label active on focus out
formSignup.addEventListener("focusout", function (evt) {
  const element = evt.target;
  const onInput = element.classList.contains("form-control");

  if (!onInput) return;

  if (!element.value) {
    toggleLabelActive(element);
  }
});

//on page re-load check input has value then active label
const formControl = document.querySelectorAll(".form-control");
formControl.forEach((input) => {
  if (input.value) toggleLabelActive(input, "add");
});

//submit form
formSignup.addEventListener("submit", function (e) {
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});
