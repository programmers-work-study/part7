// 이 곳에 정답 코드를 작성해주세요.
import CartList from './components/CartList.js';
import ProductList from './components/ProductList.js';
const productData = await fetch('./api/productData.json').then((res) =>
  res.json()
);
let cartListData = { list: [], total: 0 };
const $productList = document.querySelector('#product-list');
new ProductList($productList, productData);

const $cartList = document.querySelector('aside');

const cartList = new CartList($cartList, cartListData);
//TODO 이벤트 컴포넌틀 분리
document.addEventListener('click', (event) => {
  const $openCartBtn = event.target.closest('#open-cart-btn');
  const $backDrop = document.querySelector('#backdrop');
  const $closeBtn = document.querySelector('#close-cart-btn').closest('button');
  const productId = event.target.getAttribute('data-productid');

  //TODO벼튼 식별 방식
  if (
    $backDrop === event.target ||
    event.target.closest('button') === $closeBtn
  ) {
    closeCart();
    return;
  }
  if ($openCartBtn) {
    openCart();
    return;
  }
  if (productId !== null) {
    const targetProduct = productData.find(
      (product) => product.id == productId
    );
    const targetCartItem = cartListData.list.find(
      (item) => item.id == productId
    );

    if (targetCartItem) {
      targetCartItem.count++;
    } else {
      cartListData.list.push({ ...targetProduct, count: 1 });
    }
    cartListData.total = cartListData.list.reduce(
      (acc, item) => acc + item.count * item.price,
      0
    );

    cartList.setState(cartListData);
    openCart();
    return;
  }
});

function openCart() {
  const $backDrop = document.querySelector('#backdrop');
  $backDrop.removeAttribute('hidden');
  const $shoppingCart = document.querySelector('#shopping-cart');
  $shoppingCart.classList.replace('translate-x-full', 'translate-x-0');
}
function closeCart() {
  const $backDrop = document.querySelector('#backdrop');
  $backDrop.setAttribute('hidden', true);
  const $shoppingCart = document.querySelector('#shopping-cart');
  $shoppingCart.classList.replace('translate-x-0', 'translate-x-full');
}
