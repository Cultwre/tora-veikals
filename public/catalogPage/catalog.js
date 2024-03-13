const productsCatalog = document.querySelector(`.products-catalog`);
const productsPagination = document.querySelector(`.products-pagination`);
const productCountFilter = document.querySelector(`#product_count`);
const productFiltering = document.querySelector(`#product_filtering`);

console.log("Pathname:", window.location.pathname);

let page = 1;
let limit = 20;
let filtering = "default";

async function fetchProducts(page, limit, filtering) {
  try {
    const response = await fetch(`${baseUrl}catalog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limit, filtering }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    showProducts(data.products);
    console.log(data.products);
    if (data.totalProducts > limit) {
      createPagination(data.totalProducts, page, limit);
    } else {
      removePagination();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts(page, limit, filtering);

function showProducts(products) {
  productsCatalog.innerHTML = ``;

  products.forEach((e) => {
    if (e.discount_id !== null) {
      let productCardHtml = `
      <div class="product-card x4-products_in-a-row">
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
          <button type="button" class="main-button product-card_button">Ielikt grozā</button>
      </div>
      `;

      productsCatalog.insertAdjacentHTML("beforeend", productCardHtml);
    } else {
      let productCardHtml = `
      <div class="product-card x4-products_in-a-row">
          <div class="product-image_container">
              <img src="${e.image_url}" class="product-image">
          </div>
          <span class="product-name overflow-ellipsis">${e.product_name}</span>
          <div class="product-prices">
              <span class="product-price">${+e.price}€</span>
              <span class="product-price_per-unit">${e.price_per_unit}€/${
        e.unit_id
      }</span>
          </div>
          <button type="button" class="main-button product-card_button">Ielikt grozā</button>
      </div>
      `;

      productsCatalog.insertAdjacentHTML("beforeend", productCardHtml);
    }
  });
}

function createPagination(totalProducts, page, limit) {
  let overallPageCount = totalProducts / limit;
  let currentPage = page;
  let firstPage = 1;
  let lastPage = Math.ceil(overallPageCount);
  productsPagination.innerHTML = ``;

  if (lastPage <= 4) {
    productsPagination.insertAdjacentHTML(
      `beforeend`,
      buttonTemplate(`<`, `prevButton`)
    );
    for (let i = 1; i <= lastPage; i++) {
      productsPagination.insertAdjacentHTML(`beforeend`, buttonTemplate(i));
    }
    productsPagination.insertAdjacentHTML(
      `beforeend`,
      buttonTemplate(`>`, `nextButton`)
    );

    disableButtons(currentPage, lastPage);
    addFunctionality(currentPage);
    return;
  }

  productsPagination.insertAdjacentHTML(
    `beforeend`,
    buttonTemplate(`<`, `prevButton`)
  );
  productsPagination.insertAdjacentHTML(`beforeend`, buttonTemplate(firstPage));

  if (currentPage - 1 > 2) {
    productsPagination.insertAdjacentHTML(`beforeend`, buttonTemplate(`...`));
  }

  if (currentPage === lastPage) {
    productsPagination.insertAdjacentHTML(
      `beforeend`,
      buttonTemplate(lastPage - 2)
    );
  }

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < lastPage) {
      productsPagination.insertAdjacentHTML(`beforeend`, buttonTemplate(i));
    }
  }

  if (currentPage === 1) {
    productsPagination.insertAdjacentHTML(
      `beforeend`,
      buttonTemplate(currentPage + 2)
    );
  }

  if (currentPage + 2 < lastPage) {
    productsPagination.insertAdjacentHTML(`beforeend`, buttonTemplate(`...`));
  }

  productsPagination.insertAdjacentHTML(`beforeend`, buttonTemplate(lastPage));
  productsPagination.insertAdjacentHTML(
    `beforeend`,
    buttonTemplate(`>`, `nextButton`)
  );

  disableButtons(currentPage, lastPage);
  addFunctionality(currentPage);
}

function removePagination() {
  productsPagination.innerHTML = ``;
}

function disableButtons(currentPage, lastPage) {
  [...document.querySelectorAll(`.pagination-button`)]
    .find((e) => +e.textContent === currentPage)
    .setAttribute("disabled", true);

  if (currentPage === 1) {
    document.querySelector(`.prevButton`).setAttribute("disabled", true);
  } else if (currentPage === lastPage) {
    document.querySelector(`.nextButton`).setAttribute("disabled", true);
  }
}

function buttonTemplate(value, prefix) {
  if (prefix) {
    if (value === `<`) {
      return `
  <button class="pagination-button main-button ${prefix}"><span class="material-symbols-outlined white-text">chevron_left</span></button>
  `;
    } else if (value === `>`) {
      return `
  <button class="pagination-button main-button ${prefix}"><span class="material-symbols-outlined white-text">chevron_right</span></button>
  `;
    }
  } else if (value !== `...`) {
    return `
    <button data-id="${value}" class="pagination-button main-button ${prefix}">${value}</button>
    `;
  } else {
    return `
    <button class="pagination-button main-button ${prefix}">${value}</button>
    `;
  }
}

function addFunctionality(currentPage) {
  let paginationButtons = document.querySelectorAll(`.pagination-button`);

  paginationButtons.forEach((e) => {
    if (e.classList.contains(`prevButton`)) {
      e.addEventListener(`click`, (el) => {
        page = --currentPage;
        fetchProducts(page, limit, filtering);
        smoothScrollingTop();
      });
    } else if (e.classList.contains(`nextButton`)) {
      e.addEventListener(`click`, (el) => {
        page = ++currentPage;
        fetchProducts(page, limit, filtering);
        smoothScrollingTop();
      });
    } else if (e.dataset.id) {
      e.addEventListener(`click`, (el) => {
        page = +e.dataset.id;
        fetchProducts(page, limit, filtering);
        smoothScrollingTop();
      });
    }
  });
}

function smoothScrollingTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

productCountFilter.addEventListener("change", (e) => {
  const selectedCount = e.target.value;
  limit = +selectedCount;
  page = 1;
  fetchProducts(page, limit, filtering);
});

productFiltering.addEventListener("change", (e) => {
  const selectedFiltering = e.target.value;
  filtering = selectedFiltering;
  page = 1;
  fetchProducts(page, limit, filtering);
});
