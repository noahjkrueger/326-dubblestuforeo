const col1 = document.getElementById('col1')
const col2 = document.getElementById('col2')
const col3 = document.getElementById('col3')

const content1 = [
    {
        "title": "Bloody Mary",
        "user": "urmom420",
        "pfp": "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1",
        "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/bloody-mary-glass-2258f4e.jpg?quality=90&resize=504,458?quality=90&webp=true&resize=504,458",
        "date": "03/18/2022",
        "stars": "4 stars",
        "ingredients" : ['Celery salt',
                            '1 lemon wedge',
                            '1 lime wedge',
                            '2 ounces vodka',
                            '4 ounces tomato juice',
                            '2 teaspoons prepared horseradish',
                            '2 dashes Tabasco sauce',
                            '2 dashes Worcestershire sauce',
                            '1 pinch ground black pepper',
                            '1 pinch smoked paprika',
                            'Garnished parsley sprig',
                            'Garnished green olives',
                            'Garnished lime wedge',
                            'Garnished celery stalk']
    }
]

const content2 = [
    {
        "Instructions" : [  '1) Pour some celery salt onto a small plate.',
                            '2) Rub the juicy side of the lemon or lime wedge along the lip of a pint glass.',
                            '3) Roll the outer edge of the glass in celery salt until fully coated, then fill the glass with ice and set aside.',
                            '4) Squeeze the lemon and lime wedges into a shaker and drop them in.',
                            '5) Add the vodka, tomato juice, horseradish, Tabasco, Worcestershire, black pepper, paprika, plus a pinch of celery salt along with ice and shake gently.',
                            '6) Strain into the prepared glass.',
                            '7) Garnish with parsley sprig, 2 speared green olives, a lime wedge and a celery stalk (optional).'
        ]
    }
]

const content3 = [
    {
        "title": "Vampire Juice",
        "user": "urmom421",
        "pfp": "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1",
        "image": "https://insanelygoodrecipes.com/wp-content/uploads/2021/09/Red-Negroni-Cocktail-with-Ice-800x530.jpg"
    },
    {
        "title": "Jim Carry",
        "user": "urmom422",
        "pfp": "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1",
        "image": "https://createyum.com/wp-content/uploads/2020/05/alcohol-drinks-caribbean-rum-punch-83.jpg"
    },
    {
        "title": "Mary O' Death",
        "user": "urmom423",
        "pfp": "https://i.guim.co.uk/img/media/a1b7129c950433c9919f5670c92ef83aa1c682d9/55_344_1971_1183/master/1971.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88ba2531f114b9b58b9cb2d8e723abe1",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEndHkjFmusKIlYoQEuLAfh7DM44Xu_pPxQ&usqp=CAU"
    }
]

const appendChildren = function (element, children) {
    children.forEach(child => {
        element.appendChild(child);
    });
};

const addClasses = function (element, classlist) {
    classlist.forEach(class_name => {
        element.classList.add(class_name);
    });
};

const createElement = function (element_name) {
    return document.createElement(element_name);
};



content1.forEach(col1_content => {

    //first row in col1
    let row_1 = createElement("div");

    //create username and profile
    let user_pfp = createElement("img");
    user_pfp.src = col1_content.pfp;
    addClasses(user_pfp, ["rounded-circle", "user-pfp",]);
    let user_name = createElement("span");
    addClasses(user_name, ["button-label", "user_Name"]);
    let user = createElement("h5");
    user.innerText = col1_content.user;
    appendChildren(user_name, [user]);
    appendChildren(row_1, [user_pfp, user_name]);



    //Second row in col1
    let row_2 = createElement("div");

    //Title
    let title = createElement("span");
    addClasses(title, ["guide_Title"]);
    let name = createElement("h3");
    name.innerText = col1_content.title;
    appendChildren(title, [name]);
    appendChildren(row_2, [title]);



    //Third row in col1
    let row_3 = createElement("div");

    //Image
    let guide_img = createElement("img");
    addClasses(guide_img, ["img_Guide"]);
    guide_img.src = col1_content.image;
    appendChildren(row_3, [guide_img]);



    //Fourth row in col1
    let row_4 = createElement("div");

    //create stars and date
    let stars = createElement("span");
    let date = createElement("span");
    addClasses(stars, ["stars_Guide"]);
    stars.innerText = "Rating: " + col1_content.stars;
    date.innerText = col1_content.date;
    appendChildren(row_4, [stars, date]);



    //Fifth row in col1
    let row_5 = createElement("div");

    //Table of Ingredients
    let tab = createElement("table");
    addClasses(tab, ["table"]);
    let thead = createElement("thead");
    let tr1 = createElement("tr");
    let th1 = createElement("th");
    addClasses(th1, ["table_Header"]);
    th1.innerText = "Ingredients";
    appendChildren(tr1, [th1]);
    appendChildren(thead, [tr1]);
    let tbody = createElement("tbody");
    let ingred = col1_content.ingredients;

    ingred.forEach(ing => {
        let tr = createElement("tr");
        let th = createElement("th");
        th.innerText = ing;
        addClasses(th, ["table_Item"]);
        appendChildren(tr, [th]);
        appendChildren(tbody, [tr]);
    })

    appendChildren(tab, [thead, tbody]);
    appendChildren(row_5, [tab]);

    appendChildren(col1, [row_1, row_2, row_3, row_4, row_5]);
});



content2.forEach(col2_content => {

    // First row in col2
    let row_1 = createElement("div");

    //Instructions Header
    let h = createElement("h3");
    h.innerText = "Instructions";
    addClasses(h, ["instruc_Header"]);

    //Instructions body
    let instruc = createElement("div")
    let steps = col2_content.Instructions

    steps.forEach(step => {
        let s = createElement("p");
        s.innerText = step
        appendChildren(instruc, [s]);
    });
    appendChildren(row_1, [h, instruc]);

    //Second row in col2
    let row_2 = createElement("div");

    //Comments
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(i => {
        let inp = createElement("input")
        inp.setAttribute("type", "text");
        inp.setAttribute("placeholder", "ExampleComments#");
        addClasses(inp, ["comments_Guide"]);
        appendChildren(row_1, [inp]);
    });

    let input = createElement("input")
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "MyComment");
    addClasses(input, ["comments_Guide"]);
    appendChildren(row_1, [input]);

    let button = createElement("button")
    button.setAttribute("type", "submit");
    button.innerText = "Comment"

    appendChildren(row_1, [button]);
    appendChildren(col2, [row_1]);
});


let h = createElement("h3");
h.innerText = "Related Guides";
addClasses(h, ["instruc_Header"]);
appendChildren(col3, [h]);


content3.forEach(col3_content => {
    let post = createElement("div");
    addClasses(post, ['border_Related'])
    let user_pfp = createElement("img");
    user_pfp.src = col3_content.pfp;
    addClasses(user_pfp, ["rounded-circle", "user-pfp",]);
    let user_name = createElement("span");
    addClasses(user_name, ["button-label", "user_Name"]);
    let user = createElement("h5");
    user.innerText = col3_content.user;
    appendChildren(user_name, [user]);
    appendChildren(post, [user_pfp, user_name]);

    let title = createElement("span");
    addClasses(title, ["guide_Title"]);
    let name = createElement("h3");
    name.innerText = col3_content.title;
    appendChildren(title, [name]);
    appendChildren(post, [title]);

    let guide_img = createElement("img");
    addClasses(guide_img, ["img_Related"]);
    guide_img.src = col3_content.image;
    appendChildren(post, [guide_img]);

    appendChildren(col3, [post]);
});