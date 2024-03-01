var Icon = document.getElementById("Icon");
var Bar = document.getElementById("NavBar");
Icon.addEventListener("click", function () {
    Bar.classList.toggle("Show");
});
var LoginText = document.getElementById("LogIn");
var LoginTextCont = document.getElementById("LogInCont");
var LoginIcon = document.getElementById("LogInIcon");
var SignInText = document.getElementById("SignIn");
var SignInTextCont = document.getElementById("SignInCont");
var SignIcon = document.getElementById("SignInIcon");
var LogoutIcon = document.createElement("i");
LogoutIcon.classList.add("fa-solid");
LogoutIcon.classList.add("fa-1x");
LogoutIcon.classList.add("fa-right-from-bracket");
var CartIcon = document.createElement("i");
CartIcon.classList.add("fa-solid");
CartIcon.classList.add("fa-1x");
CartIcon.classList.add("fa-cart-shopping");
var ChangeState = document.getElementById("ChangeState");
function Change() {
    if (window.localStorage.getItem("Status")) {
        console.log(3);
        LoginText.innerText = "LogOut";
        SignInText.innerText = "Cart";
        SignInText === null || SignInText === void 0 ? void 0 : SignInText.setAttribute("href", "/Library-System-/dist/html/Reader/Cart.html");
        LoginIcon.remove();
        SignIcon.remove();
        LoginTextCont === null || LoginTextCont === void 0 ? void 0 : LoginTextCont.prepend(LogoutIcon);
        SignInTextCont === null || SignInTextCont === void 0 ? void 0 : SignInTextCont.prepend(CartIcon);
        LoginText === null || LoginText === void 0 ? void 0 : LoginText.setAttribute("href", "/Library-System-/dist/html/Fixed/Home.html");
    }
    else {
        console.log(4);
        LoginText === null || LoginText === void 0 ? void 0 : LoginText.setAttribute("href", "/Library-System-/dist/html/Fixed/Login.html");
        SignInText === null || SignInText === void 0 ? void 0 : SignInText.setAttribute("href", "/Library-System-/dist/html/Reader/Register.html");
    }
}
LoginText === null || LoginText === void 0 ? void 0 : LoginText.addEventListener("click", function () {
    if (LoginText.innerText.toLocaleLowerCase() === "logout") {
        console.log(1);
        window.localStorage.setItem("Status", "false");
        Change();
    }
    else {
        console.log(5);
    }
});
ChangeState === null || ChangeState === void 0 ? void 0 : ChangeState.addEventListener("click", function () {
    console.log(2);
    window.localStorage.setItem("Status", "ture");
    Change();
});
