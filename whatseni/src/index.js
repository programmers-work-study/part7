const productCardEl = document.querySelector('#product-card-grid');
const cartBtnEl = document.querySelector('#open-cart-btn');
const cartListEl = document.querySelector('#shopping-cart');
const backDropEl = document.querySelector('#backdrop');
const cartCloseBtnEl = document.querySelector('#close-cart-btn');
const cartProductListEl = document.querySelector('#cart-list > ul');
const totalCountEl = document.querySelector('#total-count');
const payButtonEl = document.querySelector('#payment-btn');

const MAX_COUNT = 10;
const MIN_COUNT = 1;

let productList = [];
let cartMap = new Map();

const getProductData = async () => {
  const response = await fetch('./api/productData.json');
  return response.json();
};

const onCalculateTotalCount = () => {
  const total = Array.from(cartMap.values()).reduce(
    (sum, item) => sum + item.info.price * item.cnt,
    0
  );
  totalCountEl.textContent = `${total.toLocaleString()}원`;
};

const onPaintCartList = (item) => {
  const el = `
    <li class="flex py-6" id="${item.info.id}">
      <div class="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
        <img src="${item.info.imgSrc}" class="h-full w-full object-cover object-center" />
      </div>
      <div class="ml-4 flex flex-1 flex-col">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>${item.info.name}</h3>
          <p class="ml-4">${item.info.price.toLocaleString()}원</p>
        </div>
        <div class="flex flex-1 items-end justify-between">
          <div class="flex text-gray-500">
            <button class="decrease-btn">-</button>
            <div class="mx-2 font-bold cart-cnt">${item.cnt}개</div>
            <button class="increase-btn">+</button>
          </div>
          <button type="button" class="font-medium text-sky-400 hover:text-sky-500">
            <p class="remove-btn">삭제하기</p>
          </button>
        </div>
      </div>
    </li>
  `;
  cartProductListEl.insertAdjacentHTML('beforeend', el);
};

const updateCart = (productId, count) => {
  const item = cartMap.get(productId);
  if (!item) return;

  if (count < MIN_COUNT) {
    alert(`장바구니에 담을 수 있는 최소 수량은 ${MIN_COUNT}개입니다.`);
  } else if (count > MAX_COUNT) {
    alert(`장바구니에 담을 수 있는 최대 수량은 ${MAX_COUNT}개입니다.`);
  } else {
    item.cnt = count;
    cartMap.set(productId, item);
    onAddCart();
    onCalculateTotalCount();
  }
};

const onAddCart = () => {
  cartProductListEl.innerHTML = "";
  cartMap.forEach(onPaintCartList);
};

const onCreateProductList = async () => {
  productList = await getProductData();
  productList.forEach((item) => {
    const el = `
      <article id="product-card">
        <div class="rounded-lg overflow-hidden border-2 relative">
          <img src="${item.imgSrc}" class="object-center object-cover" />
          <div class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75">
            <div data-productid="${item.id}" class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer">
               장바구니에 담기
            </div>
          </div>
        </div>
        <h3 class="mt-4 text-gray-700">${item.name}</h3>
        <p class="mt-1 text-lg font-semibold text-gray-900">${item.price.toLocaleString()}원</p>
      </article>
    `;
    productCardEl.insertAdjacentHTML('beforeend', el);
  });
};

const toggleCartVisibility = () => {
  cartListEl.classList.toggle('translate-x-0');
  cartListEl.classList.toggle('translate-x-full');
  if (backDropEl.hasAttribute('hidden')) backDropEl.removeAttribute('hidden');
  else backDropEl.setAttribute('hidden', true);
};

const onInitCartList = () => {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      cartMap.set(key, JSON.parse(localStorage.getItem(key)))
      onPaintCartList(JSON.parse(localStorage.getItem(key)))
    }
  } else {
    cartMap = new Map();
  }
}

document.body.addEventListener('click', (event) => {
  const productEl = event.target.closest('[data-productid]');
  if (productEl) {
    if (cartListEl.classList.contains('translate-x-full')) {
      toggleCartVisibility()
    }
    const productId = productEl.dataset.productid;
    const product = productList.find((p) => p.id === Number(productId));
    if (!product) return;

    const cartItem = cartMap.get(productId) || { info: product, cnt: 0 };
    if (cartItem.cnt + 1 > MAX_COUNT) {
      alert(`장바구니에 담을 수 있는 최대 수량은 ${MAX_COUNT}개입니다.`);
    } else {
      cartItem.cnt += 1;
      cartMap.set(productId, cartItem);
      onAddCart();
      onCalculateTotalCount();
    }
  }
});

cartProductListEl.addEventListener('click', (event) => {
  const liElement = event.target.closest('li');
  if (!liElement) return;

  const productId = liElement.id;

  if (event.target.classList.contains('decrease-btn')) {
    const currentCnt = cartMap.get(productId).cnt;
    updateCart(productId, currentCnt - 1);
  }

  if (event.target.classList.contains('increase-btn')) {
    const currentCnt = cartMap.get(productId).cnt;
    updateCart(productId, currentCnt + 1);
  }

  if (event.target.classList.contains('remove-btn')) {
    cartMap.delete(productId);
    onAddCart();
    onCalculateTotalCount();
  }
});

payButtonEl.addEventListener('click', () => {
  localStorage.clear();
  cartMap.forEach((value, key) => {
    localStorage.setItem(key, JSON.stringify(value));
  })
})

cartCloseBtnEl.addEventListener('click', toggleCartVisibility);
backDropEl.addEventListener('click', toggleCartVisibility);
cartBtnEl.addEventListener('click', toggleCartVisibility);

// 초기 생성
onCreateProductList();
onInitCartList();