# 326-dubblestuforeo  
## guzzzle.
### Team Overview  
Noah Krueger - noahjkrueger  
Diganta Mainali - D-Mainali
Kenneth Drewry - kendrewry  
Piyush Makkapati - piyushm2001

### Getting Started with guzzzle. API
    import * as guzzzleAPI from './guzzzle-api.js'

#### Users
##### Create a User
    guzzzle-api.createUser(uid, password, profileImage, biography)
Will send a POST request to the server to create an account. 
If the uid is already in use, the server will respond with status 400 and a message that uid is already taken.
Otherwise, the users.json file in /data/ will update with a new entry and the contents of the entry are returned.
##### Read a User
    guzzzle-api.readUser(uid)
Will send a GET request to the server to get an account.
if the uid does not exist, the server will respond with status 404 and a message that uid does not exist.
Otherwise, the users.json will be acsessed and the contents of the entry are returned.
##### Update a User
    guzzzle-api.updateUser(uid, password, profileImage, biography)
Will send a PUT request to the server to update an account. 
If the uid does not exist, the server will respond with status 404 and a message that uid does not exist.
If the password is incorrect, the server will respond with status 400 and a message that password is incorrect.
Otherwise, the users.json file in /data/ will update the uid entry and the contents of the entry are returned.
##### Delete a User
    guzzzle-api.deleteUser(uid, password)
Will send a DELETE request to the server to remove an account.
f the uid does not exist, the server will respond with status 404 and a message that uid does not exist.
If the password is incorrect, the server will respond with status 400 and a message that password is incorrect.
Otherwise, the users.json file in /data/ will delete the uid entry and the contents of the entry are returned.

#### Posts
##### Create a Post
here
##### Read a Post
here
##### Update a Post
here
##### Delete a Post
here