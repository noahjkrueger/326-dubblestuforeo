import renderFeed from './feed.js'
import * as guzzzleAPI from './guzzzle-api.js'

const appendChildren = function (element, children) {
    children.forEach(child => {
        element.appendChild(child);
    });
};

const addClasses = function (element, classlist) {
    classlist.forEach(class_name => {
        element.classList.add(class_name);
    });
};

const createElement = function (element_name) {
    return document.createElement(element_name);
};

const cookie_uid = JSON.parse(window.localStorage.getItem("uid"));
const obj = guzzzleAPI.readUser(cookie_uid);
let userFeed = document.getElementById('user_feed');
let userProfile = document.getElementById('user-profile');

let img = createElement('img');
addClasses(img, ["rounded-circle", "profileImg"]);
img.setAttribute("src", obj.profileImage);
let span1 = createElement('span');
addClasses(span1, ["pfpUserName"]);
span2.innerText = cookie_uid;
let span2 = createElement('span');
addClasses(span2, ["user_Bio"]);
span2.innerText = obj.biography;
let div = createElement('div');
addClasses(div, ["dividerLine"]);
appendChildren(userProfile, [img, span1, span2, div]);

let PIDs = [];
obj.posts.forEach(post => PIDs.push(post));

renderFeed(PIDs, userFeed);


