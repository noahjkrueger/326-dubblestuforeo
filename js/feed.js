import * as guzzzleAPI from './guzzzle-api.js'

// await guzzzleAPI.createUser("noah", "1234", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/800px-Twemoji_1f600.svg.png", "bio");
// await guzzzleAPI.createUser("noah1", "1234", "https://static01.nyt.com/images/2021/09/30/fashion/29melting-face-emoji/29melting-face-emoji-mediumSquareAt3X-v2.jpg", "bio");
// await guzzzleAPI.followUser("noah", "noah1");
// await guzzzleAPI.createPost("noah1", "BEER", "https://products3.imgix.drizly.com/ci-coors-light-315ea47b7c9c0280.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20", ["Vodka", "Ginger Beer"], "1. beer", "drink the beer", "crisp, light beer");
// await guzzzleAPI.createPost("noah1", "BEER1", "https://products3.imgix.drizly.com/ci-coors-light-315ea47b7c9c0280.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20", ["Vodka", "Ginger Beer", "Rum"], "1. beer", "drink the beer", "crisp, light beer");
// await guzzzleAPI.likePost("noah", 0);
// await guzzzleAPI.createPost("noah1", "red red wineee", "https://media.gq-magazine.co.uk/photos/5f479e8eeadd3a2aff8f3081/3:2/w_1620,h_1080,c_limit/20200827-wine-07.jpg", ["Vodka", "Carrot"], "1. WINE", "drink wine, get drunk", "red mf wine MFer");
await guzzzleAPI.login("noah", "1234");


const cookie_uid = JSON.parse(window.localStorage.getItem("uid"));
const this_user = await guzzzleAPI.readUser(cookie_uid);

let feed_pids = await guzzzleAPI.getFeed(cookie_uid);
let post_objects = [];
for(const pid of feed_pids) {
    post_objects.push(await guzzzleAPI.readPost(pid));
}
post_objects = post_objects.sort((a, b) => {
    let a_split = a.date.split("/");
    let b_split = b.date.split("/");
    return (100 *(a_split[2] - b_split[2]) + 10 * (a_split[0] - b_split[0]) + a_split[1] - b_split[1]);
});

renderFeed(post_objects, "feed");

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

export async function renderFeed(post_objects, element) {
    const feed = document.getElementById(element);
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
            addClasses(user_bar, ["col-12", "col-sm-10", "btn", "post-options-button", "post-options-profile"]);
            user_bar.href = "./profile.html"; //FIX THIS
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
            addClasses(follow_icon, ["bi-person-check-fill", "icon"]);
            let follow_text = createElement("span");
            addClasses(follow_text, ["button-label"]);
            follow_text.innerText = "Following";
            //add event listener for following from feed
            follow_bar.addEventListener("click", async function(event) {
                if (follow_icon.classList.contains("bi-person-plus")) {
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
            view_guide.href = "./guide.html"; //FIX THIS
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
            if (post_object.pid in this_user.likes) {
                addClasses(like_icon, ["bi-balloon-heart-fill", "icon"]);
            }
            else {
                addClasses(like_icon, ["bi-balloon-heart", "icon"]);
            }
            let like_text = createElement("span");
            addClasses(like_text, ["button-label"]);
            like_text.innerText = "Likes: " + post_object.likes;
            like_guide.addEventListener("click", async function(event) {
                if (like_icon.classList.contains("bi-balloon-heart")) {
                    like_icon.classList.remove("bi-balloon-heart");
                    addClasses(like_icon, ["bi-balloon-heart-fill"]);
                    //like post
                    await guzzzleAPI.likePost(cookie_uid, pid);
                }
                else {
                    like_icon.classList.remove("bi-balloon-heart-fill")
                    //unlike post
                    addClasses(like_icon, ["bi-balloon-heart"]);
                    await guzzzleAPI.unlikePost(cookie_uid, pid);
                }
                event.preventDefault();
            });
            appendChildren(like_guide, [like_icon, like_text]);
        
            //create like guide button
            let comment_guide = createElement("a");
            comment_guide.href="./guide.html#comments" //FIX THIS
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