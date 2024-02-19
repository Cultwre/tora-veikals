const discountContainer = document.querySelector(`.discount-show`);
const productSlider = document.querySelector(`.product-slider`);

const showDiscountProducts = async function (arrayOfProducts) {
  arrayOfProducts.forEach((e) => {
    console.log(e);
    let discountHtml = `
    <div class="product-card">
        <div class="product-image_container">
            <img src="${e.image_url}" class="product-image">
        </div>
        <span class="product-name overflow-ellipsis">${e.product_name}</span>
        <div class="product-prices">
            <div class="product-price_discount">
            <span class="product-price discount">${(
              +e.price -
              +e.discount_id * +e.price
            ).toFixed(2)}€</span>
            <span class="product-price old-price">${e.price}€</span>
            </div>
            <span class="product-price_per-unit">${e.price_per_unit}€/${
      e.unit_id
    }</span>
        </div>
        <button type="button" class="main-button product-card_button">Ielīkt grozā</button>
    </div>
    `;

    productSlider.insertAdjacentHTML("beforeend", discountHtml);
  });
};

(async function fetchProductsWithDiscount() {
  try {
    const response = await fetch(`${baseUrl}getProductsWithDisc`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const productsWithDiscount = await response.json();
    showDiscountProducts(productsWithDiscount);
  } catch (error) {
    console.error("Error:", error);
  }
})();
