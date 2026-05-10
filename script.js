function validateForm() {
  let isValid = true;
  let errorMessages = [];

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const dob = document.getElementById("dob").value;

  const fullNameErr = document.getElementById("fullNameErr");
  const emailErr = document.getElementById("emailErr");
  const passwordErr = document.getElementById("passwordErr");
  const confirmPasswordErr = document.getElementById("confirmPasswordErr");
  const dobErr = document.getElementById("dobErr");

  // clear previous errors
  fullNameErr.innerHTML = "";
  emailErr.innerHTML = "";
  passwordErr.innerHTML = "";
  confirmPasswordErr.innerHTML = "";
  dobErr.innerHTML = "";

  // validation procedure

  // full name
  if (fullName.trim().length === 0) {
    fullNameErr.innerHTML = "Full name is required";
    errorMessages.push("Full name is required");
    isValid = false;
  } else if (
    fullName
      .trim()
      .split(" ")
      .filter((w) => w.length > 0).length < 2
  ) {
    fullNameErr.innerHTML = "Please enter your first and last name";
    errorMessages.push("Full name must contain at least 2 words");
    isValid = false;
  }

  // email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim().length === 0) {
    emailErr.innerHTML = "Email is required";
    errorMessages.push("Email is required");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailErr.innerHTML = "Enter a valid email (e.g. example@domain.com)";
    errorMessages.push("Email format is invalid");
    isValid = false;
  }

  // password
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (password.length === 0) {
    passwordErr.innerHTML = "Password is required";
    errorMessages.push("Password is required");
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    passwordErr.innerHTML =
      "Password must be at least 8 characters, with one uppercase letter, one number, and one special character";
    errorMessages.push("Password does not meet requirements");
    isValid = false;
  }

  // confirm password
  if (confirmPassword.length === 0) {
    confirmPasswordErr.innerHTML = "Please confirm your password";
    errorMessages.push("Please confirm your password");
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordErr.innerHTML = "Passwords do not match";
    errorMessages.push("Passwords do not match");
    isValid = false;
  }

  // age — must be 18 or older
  if (dob.length === 0) {
    dobErr.innerHTML = "Date of birth is required";
    errorMessages.push("Date of birth is required");
    isValid = false;
  } else {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      dobErr.innerHTML = "You must be at least 18 years old";
      errorMessages.push("You must be at least 18 years old");
      isValid = false;
    }
  }

  // alert errors or show success
  if (!isValid) {
    alert(
      "Please fix the following errors:\n\n" +
        errorMessages.map((msg, i) => `${i + 1}. ${msg}`).join("\n"),
    );
  } else {
    alert("Success! Your details have been submitted.");
  }

  return isValid;
}
