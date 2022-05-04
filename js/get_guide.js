import * as guzzzleAPI from './guzzzle-api.js'

const column1 = document.getElementById('col1');
const column2 = document.getElementById('col2');
const column3 = document.getElementById('col3');

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

const cookie_guide_info = JSON.parse(window.localStorage.getItem("guide-info"));
const cookie_login_uid = await guzzzleAPI.currentUser();
const cookie_uid = cookie_guide_info.uid;   
const cookie_pid = cookie_guide_info.pid;

renderFeed(cookie_login_uid, cookie_uid, cookie_pid, [column1, column2, column3]);

export async function renderFeed(login, uid, pid, columns) {
    let posting_user = await guzzzleAPI.readUser(uid);
    let user_post = await guzzzleAPI.readPost(pid);
    let log = login;

    const col1 = columns[0];
    const col2 = columns[1];
    const col3 = columns[2];

// content1.forEach(col1_content => {

    //first row in col1
    let row_1 = createElement("div");

    //create username and profile
    let user_pfp = createElement("img");
    user_pfp.addEventListener("click", event => {
        window.localStorage.setItem("user-info", JSON.stringify({uid: cookie_uid}));
        window.location.href="../guzzzler";
    });
    user_pfp.src = posting_user.profileImage;
    addClasses(user_pfp, ["rounded-circle", "user-pfp",]);
    let user_name = createElement("span");
    addClasses(user_name, ["button-label", "user_Name"]);
    let user = createElement("h5");
    user.innerText = posting_user.uid;
    appendChildren(user_name, [user]);
    row_1.style.marginTop = "2%";
    appendChildren(row_1, [user_pfp, user_name]);
    //display iff logged in user matches posting user
    if (log != null && log.uid === posting_user.uid) {
        let editButton = createElement('button');
        editButton.innerText = "Edit Post";
        editButton.style.marginLeft = "5%";
        addClasses(editButton, ["btn", "btn-outline-dark"]);
        let deleteButton = createElement('button');
        deleteButton.innerText = "Delete Post";
        deleteButton.style.marginLeft = "5%";
        addClasses(deleteButton, ["btn", "btn-outline-danger"]);
        appendChildren(row_1, [editButton, deleteButton]);
        deleteButton.addEventListener('click', async (e) => {
            const confirm = window.confirm(`Are you sure you want to delete this post? This is permenant.`);
            if (confirm) {
                await guzzzleAPI.deletePost(pid);
            }
            e.preventDefault();
        });
        editButton.addEventListener('click', (e) => {
            window.localStorage.setItem("guide-edit", JSON.stringify({
                pid: user_post.pid
            }));
            window.location.href = "../guzzzlecreate";
            e.preventDefault();
        });
    }

    //Second row in col1
    let row_2 = createElement("div");

    //Title
    let title = createElement("span");
    addClasses(title, ["guide_Title"]);
    let name = createElement("h3");
    name.innerText = user_post.title
    appendChildren(title, [name]);
    appendChildren(row_2, [title]);



    //Third row in col1
    let row_3 = createElement("div");

    //Image
    let guide_img = createElement("img");
    addClasses(guide_img, ["img_Guide"]);
    guide_img.src = user_post.image;
    appendChildren(row_3, [guide_img]);



    //Fourth row in col1
    let row_4 = createElement("div");

    //create likes and date
    let like = createElement("span");
    addClasses(like, ["btn", "post-options-guide-button", "post-options-guide-like", "stars_Guide"]);

    let like_icon = createElement("i");
    if (!log.hasOwnProperty("error") && log.likes.includes(String(user_post.pid))) {
        addClasses(like_icon, ["bi-balloon-heart-fill", "icon"]);
    }
    else {
        addClasses(like_icon, ["bi-balloon-heart", "icon"]);
    }

    let like_text = createElement("span");
    like_text.innerText = user_post.likes;

    like.addEventListener("click", async function(event) {
        if (log.hasOwnProperty("error")) {
            window.location.href="../guzzzlegate";
        }
        else if (like_icon.classList.contains("bi-balloon-heart")) {
            like_icon.classList.remove("bi-balloon-heart");
            addClasses(like_icon, ["bi-balloon-heart-fill"]);
            //like post
            like_text.innerText = user_post.likes + 1;
            await guzzzleAPI.likePost(login.uid, pid);
        }
        else {
            like_icon.classList.remove("bi-balloon-heart-fill")
            //unlike post
            addClasses(like_icon, ["bi-balloon-heart"]);
            like_text.innerText = user_post.likes - 1;
            await guzzzleAPI.unlikePost(login.uid, pid);
        }
        event.preventDefault();
    });
    appendChildren(like, [like_icon, like_text]);
    let date = createElement("span");
    date.innerText = user_post.date;
    appendChildren(row_4, [like, date]);



    //Fifth row in col1
    let row_5 = createElement("div");

    //Table of Ingredients
    let tab = createElement("table");
    addClasses(tab, ["table"]);
    let thead = createElement("thead");
    let tr1 = createElement("tr");
    let th1 = createElement("th");
    addClasses(th1, ["table_Header"]);
    th1.innerText = "Ingredients";
    appendChildren(tr1, [th1]);
    appendChildren(thead, [tr1]);
    let tbody = createElement("tbody");
    let ingred = user_post.ingredient_keys;

    ingred.forEach(ing => {
        let tr = createElement("tr");
        let th = createElement("th");
        th.innerText = ing;
        addClasses(th, ["table_Item"]);
        appendChildren(tr, [th]);
        appendChildren(tbody, [tr]);
    });

    appendChildren(tab, [thead, tbody]);
    appendChildren(row_5, [tab]);

    appendChildren(col1, [row_1, row_2, row_3, row_4, row_5]);
// });



// content2.forEach(col2_content => {

    // First row in col2
    let row_10 = createElement("div");

    //Instructions Header
    let h1 = createElement("h3");
    h1.innerText = "Instructions";
    addClasses(h1, ["instruc_Header"]);

    //Instructions body
    let instruc = createElement("div")
    let steps = [user_post.instructions]

    steps.forEach(step => {
        let s = createElement("p");
        s.innerText = step
        appendChildren(instruc, [s]);
    });
    appendChildren(row_10, [h1, instruc]);
    appendChildren(col2, [row_10]);

    //Second row in col2
    let row_20 = createElement("div");

    //Comments
    let c = createElement("h3");
    c.innerText = "Comments";
    addClasses(c, ["instruc_Header"]);
    appendChildren(row_20, [c]);
    
    let section = createElement("div");
    addClasses(section, ["scrollable"]);

    let comments = await guzzzleAPI.getComments(pid);
    console.log(comments)
    comments.forEach(async function(comment) {
        let wrapper = createElement("span");
        let content = createElement("div");
        let user = createElement("b");
        addClasses(user, ["comments_User"]);
        let comm = createElement("p");
        user.innerText = String(comment.uid) + ': ';
        comm.innerText = comment.comment;
        if (login === comment.uid) {
            let button1 = createElement("button")
            button1.setAttribute("type", "submit");
            button1.innerText = "Delete"
            button1.addEventListener('click', async function(event) {
                //implement delete feature
                wrapper.innerHTML = '';
                await guzzzleAPI.commentDelete(login, pid, comment.comment);
            });
            appendChildren(content, [user, comm, button1]);
            let divide = createElement("hr");
            appendChildren(wrapper, [content, divide])
        }
        else {
            let button2 = createElement("button");
            button2.setAttribute("type", "submit");
            let temp = await guzzzleAPI.checkCommentLike(login, comment.uid, pid, comment.comment);
            let liked = temp.value;
            if (liked) {
                button2.innerText = "Liked" 
            }
            else {
                button2.innerText = "Like"
            }
            button2.addEventListener('click', async function(event) {
                //implement like feature
                if (button2.innerText === "Liked") {
                    button2.innerText = "Like"
                    await guzzzleAPI.unlikeComment(login, comment.uid, pid, comment.comment)
                } else {
                    button2.innerText = "Liked"
                    await guzzzleAPI.likeComment(login, comment.uid, pid, comment.comment)
                }
            });
            appendChildren(content, [user, comm, button2]);
            let divide = createElement("hr");
            appendChildren(wrapper, [content, divide])
        }
        appendChildren(section, [wrapper]);
    });

    appendChildren(row_20, [section]);

    let input = createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Leave a Comment Here!");
    addClasses(input, ["comments_Guide"]);
    appendChildren(row_20, [input]);
    appendChildren(col2, [row_20]);

    let button = createElement("button")
    button.setAttribute("type", "submit");
    button.innerText = "Comment"
    button.addEventListener("click", async function(event) {
        if (log.hasOwnProperty("error")) {
            window.location.href="../guzzzlegate";
        }
        else if (input.value != "" && login != uid) {
            const message = input.value
            let wrapper = createElement("span")
            let comment = createElement("div");
            let user = createElement("b");
            addClasses(user, ["comments_User"]);
            let com = createElement("p");
            user.innerText = String(login) + ': ';
            com.innerText = input.value;
            let del = createElement("button")
            del.setAttribute("type", "submit");
            del.innerText = "Delete"
            let divide = createElement("hr");
            appendChildren(comment, [user, com, del]);
            appendChildren(wrapper, [comment, divide])
            appendChildren(section, [wrapper])
            del.addEventListener('click', async function(event) {
                // delete comment
                wrapper.innerHTML = ''
                await guzzzleAPI.commentDelete(login, pid, message)
            });
            await guzzzleAPI.commentPost(login, pid, message)
            input.value = "";
        }
    });

    appendChildren(row_20, [button]);

    let h2 = createElement("h3");
    h2.innerText = "Related Guides";
    addClasses(h2, ["instruc_Header"]);
    appendChildren(col3, [h2]);


    let login_following_pids = await guzzzleAPI.getFeed(login); // check to make sure users current post not here and duplicates
    if (login_following_pids.hasOwnProperty("error")) {
        login_following_pids = await guzzzleAPI.readOtherPosts(uid, pid);
    }
    let user_following_pids = await guzzzleAPI.getFeed(uid); // check to make sure login's posts not here and duplicates
    let other_user_pids = await guzzzleAPI.readOtherPosts(uid, pid); // already filtered current post, check for duplicates
    let total_pids = [];
    for(const post of login_following_pids) {
        if (post != pid) {
            total_pids.push(post);
        }
    }
    for(const post of user_following_pids) {
        if (!post in total_pids && !post in log.posts) {
            total_pids.push(post);
        }
    }
    for(const post of other_user_pids) {
        if (!post in total_pids) {
            total_pids.push(post);
        }
    }

    total_pids.forEach(async function(post) {
        const related_post_info = await guzzzleAPI.readPost(post)
        const related_user_info = await guzzzleAPI.readUser(related_post_info.uid)
        let p = createElement("div");
        p.addEventListener("click", event => {
            window.localStorage.setItem("guide-info", JSON.stringify({uid: related_user_info.uid, pid: post}));
            window.location.href="../guzzzleguide";
        });
        addClasses(p, ['border_Related']);
        let related_user_pfp = createElement("img");
        related_user_pfp.src = related_user_info.profileImage;
        addClasses(related_user_pfp, ["rounded-circle", "user-pfp",]);
        let related_user_name = createElement("span");
        addClasses(related_user_name, ["button-label", "user_Name"]);
        let related_user = createElement("h5");
        related_user.innerText = related_user_info.uid;
        appendChildren(related_user_name, [related_user]);
        appendChildren(p, [related_user_pfp, related_user_name]);

        let related_title = createElement("span");
        addClasses(related_title, ["guide_Title"]);
        let related_name = createElement("h3");
        related_name.innerText = related_post_info.title;
        appendChildren(related_title, [related_name]);
        appendChildren(p, [related_title]);

        let related_guide_img = createElement("img");
        addClasses(related_guide_img, ["img_Related"]);
        related_guide_img.src = related_post_info.image;
        appendChildren(p, [related_guide_img]);

        appendChildren(col3, [p]);
    });
    
}