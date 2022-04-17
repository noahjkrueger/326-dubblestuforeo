import * as guzzzleAPI from './guzzzle-api.js'

const nav_bar = document.getElementById("navigation");
const navbar_src = "navbar.html";

//update data
//uid cookie -> modify pfp
//create query functionality
// display results?

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

fetch(navbar_src).then((response) => response.text()).then((html) => {
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
    ingredientQuerySubmit.addEventListener("click", (event) => {
        let formInfo = [];
        data.forEach((entry) => {
            entry.list.forEach((ingred) => {
                let test = document.getElementById(ingred);
                if (test.hasAttribute("checked")) {
                    formInfo.push(test.id);
                }
            });
        });
        formInfo.forEach(point => {
            console.log(point);
        });
        event.preventDefault();
    });

    const ingredientQueryClear = document.getElementById("ingredientQueryClear");
    ingredientQueryClear.addEventListener("click", (event) => {
        console.log("This button does not behave correctly");
        data.forEach(entry => {
            entry.list.forEach(ingred => {
                let box = document.getElementById(ingred);
                box.removeAttribute("checked");
            });
        });
    });

    const searchBox = document.getElementById("searchBox");
    const serachBoxSubmit = document.getElementById("serachBoxSubmit");
    serachBoxSubmit.addEventListener("click", event => {
        console.log(searchBox.value);
        event.preventDefault();
    });
});

// fetch(navbar_src).then((response) => response.text()).then((html) => {
//     nav_bar.innerHTML = html;
//     let meat = "";
//     data.forEach((entry) => {
//         meat = meat + 
//         "<li class=\"nav-item\">" +
//             "<nav class=\"navbar navbar-light bg-light\">" +
//                 "<div class=\"container-fluid\">" +
//                     "<a class=\"navbar-brand\">" +
//                         "<img src=\"" + entry.icon +"\" alt=\"" + entry.type +"\" width=\"30\" height=\"24\" class=\"d-inline-block align-text-top\"> " + entry.type + 
//                     "</a>" +
//                     "<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#" + entry.type + "List\" aria-controls=\"navbarToggleExternalContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">" + 
//                         "<span class=\"navbar-toggler-icon\"></span>" + 
//                     "</button>" + 
//                 "</div>" +
//             "</nav>" + 
//             "<div class=\"collapse\" id=\"" + entry.type + "List\">" + 
//                 "<div class=\"bg-light p-4\"\>"
//                 entry.list.forEach((ingred) => {
//                     meat = meat + 
//                     "<div class=\"form-check\">" +
//                         "<input id=\"" + ingred +"\" class=\"form-check-input\" type=\"checkbox\" id=\"flexCheckDefault\">" +
//                         "<label class=\"form-check-label\" for=\"" + ingred + "\"\>" + ingred + "</label>" +
//                     "</div>";
//                 });
//          meat = meat + 
//                 "</div>" + 
//             "</div>" +
//         "</li>";
//     });
//     const ingredientList = document.getElementById("ingredientList");
//     ingredientList.innerHTML = ingredientList.innerHTML + meat;

//     data.forEach(entry => {
//         entry.list.forEach(ingred => {
//             let box = document.getElementById(ingred);
//             box.addEventListener("click", event => {
//                 if (box.hasAttribute("checked")) {
//                     box.removeAttribute("checked");
//                 }
//                 else {
//                     box.setAttribute("checked", "");
//                 }
//             });
//         });
//     });

//     const ingredientQuerySubmit = document.getElementById("ingredientQuerySubmit");
//     ingredientQuerySubmit.addEventListener("click", (event) => {
//         let formInfo = [];
//         data.forEach((entry) => {
//             entry.list.forEach((ingred) => {
//                 let test = document.getElementById(ingred);
//                 if (test.hasAttribute("checked")) {
//                     formInfo.push(test.id);
//                 }
//             });
//         });
//         formInfo.forEach(point => {
//             console.log(point);
//         });
//         event.preventDefault();
//     });

//     const ingredientQueryClear = document.getElementById("ingredientQueryClear");
//     ingredientQueryClear.addEventListener("click", (event) => {
//         console.log("This button does not behave correctly");
//         data.forEach(entry => {
//             entry.list.forEach(ingred => {
//                 let box = document.getElementById(ingred);
//                 box.removeAttribute("checked");
//             });
//         });
//     });

//     const searchBox = document.getElementById("searchBox");
//     const serachBoxSubmit = document.getElementById("serachBoxSubmit");
//     serachBoxSubmit.addEventListener("click", event => {
//         console.log(searchBox.value);
//         event.preventDefault();
//     });
// });
