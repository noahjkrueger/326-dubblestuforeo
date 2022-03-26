let logBtn = document.getElementById("login");
let userLogin = document.getElementById("Username").value;
let passLogin = document.getElementById("password").value;
let email = document.getElementById("email").value;
let userSignup = document.getElementById("UsernameSignup").value;
let passSignup = document.getElementById("passwordSignup").value;
let confirmP = document.getElementById("confirm_Password").value;
console.log(userLogin);
logBtn.addEventListener("click", function() {
    console.log("Username: " + userLogin + "Password: " + passLogin)
});
let signBtn = document.getElementById("signup");
signBtn.addEventListener("click", function() {
    console.log("Email: " + email + "Username: " + userSignup + "Password: " + passSignup + "Confirm Password: " + confirmP)
});

