import * as guzzzleAPI from './guzzzle-api.js';

const nav_search_data = [
    {
        "icon": "/images/booze.png",
        "type": "Booze",
        "list": [
            "Brandy",
            "Gin",
            "Rum",
            "Tequlia",
            "Vodka",
            "Whiskey",
            "Bourbon",
            "Scotch",
            "Liqueur",
            "Vermouth",
            "Red Wine",
            "White Wine",
            "Beer",
            "Sake"
        ]
    },
    {
        "icon": "/images/juice.png",
        "type": "Juice",
        "list": [
            "Lemon Juice",
            "Lime Juice",
            "Orange Juice",
            "Pineapple Juice",
            "Cranberry Juice",
            "Tomato Juice",
            "Lemonade",
            "Tonic Water",
            "Seltzer Water",
            "Ginger Beer"
        ]
    },
    {
        "icon": "/images/fruit.png",
        "type": "Fruit",
        "list": [
            "Lemon",
            "Lime",
            "Olive",
            "Orange",
            "Pineapple",
            "Strawberry",
            "Watermelon",
            "Marachino Cherry",
            "Rasberry"
        ]
    },
    {
        "icon": "/images/vegtable.png",
        "type": "Vegtable",
        "list": [
            "Carrot",
            "Celery",
            "Pepper",
            "Cucumber",
            "Pickle"
        ]
    },
    {
        "icon": "/images/garnish.png",
        "type": "Garnish",
        "list": [
            "Mint",
            "Cinnamon",
            "Salt",
            "Sugar",
            "Flowers",
            "Nutmeg",
            "Ginger"
        ]
    }
];

let cookie_uid = null;
let this_user = null;

async function refreshCookie() {
    cookie_uid = JSON.parse(window.localStorage.getItem("uid"));
    this_user = await guzzzleAPI.readUser(cookie_uid);
}

renderFeed(null, "content");

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

async function renderLogin(element) {
    renderNav("nav");
    const login_page = document.getElementById(element);
    await fetch("../templates/login.html").then((response) => response.text()).then((html) => {
        login_page.innerHTML = html;
        let logBtn = document.getElementById('loginbutton');
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
        logBtn.addEventListener("click", async function(e) {
            const result = await guzzzleAPI.login(userLogin.value, passLogin.value);
            if (!result.hasOwnProperty("error")) {
                renderFeed(null, "content");
            }
        });

        let signBtn = document.getElementById('signup');
        signBtn.addEventListener("click", async function() {
            let check = email.value;
            let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(emailPattern.test(check) && (passSignup.value === confirmP.value)) {
                notice.innerText = "";
                const uid = await guzzzleAPI.createUser(userSignup.value, passSignup.value, "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1", "");      
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
    });
}

async function renderNav(element) {
    await refreshCookie();
    const nav = document.getElementById(element);
    await fetch("../templates/navbar.html").then((response) => response.text()).then((html) => {
        nav.innerHTML = html;
        let meat = "";
        nav_search_data.forEach((entry) => {
            meat = meat + 
            "<li class=\"nav-item\">" +
                "<nav class=\"navbar navbar-light bg-light\">" +
                    "<div class=\"container-fluid\">" +
                        "<a class=\"navbar-brand\">" +
                            "<img src=\"" + entry.icon +"\" alt=\"" + entry.type +"\" width=\"30\" height=\"24\" class=\"d-inline-block align-text-top\"> " + entry.type + 
                        "</a>" +
                        "<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#" + entry.type + "List\" aria-controls=\"navbarToggleExternalContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">" + 
                            "<span class=\"navbar-toggler-icon\"></span>" + 
                        "</button>" + 
                    "</div>" +
                "</nav>" + 
                "<div class=\"collapse\" id=\"" + entry.type + "List\">" + 
                    "<div class=\"bg-light p-4\"\>"
                    entry.list.forEach((ingred) => {
                        meat = meat + 
                        "<div class=\"form-check\">" +
                            "<input id=\"" + ingred +"\" class=\"form-check-input\" type=\"checkbox\" id=\"flexCheckDefault\">" +
                            "<label class=\"form-check-label\" for=\"" + ingred + "\"\>" + ingred + "</label>" +
                        "</div>";
                    });
            meat = meat + 
                    "</div>" + 
                "</div>" +
            "</li>";
        });
        const ingredientList = document.getElementById("ingredientList");
        ingredientList.innerHTML = ingredientList.innerHTML + meat;

        const logo = document.getElementById("logo");
        logo.addEventListener("click", event => {
            renderFeed("content");
        });

        const user_profile = document.getElementById("user_profile");
        user_profile.addEventListener('click', event => {
            if (this_user.hasOwnProperty("error")) {
                renderLogin("content");
            }
            else {
                renderProfile(this_user.uid, "content");
            }
        });
        user_profile.href="";
        if (this_user.hasOwnProperty("error")) {
            user_profile.innerText = "Login/Signup";
        }
        else {
            let pfp_img = document.createElement("img");
            pfp_img.src = this_user.profileImage;
            pfp_img.alt ="user-profile";
            pfp_img.classList = "d-inline-block align-text-top rounded-circle";
            pfp_img.width = "32";
            pfp_img.height = "32";
            user_profile.appendChild(pfp_img);
        }
        nav_search_data.forEach(entry => {
            entry.list.forEach(ingred => {
                let box = document.getElementById(ingred);
                box.addEventListener("click", event => {
                    if (box.hasAttribute("checked")) {
                        box.removeAttribute("checked");
                    }
                    else {
                        box.setAttribute("checked", "");
                    }
                });
            });
        });
        const ingredientQuerySubmit = document.getElementById("ingredientQuerySubmit");
        ingredientQuerySubmit.addEventListener("click", async function (event){
            let formInfo = [];
            nav_search_data.forEach((entry) => {
                entry.list.forEach((ingred) => {
                    let test = document.getElementById(ingred);
                    if (test.hasAttribute("checked")) {
                        formInfo.push(test.id.replace(" ", "_"));
                    }
                });
            });
            const results = await guzzzleAPI.queryPosts(formInfo);
            let result_order = [];
            for (const result of Object.keys(results)) {
                result_order.push(result);
            }
            result_order = result_order.sort((a, b) => results[b] - results[a]);
            let post_objects = [];
            for (const pid in result_order) {
                post_objects.push(await guzzzleAPI.readPost(pid));
            }
            renderFeed(post_objects, "results");
            event.preventDefault();
        });

        const searchBox = document.getElementById("searchBox");
        const serachBoxSubmit = document.getElementById("serachBoxSubmit");
        serachBoxSubmit.addEventListener("click", async function (event){
            const result = await guzzzleAPI.readUser(searchBox.value);
            if (result.hasOwnProperty("error")) {
                window.alert(result.error);
                event.preventDefault();
            }
            else {
                
                renderProfile(result.uid, "content");
                event.preventDefault();
            }
        });
    });
}

async function renderProfile(uid, element) {
    await refreshCookie();
    renderNav("nav");
    const profile = document.getElementById(element);
    profile.innerHTML = "";
    let userProfile = document.createElement("div");
    let userFeed = document.createElement("div");
    userFeed.id = "user_feed";
    let obj = await guzzzleAPI.readUser(uid);
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
    for (const pid in user_feed_pids) {
        post_objects.push(await guzzzleAPI.readPost(pid));
    }
    profile.appendChild(userProfile);
    profile.appendChild(userFeed);
    await renderFeed(post_objects, "user_feed");
}

async function renderGuide(uid, pid, element) {
    await refreshCookie();
    const guide = document.getElementById(element);
    await fetch("../templates/guide.html").then((response) => response.text()).then((html) => {
        guide.innerHTML = html;
    });
}

async function renderFeed(post_objects, element) {
    await refreshCookie();
    renderNav("nav");
    const feed = document.getElementById(element);
    feed.innerHTML = "";
    if (post_objects === null && cookie_uid !== null) {
        post_objects = [];
        let feed_pids = await guzzzleAPI.getFeed(cookie_uid);
        for(const pid of feed_pids) {
            post_objects.push(await guzzzleAPI.readPost(pid));
        }
        post_objects = post_objects.sort((a, b) => {
            let a_split = a.date.split("/");
            let b_split = b.date.split("/");
            return (2000 *(a_split[2] - b_split[2]) + 100 * (a_split[0] - b_split[0]) + a_split[1] - b_split[1]);
        });
    }
    else if (post_objects === null) {
        post_objects = [];  
        const default_feed = [0, 1, 2];
        for (const pid in default_feed) {
            post_objects.push(await guzzzleAPI.readPost(pid));
        }
        post_objects = post_objects.sort((a, b) => {
            return b.likes - a.likes;
        });
    }
    if (post_objects === null || post_objects.length === 0) {
        feed.innerHTML = 
        "<img class =\"empty-feed-img\" src=\"https://atlas-content-cdn.pixelsquid.com/stock-images/empty-beer-mug-glass-oJvMKWB-600.jpg\">" +
        "<h2 style=\'text-align: center\'>Your feed or search has no posts. Search some guides and follow your friends!</h2>";
    }
    for (const post_object of post_objects) {
            //get the user that posted it
            let posting_user = await guzzzleAPI.readUser(post_object.uid);

            // containing post div
            let post = createElement("div");
            addClasses(post, ["container-fluid", "post"]);
        
            //first row in container
            let row_1 = createElement("div");
            addClasses(row_1, ["row"]);
        
            //create user button
            let user_bar = createElement("a");
            user_bar.addEventListener('click', event => {
                renderProfile(post_object.uid, "content");
            });
            addClasses(user_bar, ["col-12", "col-sm-10", "btn", "post-options-button", "post-options-profile"]);
            let user_pfp = createElement("img");
            //set pfp from posting_user
            user_pfp.src = posting_user.profileImage;
            addClasses(user_pfp, ["rounded-circle", "user-pfp"]);
            let user_name = createElement("span");
            addClasses(user_name, ["button-label"]);
            //set username as uid of poster
            user_name.innerText = posting_user.uid;
            appendChildren(user_bar, [user_pfp, user_name]);
        
            //create follow button
            let follow_bar = createElement("a");
            addClasses(follow_bar, ["col", "btn", "post-options-button", "post-options-follow"]);
            let follow_icon = createElement("i");
            follow_icon.id = "follow-icon";
            let follow_text = createElement("span");
            addClasses(follow_text, ["button-label"]);
            if (!this_user.hasOwnProperty("error") && this_user.following.includes(post_object.uid)) {
                addClasses(follow_icon, ["bi-person-check-fill", "icon"]);
                follow_text.innerText = "Following";
            }
            else {
                addClasses(follow_icon, ["bi-person-plus", "icon"]);
                follow_text.innerText = "Follow";
            }
            //add event listener for following from feed
            follow_bar.addEventListener("click", async function(event) {
                if (cookie_uid === null) {
                    renderLogin("content");
                }
                else if (follow_icon.classList.contains("bi-person-plus")) {
                    follow_icon.classList.remove("bi-person-plus");
                    addClasses(follow_icon, ["bi-person-check-fill"]);
                    //follow user
                    follow_text.innerText = "Following";
                    await guzzzleAPI.followUser(cookie_uid, posting_user.uid);
                }
                else {
                    follow_icon.classList.remove("bi-person-check-fill");
                    addClasses(follow_icon, ["bi-person-plus"]);
                    //unfollow user
                    follow_text.innerText = "Follow";
                    await guzzzleAPI.unfollowUser(cookie_uid, posting_user.uid);
                }
                event.preventDefault();
            });
            appendChildren(follow_bar, [follow_icon, follow_text]);
        
            //add to row_1
            appendChildren(row_1, [user_bar, follow_bar]);
        
            //second row in container
            let row_2 = createElement("div");
            addClasses(row_2, ["row", "post-info"]);
            //create title/date
            let post_title = createElement("div");
            addClasses(post_title, ["post-info-title"]);
            //set post title from post object
            post_title.innerText = post_object.title;
            let post_date = createElement("div");
            addClasses(post_date, ["post-info-date"]);
            //set post date from post object
            post_date.innerText = "Posted: " + post_object.date;
        
            //add to row_2
            appendChildren(row_2, [post_title, post_date]);
        
            //create thrid row
            let row_3 = createElement("div");
            addClasses(row_3, ["row"]);
            let post_img = createElement("img");
            addClasses(post_img, ["post-image"]);
            //set post image to post object image
            post_img.src = post_object.image;
        
            //add ro row_3
            appendChildren(row_3, [post_img]);
        
            //create fourth row
            let row_4 = createElement("div");
            addClasses(row_4, ["row", "post-body-description"]);
            row_4.innerText = post_object.description;
        
            //create last row
            let row_5 = createElement("div");
            addClasses(row_5, ["row"]);
            
            //create view guide button
            let view_guide = createElement("a");
            //add event listener to use local storage on click
            //so when guide is viewed, know where from
            view_guide.addEventListener('click', event => {
                renderGuide(post_object.uid, post_object.pid, "content");
            });
            addClasses(view_guide, ["col-sm-8", "col-12", "btn", "post-options-button", "post-options-view"]);
            let view_icon = createElement("i");
            addClasses(view_icon, ["bi-cup-straw", "icon"]);
            let view_text = createElement("span");
            addClasses(view_text, ["button-label"]);
            view_text.innerText = "View Guide";
            appendChildren(view_guide, [view_icon, view_text]);
        
            //create like guide button
            let like_guide = createElement("a");
            addClasses(like_guide, ["col", "btn", "post-options-button", "post-options-like"]);
            let like_icon = createElement("i");
            if (!this_user.hasOwnProperty("error") && this_user.likes.includes(String(post_object.pid))) {
                addClasses(like_icon, ["bi-balloon-heart-fill", "icon"]);
            }
            else {
                addClasses(like_icon, ["bi-balloon-heart", "icon"]);
            }
            let like_text = createElement("span");
            addClasses(like_text, ["button-label"]);
            like_text.innerText = "Likes: " + post_object.likes;
            like_guide.addEventListener("click", async function(event) {
                if (cookie_uid === null) {
                    renderLogin("content");
                }
                else if (like_icon.classList.contains("bi-balloon-heart")) {
                    like_icon.classList.remove("bi-balloon-heart");
                    addClasses(like_icon, ["bi-balloon-heart-fill"]);
                    //like post
                    await guzzzleAPI.likePost(cookie_uid, post_object.pid);
                }
                else {
                    like_icon.classList.remove("bi-balloon-heart-fill")
                    //unlike post
                    addClasses(like_icon, ["bi-balloon-heart"]);
                    await guzzzleAPI.unlikePost(cookie_uid, post_object.pid);
                }
            });
            appendChildren(like_guide, [like_icon, like_text]);
        
            //create like guide button
            let comment_guide = createElement("a");
            comment_guide.addEventListener('click', event => { 
                renderGuide(post_object.uid, post_object.pid, "content");
            });
            addClasses(comment_guide, ["col", "btn", "post-options-button", "post-options-comment"]);
            let comment_icon = createElement("i");
            addClasses(comment_icon, ["bi-chat", "icon"]);
            let comment_text = createElement("span");
            addClasses(comment_text, ["button-label"]);
            comment_text.innerText = "Comments: " + post_object.comments.length;
            appendChildren(comment_guide, [comment_icon, comment_text]);
        
            appendChildren(row_5, [like_guide, comment_guide, view_guide]);
        
            //place all rows in container
            appendChildren(post, [row_1, row_5, row_2, row_3, row_4]);
            //add this post to feed
            feed.appendChild(post);
    }
}