let cartList = [];

export const addListenersToAddToCartBtn = () => {
  const buttons = document.querySelectorAll(".library__list-buy");
  const amount = document.querySelector(".header__cart-amount");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const { id } = btn.dataset;
      if (id && !cartList.includes(id)) {
        cartList.push(id);
        btn.classList.add("active");
        btn.textContent = "IN THE CART";
      } else {
        cartList = cartList.filter((_id) => _id !== id);
        btn.classList.remove("active");
        btn.textContent = "BUY NOW";
      }

      amount.textContent = cartList.length;
    });
  });
};

export default function initCart() {}
