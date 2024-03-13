const navCatalog = document.querySelector(`.nav-catalog`);
const categoryMenu = document.querySelector(`.categoryContainer`);
const secondCategoryMenu = document.querySelector(`.second-categoryContainer`);
const thirdCategoryMenu = document.querySelector(`.third-categoryContainer`);
const categoryWrapper = document.querySelector(`.categoriesWrapper`);

const mainCategoryCount = allCategories.filter(
  (obj) => obj.parent_category === null
).length;

let subCategoriesWithChildrens;

allCategories.forEach((e) => {
  if (e.parent_category === null && hasChildCategories(e.id)) {
    let categoryHtmlWithIcon = `
    <div class="category_with_children">
      <a href="/catalog/${e.url_name}" data-id="${e.id}" id="mainCategory categ-${e.id}" class='hyperlink'>${e.category_name}</a>
      <span class="material-symbols-outlined">chevron_right</span>
  </div>
    `;
    categoryMenu.insertAdjacentHTML("beforeend", categoryHtmlWithIcon);
  } else if (e.parent_category === null) {
    let categoryHtmlBasic = `
    <a href="/catalog/${e.url_name}" data-id="${e.id}" id="mainCategory categ-${e.id}" class='hyperlink'>${e.category_name}</a>
    `;
    categoryMenu.insertAdjacentHTML("beforeend", categoryHtmlBasic);
  }
});

const categoriesWithChildrens = document.querySelectorAll(
  `.category_with_children`
);

categoriesWithChildrens.forEach((e) => {
  e.addEventListener(`mouseover`, (el2) => {
    secondCategoryMenu.innerHTML = "";
    secondCategoryMenu.style.display = "flex";
    let childCategories = getObjectsById(e.children[0].dataset.id);
    childCategories.forEach((el3) => {
      if (el3.subparent_category === null && hasSubChildCategories(el3.id)) {
        let childCategoryHtmlWithChildren = `
        <div class="second-category_with_children">
            <a href="/catalog/${el3.url_name}" data-id="${el3.id}" id="secondCategory categ-${el3.id}" class='hyperlink'>${el3.category_name}</a>
            <span class="material-symbols-outlined">chevron_right</span>
        </div>
        `;
        secondCategoryMenu.insertAdjacentHTML(
          "beforeend",
          childCategoryHtmlWithChildren
        );
      } else if (el3.subparent_category === null) {
        let childCategoryHtmlBasic = `
        <a href="/catalog/${el3.url_name}" data-id="${el3.id}" id="secondCategory categ-${el3.id}" class='hyperlink'>${el3.category_name}</a>
        `;
        secondCategoryMenu.insertAdjacentHTML(
          "beforeend",
          childCategoryHtmlBasic
        );
      }
    });
    subCategoriesWithChildrens = document.querySelectorAll(
      `.second-category_with_children`
    );
    subCategoriesWithChildrens.forEach((e) => {
      e.addEventListener(`mouseover`, (el2) => {
        thirdCategoryMenu.innerHTML = "";
        thirdCategoryMenu.style.display = "flex";
        let childCategories = getSubObjectsById(e.children[0].dataset.id);
        childCategories.forEach((el3) => {
          let childCategoryHtmlBasic = `
            <a href="/catalog/${el3.url_name}" data-id="${el3.id}" id="thirdCategory categ-${el3.id}" class='hyperlink'>${el3.category_name}</a>
            `;
          thirdCategoryMenu.insertAdjacentHTML(
            "beforeend",
            childCategoryHtmlBasic
          );
        });
      });
    });
  });
});

categoryWrapper.addEventListener("mouseleave", (el2) => {
  secondCategoryMenu.style.display = "none";
  thirdCategoryMenu.style.display = "none";
});

// secondCategoryMenu.addEventListener("mouseleave", (e) => {
//   thirdCategoryMenu.style.display = "none";
// });

categoryMenu.addEventListener("mouseover", (e) => {
  thirdCategoryMenu.style.display = "none";
});

function getObjectsById(idToFind) {
  return allCategories.filter((obj) => obj.parent_category === idToFind);
}

function getSubObjectsById(idToFind) {
  return allCategories.filter((obj) => obj.subparent_category === idToFind);
}

function hasChildCategories(categoryId) {
  if (
    allCategories.some((category) => category.parent_category === categoryId)
  ) {
    return true;
  } else {
    return false;
  }
}

function hasSubChildCategories(categoryId) {
  if (
    allCategories.some((category) => category.subparent_category === categoryId)
  ) {
    return true;
  } else {
    return false;
  }
}
