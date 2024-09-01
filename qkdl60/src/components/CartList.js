import Component from './core/Component.js';
import { showAlert } from '../utils/utils.js';
export default class CartList extends Component {
  setup() {
    this.$target.addEventListener('click', (event) => {
      const $target = event.target;
      const $item = $target.closest('li');
      if ($item) {
        const targetId = $item.id;
        const itemList = this.state.list;
        let nextListValue = this.state.list;
        if ($target.className === 'increase-btn') {
          nextListValue = itemList.map((i) => {
            if (i.id == targetId) {
              return { ...i, count: i.count + 1 };
            } else return i;
          });
        } else if ($target.className === 'decrease-btn') {
          nextListValue = itemList.map((i) => {
            if (i.id == targetId) {
              return { ...i, count: i.count - 1 };
            } else return i;
          });
        } else if ($target.className === 'remove-btn') {
          nextListValue = itemList.filter((i) => i.id != targetId);
        }

        if (!nextListValue) return;
        console.log(nextListValue);
        if (nextListValue.some((i) => i.count > 10)) {
          showAlert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
          return;
        }
        if (nextListValue.some((i) => i.count < 1)) {
          showAlert('장바구니에 담을 수 있는 최소 수량은 1개입니다.');
          return;
        }
        this.setState({
          total: nextListValue.reduce(
            (acc, item) => acc + item.count * item.price,
            0
          ),
          list: nextListValue,
        });
        openCart();
      }
    });
  }
  template() {
    return ` <section
          class="pointer-events-auto w-screen max-w-md transition ease-in-out duration-500 translate-x-full"
          id="shopping-cart"
        >
          <div
            class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
          >
            <div class="flex-1 overflow-y-auto p-6">
              <div class="flex items-start justify-between">
                <h2 class="text-xl font-bold">장바구니</h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      id="close-cart-btn"
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <!-- 아래 하드코딩 되어있는 장바구니 목록들을 유저 상호작용에 맞게 렌더링 되도록 변경해주세요. -->
              <div id="cart-list">
              <ul class="divide-y divide-gray-200">
              ${this.state.list
                .map(
                  (item) => ` <li class="flex py-6" id=${item.id}>
                    <div
                      class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
                    >
                      <img
                        src=${item.imgSrc}
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div
                          class="flex justify-between text-base font-medium text-gray-900"
                        >
                          <h3>${item.name}</h3>
                          <p class="ml-4">${item.price.toLocaleString()}원</p>
                        </div>
                      </div>
                      <div class="flex flex-1 items-end justify-between">
                        <div class="flex text-gray-500">
                          <button class="decrease-btn">-</button>
                          <div class="mx-2 font-bold">${item.count}개</div>
                          <button class="increase-btn">+</button>
                        </div>
                        <button
                          type="button"
                          class="font-medium text-sky-400 hover:text-sky-500"
                        >
                          <p class="remove-btn">삭제하기</p>
                        </button>
                      </div>
                    </div>
                  </li>`
                )
                .join('')}
              </ul>
              </div>
            </div>
            <div class="border-t border-gray-200 p-6">
              <div class="flex justify-between font-medium">
                <p>결제금액</p>
                <p class="font-bold" id="total-count">${this.state.total.toLocaleString()}원</p>
              </div>
              <a
                id="payment-btn"
                href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-sky-400 px-6 py-3 mt-6 font-medium text-white shadow-sm hover:bg-sky-500"
                >결제하기</a
              >
              <div
                class="mt-6 flex justify-center text-center text-sm text-gray-500"
              >
                <p>
                  또는
                  <button
                    type="button"
                    class="font-medium text-sky-400 hover:text-sky-500"
                  >
                    쇼핑 계속하기
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>`;
  }
}

function openCart() {
  const $backDrop = document.querySelector('#backdrop');
  $backDrop.removeAttribute('hidden');
  const $shoppingCart = document.querySelector('#shopping-cart');
  $shoppingCart.classList.replace('translate-x-full', 'translate-x-0');
}
