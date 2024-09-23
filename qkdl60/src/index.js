import CartList from './components/CartList.js';
import ProductList from './components/ProductList.js';
import { getStorageItem } from './utils/utils.js';
const productData = await fetch('./api/productData.json').then((res) =>
  res.json()
);
let cartListData = getStorageItem('cartList') || { list: [], total: 0 };
const $productList = document.querySelector('#product-list');
const $openCartBtn = document.querySelector('#open-cart-btn');

const $backDrop = document.querySelector('#backdrop');
new ProductList($productList, productData);
$backDrop.addEventListener('click', () => {
  cartList.closeCart();
});
$openCartBtn.addEventListener('click', () => {
  cartList.openCart();
});

const $cartList = document.querySelector('#shopping-cart');
const cartList = new CartList($cartList, cartListData);
document.addEventListener('click', (event) => {
  const productId = event.target.getAttribute('data-productid');
  const productInfo = productData.find((item) => item.id == productId);
  if (productId !== null) {
    cartList.addCartItem(productId, productInfo);
    return;
  }
});
