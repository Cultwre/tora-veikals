import {
  getFromCart,
  addToCart,
  removeOneProduct,
  removeProductFromCart,
  removeAllProducts,
} from "../cartFunctionality.js";

const toggleButton = document.querySelector(`.toggle-cart_button`);
const cartContainer = document.querySelector(`aside`);
const toggleIcon = document.querySelector(`.toggle-icon`);
const cartContent = document.querySelector(`.side-cart_content`);
const priceOfCart = document.querySelector(`#cart-full_price`);
const removeAllProductsButton = document.querySelector(`.remove-all-products`);
const cartBadge = document.querySelector(`.badge`);

toggleButton.addEventListener(`click`, (e) => {
  if (toggleIcon.textContent == "chevron_left") {
    toggleIcon.textContent = "chevron_right";
    cartContainer.style.right = "0";
  } else {
    toggleIcon.textContent = "chevron_left";
    cartContainer.style.right = "-401px";
  }
});

let existingProductIds = [];

function showProducts() {
  getFromCart()
    .then((data) => {
      if (data.cartProducts.length === 0) {
        priceOfCart.textContent = `0,00€`;

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
            `.cart-product-container[data-product-id="${existingProduct.productId}"]`
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

        // Check if the product ID already exists in the array
        if (!existingProduct) {
          let cartProductHtml = `
            <div class="cart-product-container" data-product-id="${
              e.product_id
            }">
              <div class="cart-product-info">
                <div class="cart-product-visible">
                  <img src="${e.image_url}" class="cart-product-image">
                  <div class="cart-product-name_price">
                    <span class="cart-product-name">${e.product_name}</span>
                    <span class="cart-product-price_per_unit">${
                      e.price_per_unit
                    }€/${e.unit_name}</span>
                  </div>
                </div>
                <span class="product-price">${(e.discount_precentage
                  ? (
                      (e.price - e.discount_precentage * e.price).toFixed(2) *
                      e.quantity
                    ).toFixed(2)
                  : e.price * e.quantity
                ).toFixed(2)}€</span>
              </div>
              <div class="cart-product-controllers">
                <div class="cart-controll_quantity">
                  <button class="main-button cart-quantity-controll decrease_quantity">-</button>
                  <span id="product_quantity">${e.quantity}</span>
                  <button class="main-button cart-quantity-controll increase_quantity">+</button>
                </div>
                <button class="main-button cart-product-remove" id="remove_products">Izņemt</button>
              </div>
            </div>
          `;
          cartContent.insertAdjacentHTML(`beforeend`, cartProductHtml);

          // Add the product ID to the existingProductIds array
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
            `.cart-product-container[data-product-id="${e.product_id}"] .cart-controll_quantity .increase_quantity`
          );
          let decreaseQuantityButton = document.querySelector(
            `.cart-product-container[data-product-id="${e.product_id}"] .cart-controll_quantity .decrease_quantity`
          );
          let removeProductButton = document.querySelector(
            `.cart-product-container[data-product-id="${e.product_id}"] #remove_products`
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
            `.cart-product-container[data-product-id="${e.product_id}"] .cart-controll_quantity #product_quantity`
          );
          const fullPriceSpan = document.querySelector(
            `.cart-product-container[data-product-id="${e.product_id}"] .cart-product-info .product-price`
          );
          if (quantitySpan && fullPriceSpan) {
            quantitySpan.textContent = existingProduct.quantity;
            fullPriceSpan.textContent = `${existingProduct.fullPrice.toFixed(
              2
            )}€`;
          }
        }

        let sumPrice = 0;

        existingProductIds.forEach((e) => {
          sumPrice += +e.fullPrice;
        });

        priceOfCart.textContent = `${sumPrice.toFixed(2)}€`;
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
