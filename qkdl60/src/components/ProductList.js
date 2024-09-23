import Component from './core/Component.js';

export default class ProductList extends Component {
  template() {
    return `<section id="product-list">
          <div
            id="product-card-grid"
            class="grid gap-4 auto-cols-fr grid-cols-2 md:grid-cols-4"
          >
          
        ${this.state
          .map(
            ({ id, imgSrc, name, price }) => `<article id="product-card">
        <div class="rounded-lg overflow-hidden border-2 relative">
          <img
            src=${imgSrc}
            class="object-center object-cover"
          />
          <div
            class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75"
          >
            <div
              data-productid=${id}
              class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer"
            >
              장바구니에 담기
            </div>
          </div>
        </div>
        <h3 class="mt-4 text-gray-700">${name}</h3>
        <p class="mt-1 text-lg font-semibold text-gray-900">${price.toLocaleString()}원</p>
      </article>`
          )
          .join('')}
          </div>
        </section>`;
  }
}
