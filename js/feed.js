const feed = document.getElementById("feed");
const post_src = "post.html";
const content = [
    {
        "title": "title1",
        "user": "username1",
        "pfp": "../images/default_pfp.jpg",
        "description": "The original Bloody Mary is believed to have contained seven ingredients: vodka, tomato juice, " +
        "Worcestershire sauce, black pepper, celery salt, Tabasco and lemon juice. But like many classic " +
        "drinks, it has inspired several variations. Popular versions include the Bloody Maria (made with tequila), " +
        "the Red Snapper (spiked with gin) and the Caesar, a Canadian creation that features Clamato juice.", 
        "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/bloody-mary-glass-2258f4e.jpg?quality=90&resize=504,458?quality=90&webp=true&resize=504,458",
        "date": "March 18th, 2022" 
    },
    {
        "title": "title2",
        "user": "username2",
        "pfp": "../images/default_pfp.jpg",
        "description": "here is the description1",
        "image": "../images/placeholde_beer.jpg",
        "date": "date2"   
    } ,
    {
        "title": "title3",
        "user": "username3",
        "pfp": "../images/default_pfp.jpg",
        "description": "here is the description1",
        "image": "../images/placeholde_beer.jpg",
        "date": "date1"   
    }   
];

content.forEach(post => {
    let post_content = document.createElement("div");
    fetch(post_src).then(response => response.text()).then(html => {
        let title = document.getElementById("post_title");
        title.innerText = post.content;
    });
    feed.appendChild(post_content);
});