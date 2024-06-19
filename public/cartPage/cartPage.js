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

let existingProductIds = [];
let totalPrice = 0;

function showProducts() {
  getFromCart()
    .then((data) => {
      if (data.cartProducts.length === 0) {
        priceOfCart.textContent = `0,00€`;
        pvnPrice.textContent = `0,00€`;

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
          }
        }

        let sumPrice = 0;

        existingProductIds.forEach((e) => {
          sumPrice += +e.fullPrice;
        });

        priceOfCart.textContent = `${sumPrice.toFixed(2)}€`;
        pvnPrice.textContent = `${(sumPrice.toFixed(2) * 0.21).toFixed(2)}€`;
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
