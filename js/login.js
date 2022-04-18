import * as guzzzleAPI from './guzzzle-api.js'

let logBtn = document.getElementById('login');
let userLogin = document.getElementById('Username');
let passLogin = document.getElementById('password');
let email = document.getElementById("email");
let userSignup = document.getElementById('UsernameSignup');
let passSignup = document.getElementById('passwordSignup');
let confirmP = document.getElementById('confirm_Password');
let notice = document.getElementById('notice');


logBtn.addEventListener("click", function() {
    const uid = guzzzleAPI.login(userLogin, passLogin);
    console.log("Username: " + userLogin.value + "Password: " + passLogin.value);
});

let signBtn = document.getElementById('signup');
signBtn.addEventListener("click", function() {
    if (passSignup.value === confirmP.value) {
        notice.innerText = "";
        const uid = guzzzleAPI.createUser(userSignup.value, passSignup.value, "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1", "");
        window.localStorage.setItem("uid", uid); // ask noah about this
    } else {
        notice.innerText = "*passwords must match*";
    }
    console.log("Email: " + email.value + "Username: " + userSignup.value + "Password: " + passSignup.value+ "Confirm Password: " + confirmP.value);
});

