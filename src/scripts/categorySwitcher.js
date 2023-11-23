import { addListenersToAddToCartBtn } from "./initCart";
const KEY = "AIzaSyBZYChjMYnl8aP33K9sexyOPGLGXBQU9GE";

const getBookList = async (category, page = 0) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${KEY}&printType=books&startIndex=${
      page * 6
    }&maxResults=6&langRestrict=en`
  );
  const data = await res.json();
  return data;
};

const createBookCard = (data) => `<li>
  <div class="library__list-book">
    <div class="library__list-wrapper">
      <img class="library__list-img" src="${
        data.volumeInfo?.imageLinks?.thumbnail
      }" alt="book" />
      <div class="library__list-info">
        <p class="library__list-author">${
          data.volumeInfo?.authors?.join(" ") || ""
        }</p>
        <h3 class="library__list-name">${data.volumeInfo.title}</h3>
        <div class="library__list-rating">
          ${Array(data.volumeInfo?.averageRating || 0)
            ?.fill()
            ?.map(
              () => `
            <img src="assets/star-active.svg" alt="star" />
          `
            )
            .join("")}
          ${Array(
            data.volumeInfo?.averageRating
              ? 5 - data.volumeInfo?.averageRating
              : 5
          )
            ?.fill()
            ?.map(
              () => `
            <img src="assets/star-unactive.svg" alt="star" />
          `
            )
            .join("")}
            <span class="library__list-views">${
              data.volumeInfo?.ratingsCount
                ? `${data.volumeInfo?.ratingsCount} reviews`
                : ""
            }</span>
        </div>
        <p class="library__list-desc">
          ${data.volumeInfo?.description?.slice(0, 200) || ""}...
        </p>
        ${
          data.saleInfo?.listPrice?.amount
            ? `<strong class="library__list-price">${data.saleInfo.listPrice.amount} ${data.saleInfo.listPrice.currencyCode}</strong>`
            : ""
        }
        <button data-id="${
          data?.id
        }" class="library__list-buy button">BUY NOW</button>
      </div>
    </div>
  </div>
</li>`;

const loadBooks = async (category, currentPage, libraryList) => {
  const bookList = await getBookList(category, currentPage);
  const cardsHTML = bookList.items.map(createBookCard).join("");

  libraryList.insertAdjacentHTML("beforeend", cardsHTML);
  addListenersToAddToCartBtn();
};

export default function categorySwitcher() {
  const categoriesBtn = document.querySelectorAll(".library__categories-btn");
  const libraryList = document.querySelector(".library__list");
  const loadMoreBtn = document.querySelector(".library__load-btn");
  let currentPage = 0;
  let currectCategory = "Architecture";

  categoriesBtn.forEach((category) => {
    category.addEventListener("click", (e) => {
      const { category: categoryType } = e.target.dataset;
      if (categoryType === currectCategory) return;

      const prevActiveBtn = document.querySelector(
        `[data-category="${currectCategory}"]`
      );
      prevActiveBtn.classList.remove("active");
      e.target.classList.add("active");

      currentPage = 0;
      currectCategory = categoryType;
      libraryList.innerHTML = "";

      loadBooks(currectCategory, currentPage, libraryList);
    });
  });

  loadMoreBtn.addEventListener("click", (e) => {
    currentPage++;
    loadBooks(currectCategory, currentPage, libraryList);
  });

  loadBooks(currectCategory, currentPage, libraryList);
}
