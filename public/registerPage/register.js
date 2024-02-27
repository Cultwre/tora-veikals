function validateForm(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("password_confirm").value;

  if (email === "") {
    document.querySelector(`.email-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (!isValidEmail(email)) {
    document.querySelector(`.email-error`).textContent = "E-pasts nav valīds!";
    return false;
  } else {
    document.querySelector(`.email-error`).textContent = "";
  }

  if (firstname === "") {
    document.querySelector(`.firstname-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else {
    document.querySelector(`.firstname-error`).textContent = "";
  }

  if (lastname === "") {
    document.querySelector(`.lastname-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else {
    document.querySelector(`.lastname-error`).textContent = "";
  }

  if (password === "") {
    document.querySelector(`.password-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (password.length < 8) {
    document.querySelector(`.password-error`).textContent =
      "Parolei jabūt vismaz 8 rakstzīmes garai!";
    return false;
  } else {
    document.querySelector(`.password-error`).textContent = "";
  }

  if (confirmPassword === "") {
    document.querySelector(`.password_confirm-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (confirmPassword !== password) {
    document.querySelector(`.password_confirm-error`).textContent =
      "Atkārtota parole nesakrīt ar paroli!";
    return false;
  } else {
    document.querySelector(`.password_confirm-error`).textContent = "";
  }

  handleFormSubmission();
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

async function handleFormSubmission() {
  try {
    const form = document.querySelector("#registerForm");

    const formData = new FormData(form);

    const response = await fetch(`${baseUrl}register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData.success) {
      window.location.href = `${baseUrl}login`;
    } else if (responseData.validation) {
      backendValidation(responseData.validation);
    } else {
      console.error("Unexpected response from the server");
    }
  } catch (error) {
    console.error("An error occurred during the request:", error);
  }
}

function backendValidation(errorObj) {
  console.log(errorObj);

  if (errorObj.email == "The email field is required.") {
    document.querySelector(`.email-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (
    errorObj.email == "The email field must contain a valid email address."
  ) {
    document.querySelector(`.email-error`).textContent = "E-pasts nav valīds!";
    return false;
  } else if (errorObj.email == "The email field must contain a unique value.") {
    document.querySelector(`.email-error`).textContent =
      "Šīs e-pasts jau ir aizņemts!";
    return false;
  } else {
    document.querySelector(`.email-error`).textContent = "";
  }

  if (errorObj.firstname == "The firstname field is required.") {
    document.querySelector(`.firstname-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else {
    document.querySelector(`.firstname-error`).textContent = "";
  }

  if (errorObj.lastname == "The lastname field is required.") {
    document.querySelector(`.lastname-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else {
    document.querySelector(`.lastname-error`).textContent = "";
  }

  if (errorObj.password == "The password field is required.") {
    document.querySelector(`.password-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (
    errorObj.password ==
    "The password field must be at least 8 characters in length."
  ) {
    document.querySelector(`.password-error`).textContent =
      "Parolei jabūt vismaz 8 rakstzīmes garai!";
    return false;
  } else {
    document.querySelector(`.password-error`).textContent = "";
  }

  if (errorObj.password_confirm == "The password_confirm field is required.") {
    document.querySelector(`.password_confirm-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (
    errorObj.password_confirm ==
    "The password_confirm field does not match the password field."
  ) {
    document.querySelector(`.password_confirm-error`).textContent =
      "Atkārtota parole nesakrīt ar paroli!";
    return false;
  } else {
    document.querySelector(`.password_confirm-error`).textContent = "";
  }
}
