// Products Array
const Products = productsDB;

const sweetAlert = document.querySelector(".alert");

const helloUser = document.querySelector("#user p");
const helloUserName = document.querySelector("#user p span");
const userList = document.querySelector("#userList");
const loginUser = document.querySelector("#loginUser");
const logout = document.querySelector("#logout");
const shoppingCartList = document.querySelector(".shopping-cart-list");
const loader = document.querySelector("#loader");

let getUser = JSON.parse(localStorage.getItem("user"));
let username = getUser?.username.split(" ")[0];

if (username) {
  loginUser.classList.add("hidden");
  helloUser.classList.add("show");
  helloUserName.innerHTML = username;
}

document.addEventListener("click", (e) => {
  if (e.target.id === "helloUser" || e.target.id === "username") {
    userList.classList.toggle("active");
    shoppingCartList.classList.remove("open");
  } else {
    userList.classList.remove("active");
  }

  if (e.target.id === "shoppingCart") {
    shoppingCartList.classList.toggle("open");
    userList.classList.remove("active");
  }

  if (e.target.id === "closeCart") {
    shoppingCartList.classList.remove("open");
  }

  if (e.target.id === "profilePage") {
    loader.classList.add("start");
    setTimeout(() => {
      window.location = "profile.html";
    }, 1000);
  }

  if (
    e.target.id === "homePage" ||
    e.target.id === "homeLink" ||
    e.target.id === "logoText" ||
    e.target.id === "logoIcon" ||
    e.target.id === "backHomeBtn"
  ) {
    loader.classList.add("start");
    setTimeout(() => {
      window.location = "index.html";
    }, 1000);
  }
});

function displayAlert(message, type) {
  sweetAlert.innerHTML = `${message}`;
  sweetAlert.classList.add("active");
  sweetAlert.id = `${type}`;

  setTimeout(() => {
    sweetAlert.classList.remove("active");
    sweetAlert.id = "";
  }, 2000);
}

// Add Product To Cart
const cartProductsList = document.querySelector("#cartProductsList");
const productsNumber = document.querySelector("#productsNumber");
const totalPriceNumber = document.querySelector("#totalPriceNumber");

let getProductsInCart = JSON.parse(localStorage.getItem("productsInCart"));

let productsInCart = getProductsInCart || [];
let totalPrice = 0;

// ========================================= //
const table = document.querySelector("#ordersTable");
const productsPriceNumber = document.querySelector("#productsPriceNumber");

document.addEventListener("click", (e) => {
  if (e.target.id === "addToCart") {
    if (username) {
      const productID = e.target.dataset.prod;
      const getProduct = Products.find((p) => p.id === +productID);

      const duplicatedProductInLocalStorageStore = getProductsInCart?.find(
        (p) => p.id === getProduct.id
      );

      if (
        !productsInCart.includes(getProduct) &&
        !duplicatedProductInLocalStorageStore
      ) {
        productsInCart.push(getProduct);
        addProductIntoCart();
        getTotalPrice();

        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      } else {
        displayAlert("Product already in your cart", "error");
      }
    } else {
      displayAlert("Please Login First", "error");
    }
  }

  if (e.target.id === "increase") {
    const productID = e.target.dataset.prod;
    const getProduct = Products.find((p) => p.id === +productID);

    increaseProduct(getProduct);
  }

  if (e.target.id === "decrease") {
    const productID = e.target.dataset.prod;
    const getProduct = Products.find((p) => p.id === +productID);

    decreaseProduct(getProduct);
  }

  if (e.target.id === "deleteProductInCart") {
    const productID = e.target.dataset.prod;
    const getProduct = Products.find((p) => p.id === +productID);

    productsInCart = productsInCart.filter(
      (product) => product.id !== getProduct.id
    );

    localStorage.removeItem("productsInCart");
    getProductsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    addProductIntoCart();
    getTotalPrice();
    if (table) displayTable();
  }

  if (e.target.id === "moreDetails") {
    const productID = e.target.dataset.prod;
    const getProduct = Products.find((p) => p.id === +productID);

    localStorage.setItem("product", JSON.stringify(getProduct));
    loader.classList.add("start");
    setTimeout(() => {
      window.location = "productDetails.html";
    }, 1000);
  }
});

function addProductIntoCart() {
  productsNumber.innerHTML = productsInCart.length;
  if (productsInCart.length === 0) {
    cartProductsList.innerHTML = `<p class="no-products">no products</p>`;
  } else {
    cartProductsList.innerHTML = "";
    productsInCart.map(
      (product) =>
        (cartProductsList.innerHTML += `
      <div class="cart-product-box flex space-between" ${product.id} >
        <div class="product-details flex align-center">
          <div class="img">
            <img src=${product.image} alt="productImage" />
          </div>

          <div class="title">
            <p>${product.title} </p>
            <div class="quantity">
              <p>quantity: <span class="qyt-number">${product.qyt} </span></p>
              <div class="qyt-btn flex align-center">
                <button class="btn increase" id="increase" data-prod=${product.id} >+</button>
                <button class="btn decrease" id="decrease" data-prod=${product.id} >-</button>
              </div>
            </div>
          </div>
        </div>

        <div class="price flex align-center space-between">
          <p class="price-number">$${product.price} </p>
          <i
            class="fas fa-trash delete-product"
            id="deleteProductInCart" data-prod=${product.id} 
          ></i>
        </div>
    </div>
      
      `)
    );
  }
}

function getTotalPrice() {
  totalPrice = 0;
  productsInCart.forEach((product) => {
    totalPrice += product.price * product.qyt;
  });
  totalPriceNumber.innerHTML = `$${totalPrice}`;

  if (productsPriceNumber) {
    productsPriceNumber.innerHTML = `$${totalPrice}`;
  }
}

if (getProductsInCart) {
  addProductIntoCart();
  getTotalPrice();
}

function increaseProduct(product) {
  productsInCart.find((p) => {
    if (p.id === product.id) {
      ++p.qyt;
    }
  });

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

  addProductIntoCart();
  getTotalPrice();
}

function decreaseProduct(product) {
  productsInCart.find((p) => {
    if (p.id === product.id && p.qyt > 1) {
      --p.qyt;
    }
  });

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

  addProductIntoCart();
  getTotalPrice();
}

function displayTable() {
  table.innerHTML = "";
  if (productsInCart.length <= 0) {
    table.innerHTML = `<p class="no-products">no products</p>`;
  } else {
    table.innerHTML = `
          <thead>
              <th>image</th>
              <th>title</th>
              <th>price</th>
              <th>delete</th>
          </thead>
    `;

    productsInCart.map((p) => {
      table.innerHTML += `
      <tbody>
        <tr>
          <td>
            <div class="img">
              <img src=${p.image} alt="productImg" />
            </div>
          </td>

          <td>
            <p>${p.title}</p>
          </td>

          <td>$${p.price}</td>

          <td class="delete">
            <i class="fas fa-trash" id="deleteProduct" data-prod=${p.id}></i>
          </td>
        </tr>
    </tbody>
      `;
    });
  }
}
