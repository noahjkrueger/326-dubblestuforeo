# 326-dubblestuforeo 

### guzzzle.

### UMass CS326 Final Project - Spring 2022

## Overview
Our application is called **guzzzle.** (period included). It is *our* take on a social media platform, where users are able to connect 
to one another over the consumption of alcohol. Users of the application are able to create their own pages, or proflies, that house their inteactions 
with the application. This includes the user's posts. Posts, or guides, are user-generated content that are shared across the platform that give instructions 
on how to create alcoholic drinks. This includes everything from as simple as a Gin and Tonic to as complex as a Fat-Washed Mezcal cocktail. Users can interact 
with one another by following each other, liking, commenting or sharing guides. The innovation of this site is the ability to search through all of the guides 
with ease. The applications includes a query feature that allows users to create a list of ingredients they like or have, and upon submission, 
be greeted with a list of the guides that include said ingredients. This enables users to discover new, exiting ways to consume their beloved alcohol. 

## Team Members
Noah Krueger - noahjkrueger  
Diganta Mainali - D-Mainali
Kenneth Drewry - kendrewry  
Piyush Makkapati - piyushm2001

## User Interface (TODO)
TODO: here, put screenshot examples of each page and describe the interface.  
MS3 Instructions:
    A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.

## APIs (TODO)
TODO : Once the API documentation section is rewritten/reworked, paste it here (reformat it to fit here too !)
MS3 Instructions:
    A final up-to-date list/table describing your application’s API

## Database
Our application uses MongoDB. We use one cluster. A description of each collection is below.

### Users Collection
    document user {
        _id: <ObjectID>,
        uid: String,
        email: String,
        password: String,
        profileImage: String, 
        biography: String, 
        posts: Array<Integer>, 
        following: Array<String>,
        followers: Array<String>, 
        likes: Array<Integer>
    }
A user document includes the following that allows for user to user and user to post interaction:
- A list of UIDs that the user follows
- A list of UIDs that follow the user
- A list of PIDs that the user has posted
- A list of PIDs that the user has liked

### Posts Collection
    document post {
        pid: Integer,
        uid: String,
        title: String, 
        image: String, 
        date: String, 
        likes: Integer, 
        ingredient_keys: Array<String>, 
        ingredients: String, 
        instructions: String, 
        description : String, 
        comments: Array<Object>
    }
A post document includes the followinf that allows for user to post interaction:
- A list of comment objects that house comments on the post
- A count of likes the post has
- A list of keys used for querying posts

## URL Routes/Mappings (TODO)
TODO : List all endpoints and write a description of each.  
MS3 Instructions:
     A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

## Authentication/Authorization
All visitors of the application are able to:
- View a post
- Query guides
- Find user pages
- Create an account
- Log in to an account
If a user is logged in, they will have a session. When there is a valid session, the user has additional privledges:
- Like posts
- Comment on posts
- Follow other users 
- Create posts 
In addition, post/guide pages and user pages that are owned by the user have accsess to buttons that enable certian features. These include:
1. Post pages a logged in user owns:
    - Edit Post button
        - Changing the title of a post
        - Changing the ingredients of a post
        - Changing the description of a post
        - Changing the instructions of a post
        - Changing the image of a post
    - Delete Post button
        - Remove the post from the application
2. The logged in user's page:
    - Edit Profile button
        - Change the image of a profile
        - Change the biography of a profile
        - Change the password of a profile
        - Delete a profile

## Division of labor

### Noah Krueger
- Laid out structure of application
    - Organization of files
    - How posts are represented
    - How users are represented
    - How posts are queried
    - Wireframes for each page
    - How the application is navigated
    - How data is introduced to specific pages
- Created the navigation bar
    - Logic to show 'Login/Signup' vs a logged in user's profile picture
    - Created the logo featured in navigation bar
    - Created application name
    - Implimented logic of user search bar
    - Implimented logic of post search form
        - Implimented results page
            - Logic of result ordering
    - Styling (CSS) of the navbar, modal, form (including the icons)
- Created the feed
    - Feed is used on main page, each profile page and search results
    - Logic on how to get appropriate feed
        - Profile feed only has the user's posts
        - Result feed has all results that include parts of the form
        - Main feed only has posts from the user's following list
    - Logic on how to order the feed
        - By posting date for profiles and main feed
        - By ingredient keys for search results
    - Logic on icon display for likes / follow user on each post
    - Styling (CSS) of the feed
- Enabled seessions
    - Creating sessions on login
    - Destroying sessions on logout
    - Expiring sessions
    - Logic of displaying buttons on certian pages with respect to the logged in user
- Created API function calls and endpoints for:
    - Login, Logout
    - CRUD operations
        - For Users
        - For Posts
    - Like, unlike post
    - Follow, unfollow user
    - Querying posts
    - Getting feeds
- Created Database operations for:
    - Login, Logout
    - CRUD operations
        - For Users
        - For Posts
    - Querying posts
    - Getting feeds
- Enabled upload of images via base64 conversion
- Many bug fixes regaurding implimentations and smoothing transistions between parts of application and visual design (CSS)
- Set up Atlas DB
- Heroku Configs
- setup.md
    - Wrote detailed instructions
- ideas.md
    - Created and wrote ideas
- milestone1.md
    - Created wireframes
    - Wrote text included
- milestone2.md
    - Documented API calls one-to-one with calls created (see above)
- milestone3.md
    - Documented the structure of the database
- final.md
    - Overview, Database, Authentication/Authorization
- Final Video
    - Contributed to final video

### Diganta Mainali
TODO:
    for each team member — that is, saying who did what, for the entire project.

### Kenneth Drewry
TODO:
    for each team member — that is, saying who did what, for the entire project.

### Piyush Makkapati
TODO:
    for each team member — that is, saying who did what, for the entire project.

## Conclusion (TODO)
TODO : Write the conclusion.  
MS3 Instructions:  
     A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered