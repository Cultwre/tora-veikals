import { addToCart } from "../cartFunctionality.js";

const firstProducts = document.querySelector(".first-products");
const resultContainer = document.querySelector(".result-wrapper");
const showMoreContainer = document.querySelector(".show-more");
const showMoreButton = document.querySelector(".show-more_button");
const noResultsAlert = document.querySelector(".no-results");
const showMoreHref = document.querySelector(".show-more-href");

function showProducts(products) {
  firstProducts.innerHTML = ``;

  products.forEach((e) => {
    if (e.discount_precentage !== null) {
      let productCardHtml = `
        <div class="product-card x4-products_in-a-row">
            <a href="/product/${e.id}">
            <div class="product-image_container">
                <img src="${e.image_url}" class="product-image">
            </div>
            </a>
            <span class="product-name overflow-ellipsis">${
              e.product_name
            }</span>
            <div class="product-prices">
                <div class="product-price_discount">
                <span class="product-price discount">${(
                  +e.price -
                  +e.discount_precentage * +e.price
                ).toFixed(2)}€</span>
                <span class="product-price old-price">${e.price}€</span>
                </div>
                <span class="product-price_per-unit">${e.price_per_unit}€/${
        e.unit_name
      }</span>
            </div>
            <button type="button" id="product-${
              e.id
            }" class="main-button product-card_button">Ielikt grozā</button>
        </div>
        `;

      firstProducts.insertAdjacentHTML("beforeend", productCardHtml);
    } else {
      let productCardHtml = `
        <div class="product-card x4-products_in-a-row">
            <a href="/product/${e.id}">
            <div class="product-image_container">
                <img src="${e.image_url}" class="product-image">
            </div>
            </a>
            <span class="product-name overflow-ellipsis">${
              e.product_name
            }</span>
            <div class="product-prices">
                <span class="product-price">${+e.price}€</span>
                <span class="product-price_per-unit">${e.price_per_unit}€/${
        e.unit_name
      }</span>
            </div>
            <button type="button" id="product-${
              e.id
            }" class="main-button product-card_button">Ielikt grozā</button>
        </div>
        `;

      firstProducts.insertAdjacentHTML("beforeend", productCardHtml);
    }
  });

  let cartBtns = firstProducts.querySelectorAll(".product-card_button");

  cartBtns.forEach((e) => {
    console.log(e);

    e.addEventListener("click", (e) => {
      const productId = parseInt(e.target.id.match(/\d+/)[0]);
      addToCart(productId);

      const addToCartEvent = new CustomEvent("productAddedToCart");
      firstProducts.dispatchEvent(addToCartEvent);
    });
  });
}

document
  .querySelector(".search-products")
  .addEventListener("input", async function (e) {
    if (e.target.value !== "") {
      resultContainer.style.display = "block";
      try {
        const response = await fetch(`${baseUrl}search/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: e.target.value }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        showProducts(data.slice(0, 4));
        if (data.length > 4) {
          firstProducts.style.display = "flex";
          noResultsAlert.style.display = "none";
          showMoreHref.setAttribute(
            "href",
            `/catalog/search=${e.target.value}`
          );

          showMoreContainer.style.display = "flex";
          showMoreButton.textContent = `Rādīt vairāk (${data.length})`;
        } else if (data.length !== 0) {
          firstProducts.style.display = "flex";
          noResultsAlert.style.display = "none";

          showMoreContainer.style.display = "none";
          showMoreButton.textContent = `Rādīt vairāk`;
        } else {
          firstProducts.style.display = "none";
          showMoreContainer.style.display = "none";
          noResultsAlert.style.display = "flex";
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      firstProducts.innerHTML = "";
      resultContainer.style.display = "none";
    }
  });
