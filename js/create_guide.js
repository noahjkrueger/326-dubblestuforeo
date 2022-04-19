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

function post() {
    let ingredient_keys = [];
    let ingredientStr = "";
    for(let i = 1; i <= ingredientCount; ++i) {
        let ing = document.getElementById("cg_ing" + i);
        let type = document.getElementById("cg_type" + i);
        let amount = document.getElementById("cg_amount" + i);
        ingredient_keys.push(type.value);
        ingredientStr += "Ingredient " + i + ": " + ing.value + " " + amount.value + "; ";
    }
             //createPost(uid, title, image, ingredient_keys, ingredients, instructions, description)
    guzzzleAPI.createPost(window.localStorage.getItem("uid"), title.value, img.value, ingredient_keys, ingredientStr, inst.value, desc.value);
};

function duplicate() {
    //cg_ing1
    let originalIng = document.getElementById('cg_ing' + ingredientCount);
    let cloneIng = originalIng.cloneNode(true);
    cloneIng.id = "cg_ing" + (ingredientCount + 1);
    cloneIng.value = ''
    originalIng.parentNode.appendChild(cloneIng);
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
}