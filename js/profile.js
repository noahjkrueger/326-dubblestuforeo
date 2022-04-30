import * as feed from './feed.js';
import * as guzzzleAPI from './guzzzle-api.js';

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
    
let userProfile = document.getElementById('user_profile');

const cookie_uid = JSON.parse(window.localStorage.getItem("user-info"));
let obj = await guzzzleAPI.readUser(cookie_uid["uid"]);

let img = createElement('img');
addClasses(img, ["rounded-circle", "profileImg"]);
img.setAttribute("src", obj.profileImage);
let span1 = createElement('p');
addClasses(span1, ["pfpUserName"]); 
span1.innerText = obj.uid;
let span2 = createElement('p');
addClasses(span2, ["user_Bio"]);
span2.innerText = obj.biography;
let div = createElement('div');
addClasses(div, ["dividerLine"]);
appendChildren(userProfile, [img, span1, span2, div]);

const user_feed_pids = obj.posts;
let post_objects = [];
for (let post_pid of user_feed_pids) {
    post_objects.push(await guzzzleAPI.readPost(post_pid));
}
feed.renderFeed(post_objects.reverse(), 'user_feed');