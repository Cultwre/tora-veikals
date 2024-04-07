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
