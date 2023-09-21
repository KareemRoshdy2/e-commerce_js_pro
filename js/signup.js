const signUpForm = document.querySelector("#signup");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signUpBtn = document.querySelector("#signUpBtn");
const sweetAlert = document.querySelector(".alert");

let user;
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let getUser = JSON.parse(localStorage.getItem("user"));
  let getEmail = getUser?.email;

  if (username.value === "" || email.value === "" || password.value === "") {
    displayAlert("Please enter data", "error");
  } else {
    if (email.value === getEmail) {
      displayAlert("This user already exists", "error");
    } else {
      user = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      localStorage.setItem("user", JSON.stringify(user));

      signUpBtn.innerHTML = "loading...";

      setTimeout(() => {
        window.location = "login.html";
      }, 2000);
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
