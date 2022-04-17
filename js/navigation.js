import * as guzzzleAPI from './guzzzle-api.js'
import * as feed from './feed.js';

const nav_bar = document.getElementById("navigation");
const navbar_src = "navbar.html";

const cookie_uid = JSON.parse(window.localStorage.getItem("uid"));
const loggedin_user = await guzzzleAPI.readUser(cookie_uid);

const data = [
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
            "Vermouth"
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

await fetch(navbar_src).then((response) => response.text()).then((html) => {
    nav_bar.innerHTML = html;
    let meat = "";
    data.forEach((entry) => {
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

    const user_profile = document.getElementById("user_profile");
    user_profile.addEventListener('click', event => {
        window.localStorage.setItem("user-info", JSON.stringify({uid: loggedin_user.uid}));
    });
    if (loggedin_user === null) {
        user_profile.innerText = "Login/Signup";
        user_profile.href = "/login.html";
    }
    else {
        let pfp_img = document.createElement("img");
        pfp_img.src = loggedin_user.profileImage;
        pfp_img.alt ="user-profile";
        pfp_img.classList = "d-inline-block align-text-top rounded-circle";
        pfp_img.width = "32";
        pfp_img.height = "32";
        user_profile.appendChild(pfp_img);
        user_profile.href ="/profile.html";
    }

    data.forEach(entry => {
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
        data.forEach((entry) => {
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
        feed.renderFeed(post_objects, "results");
        event.preventDefault();
    });

    const searchBox = document.getElementById("searchBox");
    const serachBoxSubmit = document.getElementById("serachBoxSubmit");
    serachBoxSubmit.addEventListener("click", async function (event){
        const result = await guzzzleAPI.readUser(searchBox.value);
        if (result.hasOwnProperty("error")) {
            window.alert(result.error);
        }
        else {
            window.localStorage.setItem("user-info", JSON.stringify({uid: result.uid}));
            window.location.href = "./profile.html";
        }
    });
});