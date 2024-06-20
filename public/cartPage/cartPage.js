import {
  getFromCart,
  addToCart,
  removeOneProduct,
  removeProductFromCart,
  removeAllProducts,
} from "../cartFunctionality.js";

const cartContent = document.querySelector(`.products-container`);
const priceOfCart = document.querySelector(`.price-of-cart`);
const pvnPrice = document.querySelector(`.pvn-price`);
const cartBadge = document.querySelector(`.badge`);
const removeAllProductsButton = document.querySelector(`.remove-all-products`);
const openModalBtn = document.getElementById("openModalBtn");

let existingProductIds = [];
let cart = 0;
let pvn = 0;
let shipping = 10;
let totalPrice = 0;

function showProducts() {
  getFromCart()
    .then((data) => {
      if (data.cartProducts.length === 0) {
        priceOfCart.textContent = `0,00€`;
        pvnPrice.textContent = `0,00€`;
        pvn = 0;
        cart = 0;
        removeAllProductsButton.disabled = true;
        openModalBtn.disabled = true;

        existingProductIds = [];
        cartContent.innerHTML = "";

        const emptyCartHtml = `
            <div class="side-cart_empty">
              <span class="material-symbols-outlined cart-empty">shopping_cart</span>
              <p>Grozs ir tukšs</p>
            </div>
            `;

        cartContent.insertAdjacentHTML(`beforeend`, emptyCartHtml);
      } else if (data.cartProducts.length !== 0) {
        const emptyCart = document.querySelector(`.side-cart_empty`);
        emptyCart.classList.add(`hidden`);
      }

      existingProductIds.forEach((existingProduct, index) => {
        // Check if the productId exists in data.cartProducts
        const existsInData = data.cartProducts.some(
          (product) => product.product_id === existingProduct.productId
        );

        // If the productId doesn't exist in data.cartProducts, remove it from existingProductIds
        if (!existsInData) {
          const productToRemove = document.querySelector(
            `.cart-page-container[data-product-id="${existingProduct.productId}"]`
          );

          if (productToRemove !== null) {
            cartContent.removeChild(productToRemove);
            existingProductIds.splice(index, 1);
          }
        }
      });

      data.cartProducts.forEach((e) => {
        let existingProduct = existingProductIds.find(
          (product) => product.productId === e.product_id
        );
        console.log(e);

        if (!existingProduct) {
          const cartProductHtml = `
        <div class="cart-page-container" data-product-id="${e.product_id}">
                        <div class="cart-page-info">
                            <img src="${e.image_url}" class="cart-page-image">
                            <div class="cart-page-name_price">
                                <span class="cart-page-name">${
                                  e.product_name
                                }</span>
                                <span class="cart-page-price_per_unit">${
                                  e.price_per_unit
                                }€/${e.unit_name}</span>
                            </div>
                        </div>
                    <div class="cart-page-controll_quantity">
                        <button class="main-button cart-quantity-controll decrease_quantity">-</button>
                        <span id="cart-product_quantity">${e.quantity}</span>
                        <button class="main-button cart-quantity-controll increase_quantity">+</button>
                    </div>
                        <div class="cart-page-price">
                            <span class="cart-product-price">${(e.discount_precentage
                              ? (
                                  (
                                    e.price -
                                    e.discount_precentage * e.price
                                  ).toFixed(2) * e.quantity
                                ).toFixed(2)
                              : e.price * e.quantity
                            ).toFixed(2)}€</span>
                        </div>
                        <div class="cart-page-remove">
                            <button class="main-button cart-remove" id="remove_products">Izņemt</button>
                        </div>
                    </div>
        `;
          cartContent.insertAdjacentHTML(`beforeend`, cartProductHtml);

          existingProductIds.push({
            productId: e.product_id,
            quantity: e.quantity,
            fullPrice: e.discount_precentage
              ? (
                  (e.price - e.discount_precentage * e.price).toFixed(2) *
                  e.quantity
                ).toFixed(2)
              : e.price * e.quantity,
          });
          let increaseQuantityButton = document.querySelector(
            `.cart-page-container[data-product-id="${e.product_id}"] .cart-page-controll_quantity .increase_quantity`
          );
          let decreaseQuantityButton = document.querySelector(
            `.cart-page-container[data-product-id="${e.product_id}"] .cart-page-controll_quantity .decrease_quantity`
          );
          let removeProductButton = document.querySelector(
            `.cart-page-container[data-product-id="${e.product_id}"] #remove_products`
          );

          increaseQuantityButton.addEventListener("click", (e2) => {
            addToCart(e.product_id);
            showProducts();
          });
          decreaseQuantityButton.addEventListener("click", (e2) => {
            removeOneProduct(e.product_id);
            showProducts();
          });
          removeProductButton.addEventListener("click", (e2) => {
            removeProductFromCart(e.product_id);
            showProducts();
          });
        } else if (existingProduct && existingProduct.quantity !== e.quantity) {
          existingProduct.quantity = e.quantity;
          existingProduct.fullPrice = e.discount_precentage
            ? (
                (e.price - e.discount_precentage * e.price).toFixed(2) *
                e.quantity
              ).toFixed(2)
            : e.price * e.quantity;

          // Update the quantity in the corresponding span element
          const quantitySpan = document.querySelector(
            `.cart-page-container[data-product-id="${e.product_id}"] .cart-page-controll_quantity #cart-product_quantity`
          );
          const fullPriceSpan = document.querySelector(
            `.cart-page-container[data-product-id="${e.product_id}"] .cart-page-price .cart-product-price`
          );

          console.log(e.product_id);

          if (quantitySpan && fullPriceSpan) {
            quantitySpan.textContent = existingProduct.quantity;
            fullPriceSpan.textContent = `${existingProduct.fullPrice.toFixed(
              2
            )}€`;
            pvnPrice.textContent = `${(
              existingProduct.fullPrice.toFixed(2) * 0.21
            ).toFixed(2)}€`;
            pvn = (existingProduct.fullPrice.toFixed(2) * 0.21).toFixed(2);
            cart = existingProduct.fullPrice.toFixed(2);
            removeAllProductsButton.disabled = false;
            openModalBtn.disabled = false;
          }
        }

        let sumPrice = 0;

        existingProductIds.forEach((e) => {
          sumPrice += +e.fullPrice;
        });

        priceOfCart.textContent = `${sumPrice.toFixed(2)}€`;
        pvnPrice.textContent = `${(sumPrice.toFixed(2) * 0.21).toFixed(2)}€`;
        pvn = (sumPrice.toFixed(2) * 0.21).toFixed(2);
        cart = sumPrice.toFixed(2);
        removeAllProductsButton.disabled = false;
        openModalBtn.disabled = false;
      });
      cartBadge.textContent = existingProductIds.length;
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}

showProducts();

removeAllProductsButton.addEventListener(`click`, (e) => {
  existingProductIds = [];
  removeAllProducts();
  showProducts();
});

document.addEventListener("productAddedToCart", showProducts);

const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const totalPriceSpan = document.querySelector(`.total-price`);
const addressTextInput = document.querySelector(`.fetch-address`);

openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  totalPrice = parseFloat(+pvn + +cart + +shipping).toFixed(2);
  totalPriceSpan.textContent = `${totalPrice}€`;
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

let fetchTimeout;
let isFetching = false;
let selectedAddress = null;

const suggestionsContainer = document.getElementById("suggestions");
const resultContainer = document.getElementById("result");
const pircingSubmit = document.querySelector(`.confirm-shipping`);

// Function to fetch address suggestions
async function fetchAddressData(query) {
  isFetching = true; // Set the fetching flag to true
  try {
    const response = await fetch(
      `https://api.kartes.lv/v3/KVDM_5EtsM/search?q=${query}&layers=adrese&limit=10&fields=name`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(query);
    showSuggestions(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  } finally {
    isFetching = false; // Reset the fetching flag to false
  }
}

// Function to display suggestions
function showSuggestions(suggestions) {
  suggestionsContainer.innerHTML = "";
  if (suggestions.adrese.length === 0) {
    suggestionsContainer.style.display = "none";
    return;
  }
  suggestions.adrese.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion.name;
    div.addEventListener("click", () => {
      addressTextInput.value = suggestion.name;
      selectedAddress = suggestion.name;
      suggestionsContainer.style.display = "none";
    });
    suggestionsContainer.appendChild(div);
  });
  suggestionsContainer.style.display = "block";
}

// Event listener for input field
addressTextInput.addEventListener("input", function (e) {
  // Clear the previous timeout if it exists
  if (fetchTimeout) {
    clearTimeout(fetchTimeout);
  }

  // Set a new timeout to fetch after 2 seconds
  fetchTimeout = setTimeout(() => {
    if (!isFetching) {
      fetchAddressData(e.target.value);
    }
  }, 2000);
});

// Function to validate address on submit
async function validateAddress(address) {
  try {
    const response = await fetch(
      `https://api.kartes.lv/v3/KVDM_5EtsM/search?q=${address}&layers=adrese&limit=1&fields=name`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.adrese[0].name === address ? data.adrese[0] : null;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

// Event listener for submit button
// pircingSubmit.addEventListener("click", async function () {
//   const address = addressTextInput.value;
//   const validAddress = await validateAddress(address);
//   if (validAddress) {
//   } else {
//     resultContainer.textContent =
//       "Adrese nav valīda, izvelējaties vienu no piedavātājiem!";
//   }
// });
pircingSubmit.addEventListener("click", async function () {
  const address = addressTextInput.value;
  const validAddress = await validateAddress(address);
  if (validAddress) {
    getFromCart()
      .then((data) => {
        // Create a form element
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/create_checkout_session"; // Adjust this URL as needed

        // Create input fields to send address and any other required data
        const addressInput = document.createElement("input");
        addressInput.type = "hidden";
        addressInput.name = "address";
        addressInput.value = validAddress.name; // Assuming 'validAddress' is defined and has 'name' property

        const totalPriceInput = document.createElement("input");
        totalPriceInput.type = "hidden";
        totalPriceInput.name = "totalPrice";
        totalPriceInput.value = parseFloat(totalPrice).toFixed(2); // Assuming 'totalPrice' is defined and calculated

        const productsInput = document.createElement("input");
        productsInput.type = "hidden";
        productsInput.name = "productsArr";
        productsInput.value = JSON.stringify(data); // Convert cartProducts to JSON string and assign

        // Append inputs to the form
        form.appendChild(addressInput);
        form.appendChild(totalPriceInput);
        form.appendChild(productsInput);

        // Append form to the document body
        document.body.appendChild(form);

        // Submit the form
        form.submit();
      })
      .catch((error) => {
        console.error("Error fetching cart products:", error);
        // Handle error as needed
      });
  } else {
    resultContainer.textContent =
      "Adrese nav valīda, izvelējaties vienu no piedavātājiem!";
  }
});
