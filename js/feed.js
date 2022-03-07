const feed = document.getElementById("feed");
const content = [
    {
        "title": "title1",
        "user": "username1",
        "pfp": "./images/default_pfp.jpg",
        "rating": "rating1",
        "description": "here is the description1",
        "image": "./images/placeholde_beer.jpg"   
    },
    {
        "title": "title1",
        "user": "username1",
        "pfp": "./images/default_pfp.jpg",
        "rating": "rating1",
        "description": "here is the description1",
        "image": "./images/placeholde_beer.jpg"   
    } ,
    {
        "title": "title1",
        "user": "username1",
        "pfp": "./images/default_pfp.jpg",
        "rating": "rating1",
        "description": "here is the description1",
        "image": "./images/placeholde_beer.jpg"   
    }   
];

content.forEach((posting) => {
    let post = document.createElement("div");
    post.classList.add("post");

    let title_div = document.createElement("div");
    title_div.classList.add("post-title");  
    let title_p = document.createElement("p");
    title_p.innerText = posting.title;
    title_div.appendChild(title_p);
    post.appendChild(title_div);

    let username_div = document.createElement("div");
    let user_p = document.createElement("p");
    user_p.innerText = posting.user;
    username_div.appendChild(user_p);
    post.appendChild(username_div);

    let pfp_div = document.createElement("div");
    pfp_div.classList.add("post-pfp");
    let pfp_img = document.createElement("img");
    pfp_img.src = posting.pfp;
    pfp_img.alt = posting.user;
    pfp_div.appendChild(pfp_img);
    post.appendChild(pfp_div);

    let rating_div = document.createElement("div");
    rating_div.classList.add("post-rating");
    rating_div.innerText = posting.rating;
    post.appendChild(rating_div);


    let desc_div = document.createElement("div");
    desc_div.classList.add("post-description")
    let desc_p = document.createElement("p");
    desc_p.innerText = posting.description;
    desc_div.appendChild(desc_p);
    post.appendChild(desc_div);


    let img_div = document.createElement("div");
    img_div.classList.add("post-image");
    let img_img = document.createElement("img");
    img_img.src = posting.image;
    img_img.alt = posting.title;
    img_div.appendChild(img_img);
    post.appendChild(img_div);

    post.appendChild(document.createElement("hr"));
    feed.appendChild(post);
});