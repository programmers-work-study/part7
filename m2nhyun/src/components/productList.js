const formatPrice = (price) => {
  return price.toLocaleString("ko-KR") + "원";
};

// export const renderProductList = (products, onProductClick) => {
//   console.log("renderProductList called");
//   const productCardGrid = document.getElementById("product-card-grid");
//   if (products.length === 0) {
//     productCardGrid.innerHTML = "<p>상품이 없습니다</p>";
//     return;
//   }

//   productCardGrid.innerHTML = products
//     .map(
//       (product) => `
//     <article id="product-card">
//       <div class="rounded-lg overflow-hidden border-2 relative">
//         <img src="${product.imgSrc}" class="object-center object-cover" />
//         <div class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75">
//           <div data-productid="${
//             product.id
//           }" class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer">
//             장바구니에 담기
//           </div>
//         </div>
//       </div>
//       <h3 class="mt-4 text-gray-700">${product.name}</h3>
//       <p class="mt-1 text-lg font-semibold text-gray-900">${formatPrice(
//         product.price
//       )}</p>
//     </article>
//   `
//     )
//     .join("");

//   productCardGrid.addEventListener("click", (e) => {
//     console.log("Product grid clicked");
//     const productElement = e.target.closest("[data-productid]");
//     if (productElement) {
//       const productId = parseInt(productElement.dataset.productid);
//       console.log("Product element clicked:", productId, productElement);
//       onProductClick(productId);
//     } else {
//       console.log("No product element found");
//     }
//   });
// };
export const renderProductList = (products, onProductClick) => {
  const productCardGrid = document.getElementById("product-card-grid");

  // 기존 내용을 비우고 새로 렌더링
  productCardGrid.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("article");
    productElement.id = "product-card";
    productElement.innerHTML = `
      <div class="rounded-lg overflow-hidden border-2 relative">
        <img src="${product.imgSrc}" class="object-center object-cover" />
        <div class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75">
          <div data-productid="${
            product.id
          }" class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer">
            장바구니에 담기
          </div>
        </div>
      </div>
      <h3 class="mt-4 text-gray-700">${product.name}</h3>
      <p class="mt-1 text-lg font-semibold text-gray-900">${product.price.toLocaleString()}원</p>
    `;

    productCardGrid.appendChild(productElement);
  });

  // 이벤트 리스너는 한 번만 등록
  productCardGrid.addEventListener("click", (e) => {
    const productElement = e.target.closest("[data-productid]");
    if (productElement) {
      const productId = parseInt(productElement.dataset.productid);
      onProductClick(productId);
    }
  });
};
