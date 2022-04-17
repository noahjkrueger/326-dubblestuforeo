import * as guzzzleAPI from './guzzzle-api.js'

let logBtn = document.getElementById("login");
let userLogin = document.getElementById("Username").value;
let passLogin = document.getElementById("password").value;
let email = document.getElementById("email").value;
let userSignup = document.getElementById("UsernameSignup").value;
let passSignup = document.getElementById("passwordSignup").value;
let confirmP = document.getElementById("confirm_Password").value;

console.log(userLogin);
logBtn.addEventListener("click", function() {
    const uid = guzzzleAPI.login(userLogin, passLogin);
    console.log("Username: " + userLogin + "Password: " + passLogin)
});

let signBtn = document.getElementById("signup");
signBtn.addEventListener("click", function() {
    if (passSignup === confirmP) {
        const uid = guzzzleAPI.createUser(userSignup, passSignup, "", email);
        window.localStorage.setItem("uid", uid);
    }
    console.log("Email: " + email + "Username: " + userSignup + "Password: " + passSignup + "Confirm Password: " + confirmP)
});

