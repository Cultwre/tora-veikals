const logoutBtn = document.querySelector(`.logout-link`);

async function logout() {
  try {
    const response = await fetch(`${baseUrl}profile/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();

    if (data.success) {
      window.location.href = "/";
    } else {
      console.error("Failed to logout");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

logoutBtn.addEventListener(`click`, (e) => {
  logout();
});

function validateFormUpdateInfo(event) {
  event.preventDefault();

  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let password = document.getElementById("password").value;

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
  } else {
    document.querySelector(`.password-error`).textContent = "";
  }

  handleFormSubmissionUpdateInfo();
}

async function handleFormSubmissionUpdateInfo() {
  try {
    const updateInfoForm = document.querySelector("#updateInfoForm");

    const formData = new FormData(updateInfoForm);

    const response = await fetch(`${baseUrl}profile/update-info`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData.success) {
      window.location.href = `${baseUrl}profile/info`;
    } else if (responseData.validation) {
      backendValidationUpdateInfo(responseData.validation);
    } else {
      console.error("Unexpected response from the server");
    }
  } catch (error) {
    console.error("An error occurred during the request:", error);
  }
}

function backendValidationUpdateInfo(errorObj) {
  console.log(errorObj);

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
  } else if (errorObj.password == "Incorrect password") {
    document.querySelector(`.password-error`).textContent = "Nepareiza parole!";
    return false;
  } else {
    document.querySelector(`.password-error`).textContent = "";
  }
}

function validateFormUpdatePassword(event) {
  event.preventDefault();

  let old_password = document.getElementById("old_password").value;
  let new_password = document.getElementById("new_password").value;
  let new_password_confirm = document.getElementById(
    "new_password_confirm"
  ).value;

  if (old_password === "") {
    document.querySelector(`.old_password-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else {
    document.querySelector(`.old_password-error`).textContent = "";
  }

  if (new_password === "") {
    document.querySelector(`.new_password-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (new_password.length < 8) {
    document.querySelector(`.new_password-error`).textContent =
      "Parolei jabūt vismaz 8 rakstzīmes garai!";
    return false;
  } else {
    document.querySelector(`.new_password-error`).textContent = "";
  }

  if (new_password_confirm === "") {
    document.querySelector(`.new_password_confirm-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (new_password_confirm !== new_password) {
    document.querySelector(`.new_password_confirm-error`).textContent =
      "Atkārtota parole nesakrīt ar paroli!";
    return false;
  } else {
    document.querySelector(`.new_password_confirm-error`).textContent = "";
  }

  handleFormSubmissionUpdatePassword();
}

async function handleFormSubmissionUpdatePassword() {
  try {
    const updatePasswordForm = document.querySelector("#updatePasswordForm");

    const formData = new FormData(updatePasswordForm);

    const response = await fetch(`${baseUrl}profile/change-password`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData.success) {
      window.location.href = `${baseUrl}profile/info`;
    } else if (responseData.validation) {
      backendValidationUpdatePassword(responseData.validation);
    } else {
      console.error("Unexpected response from the server");
    }
  } catch (error) {
    console.error("An error occurred during the request:", error);
  }
}

function backendValidationUpdatePassword(errorObj) {
  console.log(errorObj);

  if (errorObj.old_password == "The old-password field is required.") {
    document.querySelector(`.old_password-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (errorObj.old_password == "Incorrect password") {
    document.querySelector(`.old_password-error`).textContent =
      "Nepareiza parole!";
    return false;
  } else {
    document.querySelector(`.old_password-error`).textContent = "";
  }

  if (errorObj.new_password == "The new_password field is required.") {
    document.querySelector(`.new_password-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (
    errorObj.new_password ==
    "The new_password field must be at least 8 characters in length."
  ) {
    document.querySelector(`.new_password-error`).textContent =
      "Parolei jabūt vismaz 8 rakstzīmes garai!";
    return false;
  } else {
    document.querySelector(`.new_password-error`).textContent = "";
  }

  if (
    errorObj.new_password_confirm ==
    "The new_password_confirm field is required."
  ) {
    document.querySelector(`.new_password_confirm-error`).textContent =
      "Šīs ir obligāts lauks!";
    return false;
  } else if (
    errorObj.password_confirm ==
    "The new_password_confirm field does not match the new_password field."
  ) {
    document.querySelector(`.new_password_confirm-error`).textContent =
      "Atkārtota parole nesakrīt ar paroli!";
    return false;
  } else {
    document.querySelector(`.new_password_confirm-error`).textContent = "";
  }
}
