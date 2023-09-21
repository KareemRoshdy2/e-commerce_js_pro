const productsContainer = document.querySelector("#productsContainer");

(function productsUI() {
  productsContainer.innerHTML = `<p class="loading">Loading...</p>`;

  setTimeout(() => {
    productsContainer.innerHTML = "";
    Products.map(
      (product) =>
        (productsContainer.innerHTML += `
      
      <div class="product-box" id=${product.id}>
      <div class="product-category">
        <p>${product.category}</p>
      </div>

      <div class="product-image">
        <img src=${product.image} alt="productImage" />
      </div>

      <div class="product-title">
        <h3>${product.title}</h3>
      </div>

      <div class="product-price flex align-center justify-center">
        <p>price: <span class="product-price-number">$${product.price}</span></p>
      </div>

      <div class="product-box-ctrl flex align-center space-between">
        <button class="btn dark-bnt" id="moreDetails" data-prod=${product.id}>more details</button>

        <button class="btn" id="addToCart" data-prod=${product.id}>add to cart</button>
      </div>
    </div>

      `)
    );
  }, 1500);
})();
