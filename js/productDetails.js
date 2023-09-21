const productDetailsContainer = document.querySelector(".productDetails");

const currentProductDetails = JSON.parse(localStorage.getItem("product"));

productDetailsContainer.innerHTML = `

      <div class="image">
      <img src=${currentProductDetails.image} alt="productImage" />
      </div>

      <div class="product-info">
         <div class="product-info-header flex align-center space-between">
            <p class="product-name">${currentProductDetails.title}</p>
            <p class="product-category">${currentProductDetails.category}</p>
         </div>

         <div class="product-price">
            <p>price: <span class="price-number">$${currentProductDetails.price}</span></p>
         </div>

         <div class="product-description">
            <p>
            ${currentProductDetails.description}
            </p>
         </div>

            <button class="btn" id="addToCart" data-prod=${currentProductDetails.id}>add to cart</button>

            <button class="btn back-home" id="backHomeBtn">back to home</button>
      </div>

`;
