const formatPrice = (price) => {
  return price.toLocaleString('ko-KR') + '원';
};

export class Cart {
  constructor() {
    this.items = [];
    this.listeners = [];
  }

  addItem(product) {
    console.log('Adding item:', product);
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < 10) {
        existingItem.quantity++;
      } else {
        alert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
        return;
      }
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.notifyListeners();
    this.saveToLocalStorage();
    // 장바구니에 아이템을 추가할 때 카트를 열도록 변경
    if (!isCartOpen) {
      toggleCart();
    }
  }

  removeItem(productId) {
    console.log('remove Item');
    this.items = this.items.filter((item) => item.id !== productId);
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  updateQuantity(productId, delta) {
    console.log('update Quantity');
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity < 1) {
        alert('장바구니에 담을 수 있는 최소 수량은 1개입니다.');
      } else if (newQuantity > 10) {
        alert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
      } else {
        item.quantity = newQuantity;
        this.notifyListeners();
        this.saveToLocalStorage();
      }
    }
  }

  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.items));
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.notifyListeners();
    }
  }
}

// export const renderCart = (cartItems, onRemove, onQuantityChange) => {
//   const cartList = document.getElementById("cart-list");
//   const totalCount = document.getElementById("total-count");

//   cartList.innerHTML =
//     cartItems.length === 0
//       ? "<p>장바구니가 비어있습니다.</p>"
//       : `<ul class="divide-y divide-gray-200">
//         ${cartItems
//           .map(
//             (item) => `
//           <li class="flex py-6" id="${item.id}">
//             <div class="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
//               <img src="${
//                 item.imgSrc
//               }" class="h-full w-full object-cover object-center" />
//             </div>
//             <div class="ml-4 flex flex-1 flex-col">
//               <div>
//                 <div class="flex justify-between text-base font-medium text-gray-900">
//                   <h3>${item.name}</h3>
//                   <p class="ml-4">${formatPrice(item.price * item.quantity)}</p>
//                 </div>
//               </div>
//               <div class="flex flex-1 items-end justify-between">
//                 <div class="flex text-gray-500">
//                   <button class="decrease-btn">-</button>
//                   <div class="mx-2 font-bold">${item.quantity}개</div>
//                   <button class="increase-btn">+</button>
//                 </div>
//                 <button type="button" class="font-medium text-sky-400 hover:text-sky-500">
//                   <p class="remove-btn">삭제하기</p>
//                 </button>
//               </div>
//             </div>
//           </li>
//         `
//           )
//           .join("")}

//       </ul>`;

//   // cartList.innerHTML =
//   //   cartItems.length === 0
//   //     ? "<p>장바구니가 비어있습니다.</p>"
//   //     : `<ul class="divide-y divide-gray-200">${cartItemsHTML}</ul>`;

//   totalCount.textContent = formatPrice(
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
//   );

//   // 이벤트 위임을 사용하여 성능 개선
//   cartList.addEventListener("click", (e) => {
//     const listItem = e.target.closest("li");
//     if (listItem) {
//       const productId = parseInt(listItem.id);
//       if (e.target.classList.contains("remove-btn")) {
//         onRemove(productId);
//       } else if (e.target.classList.contains("decrease-btn")) {
//         onQuantityChange(productId, -1);
//       } else if (e.target.classList.contains("increase-btn")) {
//         onQuantityChange(productId, 1);
//       }
//     }
//   });
// };

export const renderCart = (cartItems, onRemove, onQuantityChange) => {
  const cartList = document.getElementById('cart-list');
  const totalCount = document.getElementById('total-count');

  // 기존 이벤트 핸들러 제거 (이전의 중복된 이벤트를 방지)
  const newCartList = cartList.cloneNode(true);
  cartList.parentNode.replaceChild(newCartList, cartList);

  newCartList.innerHTML =
    cartItems.length === 0
      ? '<p>장바구니가 비어있습니다.</p>'
      : `<ul class="divide-y divide-gray-200">
        ${cartItems
          .map(
            (item) => `
          <li class="flex py-6" id="${item.id}">
            <div class="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
              <img src="${
                item.imgSrc
              }" class="h-full w-full object-cover object-center" />
            </div>
            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>${item.name}</h3>
                  <p class="ml-4">${formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
              <div class="flex flex-1 items-end justify-between">
                <div class="flex text-gray-500">
                  <button class="decrease-btn">-</button>
                  <div class="mx-2 font-bold">${item.quantity}개</div>
                  <button class="increase-btn">+</button>
                </div>
                <button type="button" class="font-medium text-sky-400 hover:text-sky-500">
                  <p class="remove-btn">삭제하기</p>
                </button>
              </div>
            </div>
          </li>
        `
          )
          .join('')}
          
      </ul>`;

  totalCount.textContent = formatPrice(
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  // 새로운 이벤트 핸들러 추가
  newCartList.addEventListener('click', (e) => {
    const listItem = e.target.closest('li');
    if (listItem) {
      const productId = parseInt(listItem.id);
      if (e.target.classList.contains('remove-btn')) {
        onRemove(productId);
      } else if (e.target.classList.contains('decrease-btn')) {
        onQuantityChange(productId, -1);
      } else if (e.target.classList.contains('increase-btn')) {
        onQuantityChange(productId, 1);
      }
    }
  });
};
