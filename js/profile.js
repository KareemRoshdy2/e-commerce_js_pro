const myOrdersSection = document.querySelector("#myOrdersSection");
const settingsSection = document.querySelector("#settingsSection");

document.addEventListener("click", (e) => {
  if (
    e.target.id === "myOrderLink" ||
    e.target.id === "myOrderIcon" ||
    e.target.id === "myOrderText" ||
    e.target.id === "myOrderRow"
  ) {
    myOrdersSection.classList.add("show");
    settingsSection.classList.remove("show");
  }

  if (
    e.target.id === "settingsLink" ||
    e.target.id === "settingsIcon" ||
    e.target.id === "settingsText"
  ) {
    settingsSection.classList.add("show");
    myOrdersSection.classList.remove("show");
  }

  if (
    e.target.id === "logout" ||
    e.target.id === "logoutIcon" ||
    e.target.id === "logoutText"
  ) {
    window.location = "login.html";
  }

  if (e.target.id === "deleteAccount") {
    window.location = "login.html";
    localStorage.removeItem("user");
    localStorage.removeItem("productsInCart");
  }
});

table.innerHTML = `<p class="loading">loading...</p>`;

setTimeout(() => {
  displayTable();
}, 1000);

document.addEventListener("click", (e) => {
  if (e.target.id === "deleteProduct") {
    const productID = e.target.dataset.prod;
    const getProduct = Products.find((p) => p.id === +productID);

    productsInCart = productsInCart.filter((p) => p.id !== getProduct.id);

    localStorage.removeItem("productsInCart");
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    getProductsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    displayTable();
    addProductIntoCart();
    getTotalPrice();
  }
});

const changeEmail = document.querySelector("#changeEmail");
const changeUsername = document.querySelector("#changeUsername");
const changePassword = document.querySelector("#changePassword");
const nameInput = document.querySelector("#name");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");

let newUser = getUser || {};

changeEmail.addEventListener("submit", (e) => {
  e.preventDefault();
  if (emailInput.value === "") {
    displayAlert("enter new email", "error");
  } else {
    newUser.email = emailInput.value;

    localStorage.setItem("user", JSON.stringify(newUser));
    emailInput.value = "";

    displayAlert("email changed successfully", "success");
  }
});

changeUsername.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameInput.value === "") {
    displayAlert("enter new username", "error");
  } else {
    newUser.username = nameInput.value;

    localStorage.setItem("user", JSON.stringify(newUser));
    nameInput.value = "";

    helloUserName.innerHTML = newUser.username.split(" ")[0];

    displayAlert("username changed successfully", "success");
  }
});

changePassword.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value === "") {
    displayAlert("enter new password", "error");
  } else {
    newUser.password = passwordInput.value;

    localStorage.setItem("user", JSON.stringify(newUser));
    passwordInput.value = "";

    displayAlert("password changed successfully", "success");
  }
});
