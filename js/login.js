const loginForm = document.querySelector("#login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const sweetAlert = document.querySelector(".alert");

let getUser = JSON.parse(localStorage.getItem("user"));
const getEmail = getUser?.email;
const getPassword = getUser?.password;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (email.value === "" || password.value === "") {
    displayAlert("Please enter all information", "error");
  } else {
    if (email.value === getEmail && password.value === getPassword) {
      loginBtn.innerHTML = "loading...";

      setTimeout(() => {
        window.location = "index.html";
      }, 2000);
    } else {
      displayAlert("invalid email or password!", "error");
    }
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
