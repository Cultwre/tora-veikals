const imgOfProduct = document.querySelector(`.product-image-view`);
const titleOfProduct = document.querySelector(`.product_name`);
const productPrice = document.querySelector(`.product-price`);
const productPricePerUnit = document.querySelector(`.product-price_per-unit`);
const discountContainer = document.querySelector(`.product-price_discount`);
const goBackLink = document.querySelector(`#go-back`);
const productInfoContainer = document.querySelector(`.product_info`);

const urlPath = window.location.pathname;
const idOfProduct = urlPath.substring("/product/".length);

(async function fetchProduct() {
  try {
    const response = await fetch(`${baseUrl}product/${idOfProduct}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log(data);
    createProductOverview(data.productInfo);
    createProductInfo(data.productInfo);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
})();

function createProductOverview(productInfo) {
  imgOfProduct.src = productInfo[0].image_url;
  titleOfProduct.textContent = productInfo[0].product_name;
  if (productInfo[0].discount_precentage !== null) {
    productPrice.textContent = `${(
      +productInfo[0].price -
      +productInfo[0].discount_precentage * +productInfo[0].price
    ).toFixed(2)}€`;

    const oldPriceHtml = `<span class="product-price old-price">${+productInfo[0]
      .price}€</span>
    </div>`;

    productPrice.className += ` discount`;
    discountContainer.insertAdjacentHTML(`beforeend`, oldPriceHtml);
  } else {
    productPrice.textContent = `${+productInfo[0].price}€`;
  }
  productPricePerUnit.textContent = `${productInfo[0].price_per_unit}€/${productInfo[0].unit_name}`;
}

goBackLink.addEventListener(`click`, (e) => {
  window.history.back();
});

function createProductInfo(productInfo) {
  console.log(productInfo);

  if (productInfo[0].brand !== null) {
    let productInfoHtml = `
  <div class="info_of-product">
  <span class="hyperlink filter-category">Zīmols</span>
  <span>${productInfo[0].brand}</span>
  <hr class="hr_line product_view_hr">
  </div>
  `;
    productInfoContainer.insertAdjacentHTML(`beforeend`, productInfoHtml);
  }

  if (productInfo[0].origin !== null) {
    let productInfoHtml = `
  <div class="info_of-product">
  <span class="hyperlink filter-category">Izcelsmes valsts</span>
  <span>${productInfo[0].origin}</span>
  <hr class="hr_line product_view_hr">
  </div>
  `;
    productInfoContainer.insertAdjacentHTML(`beforeend`, productInfoHtml);
  }

  if (productInfo[0].amount !== null) {
    let productInfoHtml = `
  <div class="info_of-product">
  <span class="hyperlink filter-category">Daudzums</span>
  <span>${removeTrailingZeros(productInfo[0].amount)}${
      productInfo[0].unit_name
    }</span>
  <hr class="hr_line product_view_hr">
  </div>
  `;
    productInfoContainer.insertAdjacentHTML(`beforeend`, productInfoHtml);
  }

  if (productInfo[0].producer !== null) {
    let productInfoHtml = `
  <div class="info_of-product">
  <span class="hyperlink filter-category">Ražotājs</span>
  <span>${productInfo[0].producer}</span>
  <hr class="hr_line product_view_hr">
  </div>
  `;
    productInfoContainer.insertAdjacentHTML(`beforeend`, productInfoHtml);
  }

  if (productInfo[0].description !== null) {
    let productInfoHtml = `
  <div class="info_of-product">
  <span class="hyperlink filter-category">Produkta apraksts</span>
  <span>${productInfo[0].description}</span>
  <hr class="hr_line product_view_hr">
  </div>
  `;
    productInfoContainer.insertAdjacentHTML(`beforeend`, productInfoHtml);
  }

  if (productInfo[0].energy_kj !== null) {
    let productInfoHtml = `
    <div class="info_of-product">
    <span class="hyperlink filter-category">Uzturvertība</span>
    <table class="nutrition_table">
      <tr>
          <td></td>
          <td></td>
      </tr>
      <tr>
          <td>Enerģētiskā vērtība</td>
          <td>${
            productInfo[0].energy_kj
              ? `${productInfo[0].energy_kj}kJ / ${productInfo[0].energy_kcal}Kcal`
              : ""
          }</td>
      </tr>
      <tr>
          <td>Tauki</td>
          <td>${productInfo[0].fat ? `${productInfo[0].fat} g` : ""}</td>
      </tr>
      <tr>
          <td>Piesātinātas taukskābes</td>
          <td>${
            productInfo[0].saturated_fat
              ? `${productInfo[0].saturated_fat} g`
              : ""
          }</td>
      </tr>
      <tr>
          <td>Ogļhidrāti</td>
          <td>${productInfo[0].carbo ? `${productInfo[0].carbo} g` : ""}</td>
      </tr>
      <tr>
          <td>Cukuri</td>
          <td>${productInfo[0].sugar ? `${productInfo[0].sugar} g` : ""}</td>
      </tr>
      <tr>
          <td>Olbaltumvielas</td>
          <td>${
            productInfo[0].protein ? `${productInfo[0].protein} g` : ""
          }</td>
      </tr>
      <tr>
          <td>Sāls</td>
          <td>${productInfo[0].salt ? `${productInfo[0].salt} g` : ""}</td>
      </tr>
      <!-- Add more rows as needed -->
    </table>
  </div>
  `;
    productInfoContainer.insertAdjacentHTML(`beforeend`, productInfoHtml);
  }

  if (productInfoContainer.innerHTML.trim() === "") {
    let noInfoAlertHtml = `
    <div class="no-products_alert">Informācija netika atrasta</div>
    `;

    productInfoContainer.insertAdjacentHTML(`beforeend`, noInfoAlertHtml);
  }
}

function removeTrailingZeros(number) {
  let numberString = number.toString();

  numberString = numberString.replace(/(\.\d*?[1-9])0+$/, "$1");

  return parseFloat(numberString);
}
