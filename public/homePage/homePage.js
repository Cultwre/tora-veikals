const discountContainer = document.querySelector(`.discount-show`);
const slideToRight = document.querySelector(`.slider_to-right`);
const slideToLeft = document.querySelector(`.slider_to-left`);
const swiperWrapper = document.querySelector(`.swiper-wrapper`);
const loadingContainer = document.querySelector(".loading-container");
const sliderBtns = document.querySelector(`.slider-btns`);

const bannerNextBtn = document.querySelector(`.slide-banner_to-right`);
const bannerPrevBtn = document.querySelector(`.slide-banner_to-left`);

showLoadingSpinner();

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 10,
  centerInsufficientSlides: true,
  allowTouchMove: false,
  speed: 300,
  init: true,
  on: {
    init: function () {
      loadingContainer.style.transform = "translate3d(-525px, 0px, 0px)";
    },
  },
});

swiper.init();

slideToRight.addEventListener(`click`, (e) => {
  swiper.slideNext();
});

slideToLeft.addEventListener(`click`, (e) => {
  swiper.slidePrev();
});

const bannerSwiper = new Swiper(".banner-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: false,
  speed: 300,
  loop: true,
});

bannerNextBtn.addEventListener(`click`, (e) => {
  bannerSwiper.slideNext();
});

bannerPrevBtn.addEventListener(`click`, (e) => {
  bannerSwiper.slidePrev();
});

function showLoadingSpinner() {
  loadingContainer.style.display = "inherit";
}

function hideLoadingSpinner() {
  loadingContainer.style.display = "none";
  sliderBtns.style.width = "auto";
}

const showDiscountProducts = async function (arrayOfProducts) {
  if (arrayOfProducts.length <= 5 && arrayOfProducts.length > 0) {
    sliderBtns.style.width = "100%";
  } else if (arrayOfProducts.length === 0) {
    let noProductsAlertHtml = `
    <div class="no-products_alert">Šobrīd nav produktu ar atlaidēm</div>
    `;
    sliderBtns.innerHTML = noProductsAlertHtml;
    sliderBtns.style.width = "100%";
  } else {
    slideToLeft.style.opacity = 100;
    slideToRight.style.opacity = 100;
    slideToLeft.style.cursor = "pointer";
    slideToRight.style.cursor = "pointer";
  }

  arrayOfProducts.forEach((e) => {
    let discountHtml = `
    <div class="swiper-slide product-card x5-products_in-a-row">
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

    swiperWrapper.insertAdjacentHTML("beforeend", discountHtml);
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
    hideLoadingSpinner();
  } catch (error) {
    console.error("Error:", error);
  }
})();
