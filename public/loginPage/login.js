function validateForm(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  //   if (email === "") {
  //     document.querySelector(`.email-error`).textContent =
  //       "Šīs ir obligāts lauks!";
  //     return false;
  //   } else if (!isValidEmail(email)) {
  //     document.querySelector(`.email-error`).textContent = "E-pasts nav valīds!";
  //     return false;
  //   } else {
  //     document.querySelector(`.email-error`).textContent = "";
  //   }

  //   if (password === "") {
  //     document.querySelector(`.password-error`).textContent =
  //       "Šīs ir obligāts lauks!";
  //     return false;
  //   } else if (password.length < 8) {
  //     document.querySelector(`.password-error`).textContent =
  //       "Parolei jabūt vismaz 8 rakstzīmes garai!";
  //     return false;
  //   } else {
  //     document.querySelector(`.password-error`).textContent = "";
  //   }

  handleFormSubmission();
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

async function handleFormSubmission() {
  try {
    const form = document.querySelector("#loginForm");

    const formData = new FormData(form);

    const response = await fetch(`${baseUrl}login`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData.success) {
      window.location.href = `${baseUrl}`;
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
  } else {
    document.querySelector(`.email-error`).textContent = "";
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
  } else if (errorObj.password == "Email or Password don't match") {
    document.querySelector(`.password-error`).textContent =
      "E-pasts vai parole nesakrīt!";
    return false;
  } else {
    document.querySelector(`.password-error`).textContent = "";
  }
}
