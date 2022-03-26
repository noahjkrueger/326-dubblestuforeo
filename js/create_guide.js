const guide = document.getElementById("create_guide");
const postButton = document.getElementById("cg_postbutton");
const title = document.getElementById("cg_title");
const desc = document.getElementById("cg_desc");
const inst = document.getElementById("cg_inst");
const img = document.getElementById("cg_image");

postButton.addEventListener("click", post);


function post() {
    console.log("Title: " + title.value);
    console.log("Description: " + desc.value);
    console.log("Instructions: " + inst.value);
    console.log("Image: " + img.value);
};