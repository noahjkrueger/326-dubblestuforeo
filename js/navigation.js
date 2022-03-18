const nav_bar = document.getElementById("navigation");
const navbar_src = "navbar.html";
const data = [
    {
        "icon": "../images/booze.png",
        "type": "Booze",
        "list": [
            "Brandy",
            "Gin",
            "Rum",
            "Tequlia",
            "Vodka",
            "Whiskey"
        ]
    },
    {
        "icon": "../images/juice.png",
        "type": "Juice",
        "list": [
            "Juice 1",
            "Juice 2",
            "Juice 3",
            "Juice 4",
            "Juice 5",
            "Juice 6"
        ]
    },
    {
        "icon": "../images/fruit.png",
        "type": "Fruit",
        "list": [
            "Fruit 1",
            "Fruit 2",
            "Fruit 3",
            "Fruit 4",
            "Fruit 5",
            "Fruit 6"
        ]
    },
    {
        "icon": "../images/vegtable.png",
        "type": "Vegtable",
        "list": [
            "Vegtable 1",
            "Vegtable 2",
            "Vegtable 3",
            "Vegtable 4",
            "Vegtable 5",
            "Vegtable 6"
        ]
    },
    {
        "icon": "../images/garnish.png",
        "type": "Garnish",
        "list": [
            "Garnish 1",
            "Garnish 2",
            "Garnish 3",
            "Garnish 4",
            "Garnish 5",
            "Garnish 6"
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
