let ingredientCount = 1;

const guide = document.getElementById("create_guide");
const postButton = document.getElementById("cg_postbutton");
const title = document.getElementById("cg_title");
const desc = document.getElementById("cg_desc");
const inst = document.getElementById("cg_inst");
const img = document.getElementById("cg_image");
const addIng = document.getElementById("cg_btn");

postButton.addEventListener("click", post);
addIng.addEventListener("click", duplicate);

function post() {
    console.log("Title: " + title.value);
    console.log("Description: " + desc.value);
    console.log("Instructions: " + inst.value);
    console.log("Image: " + img.value);
};

function duplicate() {
    //cg_ing1
    let originalIng = document.getElementById('cg_ing' + ingredientCount);
    let cloneIng = originalIng.cloneNode(true);
    cloneIng.id = "cg_ing" + (ingredientCount + 1);
    originalIng.parentNode.appendChild(cloneIng);
    //cg_type1
    let originalType = document.getElementById('cg_type' + ingredientCount);
    let cloneType = originalType.cloneNode(true);
    cloneType.id = "cg_type" + (ingredientCount + 1);
    originalType.parentNode.appendChild(cloneType);
    //cg_cg_amount1
    let originalAmount = document.getElementById('cg_amount' + ingredientCount);
    let cloneAmount = originalAmount.cloneNode(true);
    cloneAmount.id = "cg_amount" + (ingredientCount + 1);
    originalAmount.parentNode.appendChild(cloneAmount);

    ingredientCount += 1;

    //move down cg_btn, cg_inst, and cg_postButton
    
}