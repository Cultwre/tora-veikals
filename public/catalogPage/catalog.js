const productsCatalog = document.querySelector(`.products-catalog`);
const productsPagination = document.querySelector(`.products-pagination`);
const productCountFilter = document.querySelector(`#product_count`);
const productFiltering = document.querySelector(`#product_filtering`);
const catalogueTitle = document.querySelector(`.catalog-title`);
const catalogFilter = document.querySelector(`.catalog-filter`);
const categoryFilter = document.querySelector(`.category-filter`);
const brandContainer = document.querySelector(`.brand-filter-checkboxes`);
const brandFilterIcon = document.querySelector("#brand-filter-toggle");

const urlPath = window.location.pathname;
const trimmedUrlPath = urlPath.substring("/catalog".length);

let page = 1;
let limit = 20;
let filtering = "default";
let filteringHasExecuted = false;
let priceFilteringHasExecuted = false;
let brandFilteringHasExecuted = false;
let priceLimit = [];
let brands = [];

async function fetchProducts(
  page,
  limit,
  filtering,
  urlPath,
  priceLimit,
  brands
) {
  try {
    const response = await fetch(`${baseUrl}catalog${urlPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limit, filtering, priceLimit, brands }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    getMaxAndMinPrices(data.allProducts);
    createBrandFilter(data.allProducts);
    showProducts(data.products);
    setCatalogueTitle(data.categoryName);
    createFilter(
      data.categoryName,
      data.currentCategorySlug,
      data.allCategories
    );
    if (data.totalProducts > limit) {
      createPagination(data.totalProducts, page, limit);
    } else {
      removePagination();
    }
    showAlertOfEmptyCatalogue(data.products);
    console.log("qwe");
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts(page, limit, filtering, trimmedUrlPath, priceLimit, brands);

function showProducts(products) {
  productsCatalog.innerHTML = ``;

  products.forEach((e) => {
    if (e.discount_precentage !== null) {
      let productCardHtml = `
      <div class="product-card x4-products_in-a-row">
          <a href="/product/${e.id}">
          <div class="product-image_container">
              <img src="${e.image_url}" class="product-image">
          </div>
          </a>
          <span class="product-name overflow-ellipsis">${e.product_name}</span>
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
          <button type="button" class="main-button product-card_button">Ielikt grozā</button>
      </div>
      `;

      productsCatalog.insertAdjacentHTML("beforeend", productCardHtml);
    } else {
      let productCardHtml = `
      <div class="product-card x4-products_in-a-row">
          <a href="/product/${e.id}">
          <div class="product-image_container">
              <img src="${e.image_url}" class="product-image">
          </div>
          </a>
          <span class="product-name overflow-ellipsis">${e.product_name}</span>
          <div class="product-prices">
              <span class="product-price">${+e.price}€</span>
              <span class="product-price_per-unit">${e.price_per_unit}€/${
        e.unit_name
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
        fetchProducts(
          page,
          limit,
          filtering,
          trimmedUrlPath,
          priceLimit,
          brands
        );
        smoothScrollingTop();
      });
    } else if (e.classList.contains(`nextButton`)) {
      e.addEventListener(`click`, (el) => {
        page = ++currentPage;
        fetchProducts(
          page,
          limit,
          filtering,
          trimmedUrlPath,
          priceLimit,
          brands
        );
        smoothScrollingTop();
      });
    } else if (e.dataset.id) {
      e.addEventListener(`click`, (el) => {
        page = +e.dataset.id;
        fetchProducts(
          page,
          limit,
          filtering,
          trimmedUrlPath,
          priceLimit,
          brands
        );
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
  fetchProducts(page, limit, filtering, trimmedUrlPath, priceLimit, brands);
});

productFiltering.addEventListener("change", (e) => {
  const selectedFiltering = e.target.value;
  filtering = selectedFiltering;
  page = 1;
  fetchProducts(page, limit, filtering, trimmedUrlPath, priceLimit, brands);
});

function setCatalogueTitle(title) {
  if (title == "all") {
    catalogueTitle.textContent = `Visas preces`;
  } else {
    catalogueTitle.textContent = title[0].category_name;
  }
}

function createFilter(currentCategory, currentCategorySlug, categories) {
  if (!filteringHasExecuted) {
    // Check if the function has not been executed before
    filteringHasExecuted = true; // Set the flag to true after executing the function once
    if (currentCategory == `all`) {
      let categoryFilterDropdown = createDropdownObj(
        categories,
        currentCategorySlug
      );
      createVisibleDropdownForCategories(categoryFilterDropdown);
    } else {
      const mainCategory = categories.find(
        (e) => e.slug === currentCategorySlug
      );
      let categoryFilterDropdown = [
        createCategoryObject(mainCategory.id, categories),
      ];
      createVisibleDropdownForCategories(categoryFilterDropdown);
    }
  }
}

function createDropdownObj(categories, currentCategorySlug) {
  let categoryFilterDropdown = [];

  if (currentCategorySlug === "all") {
    categories.forEach((e) => {
      if (e.parent_category === null && e.subparent_category === null) {
        let mainCategObj = {
          mainCategoryName: e.category_name,
          mainCategoryId: e.id,
          mainCategorySlug: e.slug,
          mainCategoryUrl: e.url_name,
        };
        let parentArray = [];

        categories.forEach((e2) => {
          if (e2.parent_category === e.id && e2.subparent_category === null) {
            let parentCategObj = {
              parentCategoryName: e2.category_name,
              parentCategoryId: e2.id,
              parentCategorySlug: e2.slug,
              parentCategoryUrl: e2.url_name,
            };
            let subParentArray = [];

            categories.forEach((e3) => {
              if (e3.subparent_category === e2.id) {
                let subParentCategObj = {
                  subParentCategoryName: e3.category_name,
                  subParentCategoryId: e3.id,
                  subParentCategorySlug: e3.slug,
                  subParentCategoryUrl: e3.url_name,
                };
                subParentArray.push(subParentCategObj);
              }
            });
            parentCategObj.childrenArr = subParentArray;
            parentArray.push(parentCategObj);
          }
        });
        mainCategObj.childrenArr = parentArray;
        categoryFilterDropdown.push(mainCategObj);
      }
    });
  } else {
    const mainCategory = categories.find((e) => e.slug === currentCategorySlug);

    if (
      mainCategory.parent_category === null &&
      mainCategory.subparent_category === null
    ) {
    }
  }

  return categoryFilterDropdown;
}

function createCategoryObject(categoryId, categories) {
  let categoryObject = {};

  // Find the main category
  let mainCategory = categories.find((cat) => cat.id === categoryId);
  // Set main category properties
  categoryObject.mainCategoryName = mainCategory.category_name;
  categoryObject.mainCategoryId = mainCategory.id;
  categoryObject.mainCategorySlug = mainCategory.slug;
  categoryObject.mainCategoryUrl = mainCategory.url_name;

  // Find children categories (categories with parent_category but no subparent_category)
  let childrenCategories = categories.filter(
    (cat) =>
      cat.parent_category === categoryId && cat.subparent_category === null
  );

  if (childrenCategories.length === 0) {
    childrenCategories = categories.filter(
      (cat) => cat.subparent_category === categoryId
    );
  }

  // Recursively create children objects
  categoryObject.childrenArr = childrenCategories.map((child) => {
    let childObject = {};
    childObject.parentCategoryName = child.category_name;
    childObject.parentCategoryId = child.id;
    childObject.parentCategorySlug = child.slug;
    childObject.parentCategoryUrl = child.url_name;

    // Find grandchildren categories (categories with parent_category and subparent_category)
    let grandchildrenCategories = categories.filter(
      (cat) =>
        cat.parent_category === categoryId &&
        cat.subparent_category === child.id
    );

    // Recursively create grandchildren objects
    childObject.childrenArr = grandchildrenCategories.map((grandchild) => {
      let grandchildObject = {};
      grandchildObject.subParentCategoryName = grandchild.category_name;
      grandchildObject.subParentCategoryId = grandchild.id;
      grandchildObject.subParentCategorySlug = grandchild.slug;
      grandchildObject.subParentCategoryUrl = grandchild.url_name;

      return grandchildObject;
    });

    return childObject;
  });

  return categoryObject;
}

function createVisibleDropdownForCategories(categoriesArr) {
  categoryFilter.innerHTML = ``;

  categoriesArr.forEach((e) => {
    if (Array.isArray(e.childrenArr) && e.childrenArr.length !== 0) {
      let mainCategoryHtml = `
      <div class="category-visibility">
      <div class="main-category">
          <a href="/catalog/${e.mainCategoryUrl}" class="hyperlink">${e.mainCategoryName}</a>
          <span data-id="${e.mainCategoryId}" id="show_dropdown" class="material-symbols-outlined main-dropdown">add</span>
      </div>
      <div id="main-${e.mainCategoryId}"></div>
      </div>
    `;
      categoryFilter.insertAdjacentHTML("beforeend", mainCategoryHtml);

      console.log();

      let childrensOfCategory = e.childrenArr;

      childrensOfCategory.forEach((e2) => {
        if (Array.isArray(e.childrenArr) && e2.childrenArr.length !== 0) {
          let subCategoryHtml = `
          <div id="sub-${e.mainCategoryId}" class="category-visibility hidden">
            <div class="main-category sub">
              <a href="/catalog/${e2.parentCategoryUrl}" class="hyperlink">${e2.parentCategoryName}</a>
              <span data-id="${e2.parentCategoryId}" id="show_dropdown" class="material-symbols-outlined">add</span>
            </div>
            <div id="sub_main-${e2.parentCategoryId}">
            </div>
          </div>
        `;
          document
            .querySelector(`#main-${e.mainCategoryId}`)
            .insertAdjacentHTML("beforeend", subCategoryHtml);

          let SubChildrensOfCategory = e2.childrenArr;

          SubChildrensOfCategory.forEach((e3) => {
            let subParentCategoryHtml = `
          <div id="sub-${e2.parentCategoryId}" class="category-visibility hidden">
            <div class="main-category_checkbox sub2">
              <a href="/catalog/${e3.subParentCategoryUrl}" class="hyperlink">${e3.subParentCategoryName}</a>
            </div>
          </div>
        `;
            document
              .querySelector(`#sub_main-${e2.parentCategoryId}`)
              .insertAdjacentHTML("beforeend", subParentCategoryHtml);
          });
        } else {
          let subCategoryHtml = `
          <div id="sub-${e.mainCategoryId}" class="category-visibility hidden">
            <div class="main-category_checkbox sub">
            <a href="/catalog/${e2.parentCategoryUrl}" class="hyperlink">${e2.parentCategoryName}</a>
            </div>
          </div>
        `;
          document
            .querySelector(`#main-${e.mainCategoryId}`)
            .insertAdjacentHTML("beforeend", subCategoryHtml);
        }
      });
    } else {
      let mainCategoryHtml = `
      <div class="main-category_checkbox">
        <a href="/catalog/${e.mainCategoryUrl}" class="hyperlink">${e.mainCategoryName}</a>
      </div>
    `;
      categoryFilter.insertAdjacentHTML("beforeend", mainCategoryHtml);
    }
  });

  const showDropdownIcons = document.querySelectorAll(`#show_dropdown`);
  const mainDropdown = document.querySelectorAll(`.main-dropdown`);

  showDropdownIcons.forEach((e) => {
    e.addEventListener(`click`, (e2) => {
      // document.querySelector(`#sub-${e.dataset.id}`).classList.toggle("hidden");
      document.querySelectorAll(`#sub-${e.dataset.id}`).forEach((e3) => {
        e3.classList.toggle("hidden");
        if (e.textContent === `add`) {
          e.textContent = `remove`;
        } else {
          e.textContent = `add`;
        }
      });
    });
  });

  mainDropdown.forEach((e) => {
    e.addEventListener(`click`, (e2) => {
      if (e.textContent === `add`) {
        e.textContent = `remove`;
      } else {
        e.textContent = `add`;
      }
    });
  });
}

function fetchBasedOnCheckedCheckboxes(checkboxes) {
  brands = [];
  checkboxes.forEach((e) => {
    let checkboxStatus = +e.getAttribute(`data-checked`);
    if (checkboxStatus == true) {
      // let idOfCategory = +e.getAttribute(`id`);
      let nameOfBrand = e.getAttribute(`id`);
      brands.push(nameOfBrand);
    }
  });
  page = 1;
  fetchProducts(page, limit, filtering, trimmedUrlPath, priceLimit, brands);
}

let rangeMin = 0;
const range = document.querySelector(".range-selected");
const rangePrice = document.querySelectorAll(".range-price input");
const rangeInputContainer = document.querySelector(".range-input");
const priceFilterIcon = document.querySelector("#price-filter-toggle");
const priceFilterContainer = document.querySelector(".price-filter-visibility");
const priceTextContainer = document.querySelector(`.range-price`);

function getMaxAndMinPrices(products) {
  if (!priceFilteringHasExecuted) {
    // Check if the function has not been executed before
    priceFilteringHasExecuted = true;
    let productsPrices = [];

    products.forEach((e) => {
      productsPrices.push(
        (+e.price - +e.discount_precentage * +e.price).toFixed(2)
      );
    });

    let minPrice = Math.min(...productsPrices);
    let maxPrice = Math.max(...productsPrices);

    const minInput = document.querySelector(".min");
    const maxInput = document.querySelector(".max");
    const maxTextInput = document.querySelector(".maxPrice");
    const minTextInput = document.querySelector(".minPrice");

    minInput.min = minPrice;
    minInput.max = maxPrice;
    maxInput.min = minPrice;
    maxInput.max = maxPrice;

    minInput.value = minPrice;
    maxInput.value = maxPrice;
    maxTextInput.value = maxPrice;
    minTextInput.value = minPrice;

    applyFunctionalityToRange();
  }
}

function applyFunctionalityToRange() {
  const rangeInput = document.querySelectorAll(".range-input input");
  const rangePrice = document.querySelectorAll(".range-price input");

  rangePrice.forEach((input) => {
    input.value += "€";
  });

  rangeInput.forEach((input) => {
    input.addEventListener("change", (e) => {
      let minRangeLast = parseFloat(rangeInput[0].value);
      let maxRangeLast = parseFloat(rangeInput[1].value);

      priceLimit = [minRangeLast, maxRangeLast];
      page = 1;
      fetchProducts(page, limit, filtering, trimmedUrlPath, priceLimit, brands);
    });

    input.addEventListener("input", (e) => {
      let minRange = parseFloat(rangeInput[0].value);
      let maxRange = parseFloat(rangeInput[1].value);
      let totalRange =
        parseFloat(rangeInput[1].max) - parseFloat(rangeInput[0].min);

      if (maxRange - minRange < rangeMin) {
        if (e.target.className === "min") {
          rangeInput[0].value = (maxRange - rangeMin).toFixed(2); // Apply step manually
        } else {
          rangeInput[1].value = (minRange + rangeMin).toFixed(2); // Apply step manually
        }
      } else {
        rangePrice[0].value = minRange.toFixed(2) + "€"; // Add € symbol
        rangePrice[1].value = maxRange.toFixed(2) + "€"; // Add € symbol
        range.style.left =
          ((minRange - parseFloat(rangeInput[0].min)) / totalRange) * 100 + "%";
        range.style.right =
          100 -
          ((maxRange - parseFloat(rangeInput[0].min)) / totalRange) * 100 +
          "%";
      }
    });
  });

  rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseFloat(rangePrice[0].value.replace("€", ""));
      let maxPrice = parseFloat(rangePrice[1].value.replace("€", ""));
      let totalRange =
        parseFloat(rangeInput[1].max) - parseFloat(rangeInput[0].min);

      if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "min") {
          rangeInput[0].value = minPrice.toFixed(2); // Apply step manually
          range.style.left =
            ((minPrice - parseFloat(rangeInput[0].min)) / totalRange) * 100 +
            "%";
        } else {
          rangeInput[1].value = maxPrice.toFixed(2); // Apply step manually
          range.style.right =
            100 -
            ((maxPrice - parseFloat(rangeInput[0].min)) / totalRange) * 100 +
            "%";
        }
      }
    });
  });

  priceFilterIcon.addEventListener("click", (e) => {
    priceFilterContainer.classList.toggle("hidden");
    if (e.target.textContent === "add") {
      e.target.textContent = "remove";
    } else {
      e.target.textContent = "add";
    }
  });
}

function createBrandFilter(products) {
  if (!brandFilteringHasExecuted) {
    brandFilteringHasExecuted = true;
    let brandArr = [];

    products.forEach((e) => {
      if (e.brand !== null && !brandArr.includes(e.brand)) {
        brandArr.push(e.brand);

        let brandHtml = `
    <div class="main-category_checkbox">
          <input type="checkbox" id='${e.brand}' class="brand-checkbox" data-checked=0>
          <span class="hyperlink filter-category">${e.brand}</span>
    </div>
  `;

        brandContainer.insertAdjacentHTML("beforeend", brandHtml);
      }
    });

    brandFilterIcon.addEventListener("click", (e) => {
      brandContainer.classList.toggle("hidden");
      if (e.target.textContent === "add") {
        e.target.textContent = "remove";
      } else {
        e.target.textContent = "add";
      }
    });

    const brandCheckboxes = document.querySelectorAll(`.brand-checkbox`);
    brandCheckboxes.forEach((e) => {
      e.addEventListener(`click`, (e2) => {
        const checkboxStatus = +e.getAttribute(`data-checked`);
        if (checkboxStatus === 0) {
          e.setAttribute(`data-checked`, 1);
          fetchBasedOnCheckedCheckboxes(brandCheckboxes);
        } else {
          e.setAttribute(`data-checked`, 0);
          fetchBasedOnCheckedCheckboxes(brandCheckboxes);
        }
      });
    });
  }
}

function showAlertOfEmptyCatalogue(products) {
  if (products.length === 0) {
    let noProductsAlertHtml = `
    <div class="no-products_alert">Produkti netika atrasti</div>
    `;
    productsCatalog.insertAdjacentHTML("beforeend", noProductsAlertHtml);
  }
}
