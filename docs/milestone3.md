# 326-dubblestuforeo  
## guzzzle.
### Team Overview  
Noah Krueger - noahjkrueger  
Diganta Mainali - D-Mainali
Kenneth Drewry - kendrewry  
Piyush Makkapati - piyushm2001

### Division of labor
#### Noah Krueger
- CRUD database operations and corrosponding endpoints
    - Post CRUD
    - User CRUD
- Session / Authentication features
- Enabled user upload of images
    - Image conversion to base64 for storage
    - For use in profiles and posts
- Addition of buttons for owners of post or user pages
    - Post owners can modify or delete their posts
    - Profile owners can mondify or delete their profile
- Bug fixes / Error checking throughout the project
    - Code cleanup
- Coherent Application Navigation
- Restructure of application
- Favicon
- Documentation of Database Documents
- Final Video work
- Heroku Configs
- setup.md rework
- Contributed to final.md
#### Diganta Mainali
here
#### Kenneth Drewry
here
#### Piyush Makkapati
here

### Database Documents
#### Users
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
#### Posts
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
        comments: Array<Object>, 
    }
    