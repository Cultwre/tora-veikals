const toggleButton = document.querySelector(`.toggle-cart_button`);
const cartContainer = document.querySelector(`aside`);
const toggleIcon = document.querySelector(`.toggle-icon`);

toggleButton.addEventListener(`click`, (e) => {
  if (toggleIcon.textContent == "chevron_left") {
    toggleIcon.textContent = "chevron_right";
    cartContainer.style.right = "0";
  } else {
    toggleIcon.textContent = "chevron_left";
    cartContainer.style.right = "-401px";
  }
});
