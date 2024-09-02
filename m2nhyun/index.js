// 이 곳에 정답 코드를 작성해주세요.

// index.js
import { fetchProducts } from "./src/api/api.js";
import { renderProductList } from "./src/components/productList.js";
import { Cart, renderCart } from "./src/components/cart.js";

const cart = new Cart();

let isCartOpen = true;

const toggleCart = () => {
  console.log("toggleCart called");
  const shoppingCart = document.getElementById("shopping-cart");
  const backdrop = document.getElementById("backdrop");

  isCartOpen = !isCartOpen;

  if (isCartOpen) {
    shoppingCart.classList.remove("translate-x-full");
    shoppingCart.classList.add("translate-x-0");
    backdrop.hidden = false;
  } else {
    shoppingCart.classList.remove("translate-x-0");
    shoppingCart.classList.add("translate-x-full");
    backdrop.hidden = true;
  }
};

const setupEventListeners = () => {
  console.log("setupEventListeners called");
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const backdrop = document.getElementById("backdrop");
  const paymentBtn = document.getElementById("payment-btn");

  openCartBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);
  backdrop.addEventListener("click", toggleCart);
  paymentBtn.addEventListener("click", () => {
    cart.saveToLocalStorage();
    alert("결제가 완료되었습니다.");
    toggleCart();
  });
};

const main = async () => {
  console.log("main function called");
  const products = await fetchProducts();
  console.log("Products fetched:", products);

  renderProductList(products, (productId) => {
    console.log("Product clicked:", productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.addItem(product);
      // toggleCart();
    }
  });

  cart.addListener((items) => {
    renderCart(
      items,
      (productId) => cart.removeItem(productId),
      (productId, delta) => cart.updateQuantity(productId, delta)
    );
  });

  cart.loadFromLocalStorage();
  setupEventListeners();
};

main();
