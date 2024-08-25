import Component from './core/Component.js';
//state 에 {img, id, productName, price}
export default class Product extends Component {
  template() {
    return `<article id="product-card">
              <div class="rounded-lg overflow-hidden border-2 relative">
                <img
                  src=${this.state.imgSrc}
                  class="object-center object-cover"
                />
                <div
                  class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75"
                >
                  <div
                    data-productid=${this.state.id}
                    class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer"
                  >
                    장바구니에 담기
                  </div>
                </div>
              </div>
              <h3 class="mt-4 text-gray-700">${this.state.name}</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">${this.state.price.toLocaleString()}원</p>
            </article>`;
  }
}
