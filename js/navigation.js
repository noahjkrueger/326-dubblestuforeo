const nav_bar = document.getElementById("navigation");
const data = [
    {
        "icon": "images/booze.png",
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
        "icon": "images/juice.png",
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
        "icon": "images/fruit.png",
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
        "icon": "images/vegtable.png",
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
        "icon": "images/garnish.png",
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

const part_start = "\<nav class=\"navbar navbar-light bg-light fixed-top\"\>\<div class=\"container-fluid\"\>\<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"offcanvas\" data-bs-target=\"#sideMenu\" aria-controls=\"offcanvasNavbar\"\>\<span class=\"navbar-toggler-icon\"\>\</span\>\</button\>\<a class=\"navbar-brand\" href=\"#\"\>\<img src=\"./images/favicon.svg\" alt=\"favicon\" width=\"30\" height=\"24\" class=\"d-inline-block align-text-top\"\>guzzzle.\</a\>\<a class=\"navbar-brand\" href=\"pages/login.html\"\>\<img src=\"./images/default_pfp.jpg\" alt=\"user-profile\" width=\"32\" height=\"32\" class=\"d-inline-block align-text-top rounded-circle\"\>\</a\>\<div class=\"offcanvas offcanvas-start\" tabindex=\"-1\"id=\"sideMenu\" aria-labelledby=\"offcanvasNavbarLabel\"\>\<div class=\"offcanvas-header\"\>\<h2 class=\"offcanvas-title\" id=\"offcanvasNavbarLabel\"\>\<img src=\"./images/favicon.svg\" alt=\"favicon\" width=\"30\" height=\"24\"\> guzzzle.\</h2\>\<button type=\"button\" class=\"btn-close text-reset\" data-bs-dismiss=\"offcanvas\" aria-label=\"Close\"\>\</button\>\</div\>\<div class=\"offcanvas-body\"\>\<ul class=\"navbar-nav justify-content-end flex-grow-1 pe-3\"\>\<form class=\"d-flex\"\>\<input class=\"form-control me-2\" type=\"search\" placeholder=\"Search Guide or User\" aria-label=\"Search\"\>\<button class=\"btn btn-outline-success\" type=\"submit\"\>GetGuzzzlin'\</button\>\</form\>\<br\>\<li class=\"nav-item\" id=\"ingredient-search\"\>\<br\>\<h5\>Search by Ingredients\</h5\>\<hr\>\</li\>";
const part_end = "\<li class=\"nav-item\"\>\<br\>\<button class=\"btn btn-outline-success\" type=\"submit\"\>GetGuzzzlin'\</button\>\</li\>\</ul\>\</div\>\</div\>\</div\>\</nav\>";
let meat = "";
data.forEach((entry) => {
    meat = meat + "\<li class=\"nav-item\"\><nav class=\"navbar navbar-light bg-light\"\>\<div class=\"container-fluid\"\>\<a class=\"navbar-brand\" href=\"#\"\>\<img src=\"" + entry.icon +"\" alt=\"" + entry.type +"\" width=\"30\" height=\"24\" class=\"d-inline-block align-text-top\"\>" + entry.type + "\</a\>\<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#" + entry.type + "List\" aria-controls=\"navbarToggleExternalContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"\>\<span class=\"navbar-toggler-icon\"\>\</span\>\</button\>\</div\>\</nav\>\<div class=\"collapse\" id=\"" + entry.type + "List\"\>\<div class=\"bg-light p-4\"\>"
    entry.list.forEach((ingred) => {
        meat = meat + "\<div class=\"form-check\"\>\<input class=\"form-check-input\" type=\"checkbox\" value=\"" + ingred + "\" id=\"flexCheckDefault\"\>\<label class=\"form-check-label\" for=\"" + ingred + "\"\>" + ingred + "\</label\>\</div\>";
    });
        meat = meat + "\</div\>\</div\>\</li\>";
});
nav_bar.innerHTML = part_start + meat + part_end;