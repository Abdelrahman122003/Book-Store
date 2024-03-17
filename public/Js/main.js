// The Navbar Openning and Cloing Function
let Icon = document.getElementById("Icon");
let Bar = document.getElementById("NavBar");
Icon.addEventListener("click", function () {
  Bar.classList.toggle("Show");
});

// Error Message Function
function ErrorMessage(Title, Text) {
  let container = document.createElement("div");
  let TheTitle = document.createElement("h2");
  let Themessage = document.createElement("p");
  Themessage.innerHTML = Text;
  TheTitle.innerHTML = Title;
  container.classList.add("Error");
  container.appendChild(TheTitle);
  container.appendChild(Themessage);
  document.body.appendChild(container);

  TheTitle.style.cssText =
    "font-size: x-large;font-weight: 900;text-transform: uppercase;color: red;";
  Themessage.style.cssText =
    "font-size: x-large;font-weight: 700;text-transform: lowercase;color: white;";
  container.style.cssText =
    "z-index: 100;box-shadow: 20px 25px 25px #d62020;width: fit-content; padding: 5px 80px;text-align: center;border-radius: 10px;background-color: black;position:absolute;top:80%;right:0%";

  window.setTimeout(() => {
    container.style.display = "none";
  }, 5000);
}
// Change Navbar Components Form User Mode to Customer Mode
let Text1 = document.getElementById("LogIn");
let Text2 = document.getElementById("SignIn");
let Icon1 = document.getElementById("LogInIcon");
let Icon2 = document.getElementById("SignInIcon");
let LoginLink = "../Fixed/Login.html";
let RegisterLink = "../Reader/Register.html";
let LogoutLink = "../Fixed/Home.html";
let CartLink = "../Reader/Cart.html";

function Login() {
  if (localStorage.getItem("Logged")) {
    console.log(122003);
    Text1.innerHTML = "LOGOUT";
    Text2.innerHTML = "CART";

    Icon1.classList.remove("fa-right-to-bracket");
    Icon1.classList.add("fa-right-from-bracket");

    Icon2.classList.remove("fa-regular");
    Icon2.classList.remove("fa-user");
    Icon2.classList.add("fa-solid");
    Icon2.classList.add("fa-cart-shopping");

    Text1.href = LogoutLink;
    Text2.href = CartLink;
  }
}

function Logout() {
  if (!localStorage.getItem("Logged")) {
    Text1.innerHTML = "LOGIN";
    Text2.innerHTML = "REGISTER";
    Icon1.classList.remove("fa-right-from-bracket").add("fa-right-to-bracket");
    Icon2.classList
      .remove("fa-soild")
      .remove("fa-cart-shopping")
      .add("fa-regular")
      .add("fa-user");
    Text1.href = LoginLink;
    Text2.href = RegisterLink;
  }
}
