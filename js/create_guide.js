import * as guzzzleAPI from './guzzzle-api.js'

let ingredientCount = 1;
const ingType = ['Booze', 'Juice', 'Garnish', 'Veggies', 'Fruit'];
window.localStorage.setItem("uid", "noah");

const guide = document.getElementById("create_guide");
const postButton = document.getElementById("cg_postbutton");
const title = document.getElementById("cg_title");
const desc = document.getElementById("cg_desc");
const inst = document.getElementById("cg_inst");
const img = document.getElementById("cg_image");
const addIng = document.getElementById("cg_btn");
const ingredients = document.getElementsByClassName("cg_ingredients");

postButton.addEventListener("click", post);
addIng.addEventListener("click", duplicate);
document.getElementById("cg_type" + ingredientCount).addEventListener("change", ingredientType);

function post() {
    let ingredient_keys = [];
    let ingredientStr = [];
    for(let i = 1; i <= ingredientCount; ++i) {
        let ing = document.getElementById("cg_ing" + i);
        let type = document.getElementById("cg_type" + i);
        let amount = document.getElementById("cg_amount" + i);
        ingredient_keys.push(ing.value);
        ingredientStr.push("Ingredient " + i + ": " + ing.value + " " + amount.value + "; ");
    }
             //createPost(uid, title, image, ingredient_keys, ingredients, instructions, description)
    guzzzleAPI.createPost(window.localStorage.getItem("uid"), title.value, img.value, ingredient_keys, ingredientStr, inst.value, desc.value);
};

function duplicate() {
    //cg_type1
    let originalType = document.getElementById('cg_type' + ingredientCount);
    let cloneType = originalType.cloneNode(true);
    cloneType.id = "cg_type" + (ingredientCount + 1);
    cloneType.value = ''
    originalType.parentNode.appendChild(cloneType);
    //cg_cg_amount1
    let originalAmount = document.getElementById('cg_amount' + ingredientCount);
    let cloneAmount = originalAmount.cloneNode(true);
    cloneAmount.id = "cg_amount" + (ingredientCount + 1);
    cloneAmount.value = ''
    originalAmount.parentNode.appendChild(cloneAmount);

    //move down cg_btn, cg_inst, and cg_postButton200
    let postButtonClass = document.querySelector('.cg_post');
    postButtonClass.style.bottom = 200 - ingredientCount * 120 + 'px';
    let addButtonClass = document.querySelector('.cg_btn');
    addButtonClass.style.top = 110 * ingredientCount + 'px';
    let instClass = document.querySelector('.cg_inst');
    instClass.style.top = 115 * ingredientCount + 'px';

    ingredientCount += 1;
    document.getElementById("cg_type" + ingredientCount).addEventListener("change", ingredientType);
}

function ingredientType() {
    //<select class="cg_typeb" id="cg_ing1"></select>
    let op = ingType[document.getElementById("cg_type" + ingredientCount).value - 1];
    var select = document.createElement("select");
    select.classList.add('cg_typeb');
    let ingredientDict = {
        "Booze": [
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
        ],
        "Juice": [
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
        ],
        "Fruit": [
            "Lemon",
            "Lime",
            "Olive",
            "Orange",
            "Pineapple",
            "Strawberry",
            "Watermelon",
            "Marachino Cherry",
            "Rasberry"
        ],
        "Vegetable": [
            "Carrot",
            "Celery",
            "Pepper",
            "Cucumber",
            "Pickle"
        ],
        "Garnish": [
            "Mint",
            "Cinnamon",
            "Salt",
            "Sugar",
            "Flowers",
            "Nutmeg",
            "Ginger"
        ],
        "Other": [
            "Temp"
        ]
    };
    select.id = "cg_ing" + ingredientCount;
 
    for (const val of ingredientDict[op])
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }
    document.getElementById("cg_ingClass").appendChild(select);
}