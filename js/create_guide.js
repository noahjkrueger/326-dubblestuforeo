import * as guzzzleAPI from './guzzzle-api.js'
let ingredientCount = 1;
const ingType = ['Booze', 'Juice', 'Garnish', 'Vegetable', 'Fruit'];

const postButton = document.getElementById("cg_postbutton");
const title = document.getElementById("cg_title");
const desc = document.getElementById("cg_desc");
const inst = document.getElementById("cg_inst");
const img = document.getElementById("cg_image");
const addIng = document.getElementById("cg_btn");

postButton.addEventListener("click", post);
addIng.addEventListener("click", duplicate);
document.getElementById("cg_type" + ingredientCount).addEventListener("change", ingredientType);

async function post() {
    let ingredient_keys = [];
    let ingredientStr = [];
    for(let i = 1; i <= ingredientCount; ++i) {
        let ing = document.getElementById("cg_ing" + i);
        let amount = document.getElementById("cg_amount" + i);
        let brand = document.getElementById("cg_brand" + i);
        ingredient_keys.push(ing.value);
        ingredientStr.push(brand.value + " " + ing.value + " " + amount.value);
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const files = img.files;
    const img64 = await toBase64(files[0]);
    await guzzzleAPI.createPost(title.value, img64, ingredient_keys, ingredientStr, inst.value, desc.value);
};

// pid of post -> read post -> fill title, etc , for ingred for ingred in ingreds (-> call duplicate)

function duplicate() {
    let container = document.getElementById("cg_ingClass");
    let p = document.createElement("p");
    let parent = document.createElement("ing" + ingredientCount);
    //cg_type
    let originalType = document.getElementById('cg_type' + ingredientCount);
    let cloneType = originalType.cloneNode(true);
    cloneType.id = "cg_type" + (ingredientCount + 1);
    cloneType.value = '';
    parent.appendChild(cloneType);
    //cg_brand
    let originalBrand = document.getElementById('cg_brand' + ingredientCount);
    let cloneBrand = originalBrand.cloneNode(true);
    cloneBrand.id = "cg_brand" + (ingredientCount + 1);
    cloneBrand.value = '';
    parent.appendChild(cloneBrand);
    //cg_amount
    let originalAmount = document.getElementById('cg_amount' + ingredientCount);
    let cloneAmount = originalAmount.cloneNode(true);
    cloneAmount.id = "cg_amount" + (ingredientCount + 1);
    cloneAmount.value = '';
    parent.appendChild(cloneAmount);
    //cg_ings
    let originalIngs = document.getElementById('cg_ing' + ingredientCount);
    let cloneIngs = originalIngs.cloneNode(false);
    cloneIngs.id = "cg_ing" + (ingredientCount + 1);
    cloneIngs.value = '';
    cloneIngs.disabled = true;
    parent.appendChild(cloneIngs);

    p.appendChild(parent);
    container.appendChild(p);

    ingredientCount += 1;
    document.getElementById("cg_type" + ingredientCount).addEventListener("change", ingredientType);
}

function ingredientType() {
    let op = ingType[document.getElementById("cg_type" + ingredientCount).value - 1];
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
    if(op !== undefined) {
        let select = document.getElementById("cg_ing" + ingredientCount);
        select.disabled = false;
        select.innerHTML = "<option selected>Type</option>"
        for (const val of ingredientDict[op]) {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
    } else {
        let oth = document.createElement("other");
        oth.innerHTML = "<input type='text' id='cg_other' placeholder='Specify ingredient' class='cg_amount'></input>"
        document.getElementById("cg_ing" + ingredientCount).replaceWith(oth);
    }
}