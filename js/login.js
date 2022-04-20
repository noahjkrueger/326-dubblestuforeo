import * as guzzzleAPI from './guzzzle-api.js'

let logBtn = document.getElementById('login');
let userLogin = document.getElementById('Username');
let passLogin = document.getElementById('password');
let email = document.getElementById("email");
let userSignup = document.getElementById('UsernameSignup');
let passSignup = document.getElementById('passwordSignup');
let confirmP = document.getElementById('confirm_Password');
let notice = document.getElementById('notice');
let checkBox1 = document.getElementById('checkbox1');
let checkBox2 = document.getElementById('checkbox2');
let checkBox3 = document.getElementById('checkbox3');

checkBox1.addEventListener("click", function visible() {
    let x = passSignup;
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

checkBox2.addEventListener("click", function visible() {
    let x = confirmP;
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

checkBox3.addEventListener("click", function visible() {
    let x = passLogin;
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

logBtn.addEventListener("click", function() {
    const uid = guzzzleAPI.login(userLogin.value, passLogin.value);
    let user = guzzzleAPI.readUser(uid);
    console.log("Username: " + userLogin.value + "Password: " + passLogin.value);
});

let signBtn = document.getElementById('signup');
signBtn.addEventListener("click", function() {
    let check = email.value;
    let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailPattern.test(check) && (passSignup.value === confirmP.value)) {
        notice.innerText = "";
        const uid = guzzzleAPI.createUser(userSignup.value, passSignup.value, "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1", "");      
        alert("User has been created!");
        return true;
    } else if (!(emailPattern.test(check))) {
        alert("Retry with a valid Email");
        return false;
    } else if (!(passSignup.value === confirmP.value)) {
        notice.innerText = "*passwords must match*";
    } else {
        notice.innerText = "*passwords must match*";
        alert("Retry with a valid Email");
        return false;
    }
});