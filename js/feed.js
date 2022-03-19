const feed = document.getElementById("feed");
const content = [
    {
        "title": "Bloody Mary",
        "user": "urmom420",
        "pfp": "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1",
        "description": "The original Bloody Mary is believed to have contained seven ingredients: vodka, tomato juice, " +
        "Worcestershire sauce, black pepper, celery salt, Tabasco and lemon juice. But like many classic " +
        "drinks, it has inspired several variations. Popular versions include the Bloody Maria (made with tequila), " +
        "the Red Snapper (spiked with gin) and the Caesar, a Canadian creation that features Clamato juice.", 
        "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/bloody-mary-glass-2258f4e.jpg?quality=90&resize=504,458?quality=90&webp=true&resize=504,458",
        "date": "March 18th, 2022" 
    },
    {
        "title": "title2",
        "user": "username2",
        "pfp": "../images/default_pfp.jpg",
        "description": "here is the description1",
        "image": "../images/placeholde_beer.jpg",
        "date": "date2"   
    } ,
    {
        "title": "title3",
        "user": "username3",
        "pfp": "../images/default_pfp.jpg",
        "description": "here is the description1",
        "image": "../images/placeholde_beer.jpg",
        "date": "date1"   
    }   
];

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

content.forEach(post_content => {
    // containing post div
    let post = createElement("div");
    addClasses(post, ["container-fluid", "post"]);

    //first row in container
    let row_1 = createElement("div");
    addClasses(row_1, ["row"]);

    //create user button
    let user_bar = createElement("a");
    addClasses(user_bar, ["col-12", "col-sm-11", "btn", "post-options-button", "post-options-profile"]);
    user_bar.href = "./profile.html";
    let user_pfp = createElement("img");
    user_pfp.src = post_content.pfp;
    addClasses(user_pfp, ["rounded-circle", "user-pfp"]);
    let user_name = createElement("span");
    addClasses(user_name, ["button-label"]);
    user_name.innerText = post_content.user;
    appendChildren(user_bar, [user_pfp, user_name]);

    //create follow button
    let follow_bar = createElement("a");
    addClasses(follow_bar, ["col", "btn", "post-options-button", "post-options-follow"]);
    let follow_icon = createElement("i");
    follow_icon.id = "follow-icon";
    addClasses(follow_icon, ["bi-person-plus", "icon"]);
    let follow_text = createElement("span");
    addClasses(follow_text, ["button-label"]);
    follow_text.innerText = "Follow";
    //add event listener for following from feed
    follow_bar.addEventListener("click", event => {
        if (follow_icon.classList.contains("bi-person-plus")) {
            follow_icon.classList.remove("bi-person-plus");
            addClasses(follow_icon, ["bi-person-check-fill"]);
            console.log("Follow: " + post_content.user);
        }
        else {
            follow_icon.classList.remove("bi-person-check-fill");
            addClasses(follow_icon, ["bi-person-plus"]);
            console.log("Unfollow: " + post_content.user);
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
    post_title.innerText = post_content.title;
    let post_date = createElement("div");
    addClasses(post_date, ["post-info-date"]);
    post_date.innerText = "Posted " + post_content.date;

    //add to row_2
    appendChildren(row_2, [post_title, post_date]);

    //create thrid row
    let row_3 = createElement("div");
    addClasses(row_3, ["row"]);
    let post_img = createElement("img");
    addClasses(post_img, ["post-image"]);
    post_img.src = post_content.image;

    //add ro row_3
    appendChildren(row_3, [post_img]);

    //create fourth row
    let row_4 = createElement("div");
    addClasses(row_4, ["row", "post-body-description"]);
    row_4.innerText = post_content.description;

    //create last row
    let row_5 = createElement("div");
    addClasses(row_5, ["row"]);
    
    //create view guide button
    let view_guide = createElement("a");
    view_guide.href = "./guide.html";
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
    addClasses(like_icon, ["bi-balloon-heart", "icon"]);
    let like_text = createElement("span");
    addClasses(like_text, ["button-label"]);
    like_text.innerText = "Like";
    like_guide.addEventListener("click", event => {
        if (like_icon.classList.contains("bi-balloon-heart")) {
            like_icon.classList.remove("bi-balloon-heart");
            addClasses(like_icon, ["bi-balloon-heart-fill"]);
            console.log("Like: " + post_content.title);
        }
        else {
            like_icon.classList.remove("bi-balloon-heart-fill");
            addClasses(like_icon, ["bi-balloon-heart"]);
            console.log("Unlike: " + post_content.title);
        }
        event.preventDefault();
    });
    appendChildren(like_guide, [like_icon, like_text]);

    //create like guide button
    let comment_guide = createElement("a");
    comment_guide.href="./guide.html#comments"
    addClasses(comment_guide, ["col", "btn", "post-options-button", "post-options-comment"]);
    let comment_icon = createElement("i");
    addClasses(comment_icon, ["bi-chat", "icon"]);
    let comment_text = createElement("span");
    addClasses(comment_text, ["button-label"]);
    comment_text.innerText = "Comment";
    appendChildren(comment_guide, [comment_icon, comment_text]);

    appendChildren(row_5, [like_guide, comment_guide, view_guide]);

    //place all rows in container
    appendChildren(post, [row_1, row_5, row_2, row_3, row_4]);
    //add this post to feed
    feed.appendChild(post);
});