# Get Current main iteration
- fetch / pull into your branch
- run npm install to get all needed packages
# Running the app
After creating the .env file (see below), you should be able to run the app with 
    npm start.

# LINKING TO DB
## Heroku Config
Config vars have already been set on Heroku.
## Creating .env file
- Log into AtlasDB / Mongo 
- guzzzle cluster -> connect -> import into app -> get URI
- database access -> users -> add user -> edit password -> get password
- replace < password > with your password
- replace 'Cluster0' with 'guzzzle'
- place into .env file : DATABASE_URI="< the whole thing here >"
- Are the Atlas premissions set right? you might not be able to if i have done it wrong. lmk.
- add SECRET="guzzzleisacoolassapp" also for the cookies 
- add PORT="8080" or PORT="3000" (up to you)
- IMPORTANT: add .env to .gitignore

# Changes
## Image Storage w/in DB (THIS SUCKED)
this was hard asf bruh I am burnt out but it works now. in create_guide.js, the uploaded image
is converted to base64 and sent over HTTP and finally into the DB. Images then display normally.
For updte profile, copy this code.
DO NOT CHANGE THE ORDER of this.app.use(....) in index.js. If you need to add any more, do so after
the current things. 
## index.js
- uses express-session / cookieParser
    - no more cookie hijacking! we have real cookies!
    - this also changed a lot in other stuff
    - sessions expire after a day (24hrs)
- CRUD operations for Posts and Users, feed and query are fully implimented
## guzzzle-db.js
- CRUD operations for Posts and Users, feed and query are fully implimented
## guzzzle-api.js
- new function currentUser
    - returns a user object for the user in session.
        - i.e, if a user is logged in / has a session, calling this will give you the user obj.
        - not logged in -> returns null. Use this in your checks.
- a lot of calls have been changed, but yout JS has also been changed
    - dont worry about it
    - Examine the API before making new calls w/in JS
    - all USER update and delete calls require a password to be passed in. 
        - edit the modify/delete user pages to accept and pass in the password.
        - docs for this needs to be re written. see work to be done.

# Work to be done (Programming)
keep the Atlas database as non-malformed as possible, otherwise there might be errors
## Secure login
look into hash pws
## doc/
### milestone3.md
API has changed, thus this needs to be updated, as per milestone3 requirements.
### setup.md
Change this to be more descriptive. Include npm install and .env setup.
## guzzzle-db.js
- please refer to existing code for help / ask questions
- there are comments with stuff to be implimented
    - please use the structure described
- return objects rather than references
- also, try to do as much operations here as possible. see getFeed().
    - its better this way
    - use for .. of .. loops 
        - forEach, map, filter causes issues. try to avoid when possible.
## guzzle-api.js
- since we use sessions now, no need to pass uid for the logged in user to any of these.
    - update the functions you need
    - user request.session.uid within index.js to in place the uid in query/body of request/.
## index.js
- you basically need to re-write all the endpoints because we now use guzzle-db and no more memory storage.
- this isnt that bad. It's the same algorithms with different language.
- wrap in try..catch blocks.
- copy code where you can lol
## get_guide.js
- since comment functions have not yet been implimented, not entirely sure how much needs to be changed here.
## After
we'll reset the DB, each create an account, add the acc names in defaultFeed() (guzzzle-db.js), and each create 2 posts.

# Work to be done (MS3)
[MS3 Instructions](https://docs.google.com/document/d/1-2zJJM-6HB0Xd9fPTUu4u-nnM-hNadf2pltNm-MKE8s/edit)
## Code Cleanup
- remove unused code / comments
- check spelling in docs/
    - me englishious bad
- npm uninstall --save any npm we dont use
## Deploy on Heroku
- deploy the thing when all above is done
## Commit to Github
- Commit it all to github / merge
- create release 'final'
## milestone3.md
- part 1 documentation complete (structure of collections)
- Breakdown of division of labor
## final.md
- see link
- need:
    -title
    -subtitle
    -semester
    -overview
    -team members
    -UI
    -APIs -> (copy/paste from updated MS2)
    -URL Routes/Mappings
    -Authentication/Authorization
    -division of labor
    -conclusion
## Final Video Demo
upload to youtube, add it to the COMPSCI 326 Spring 2022 
- proj name team name
- introduction from all of us
- desc of app / novelty
- targeted users
- importatn features
- our favorite algorithms
- list of easy/hard
- future work that can be done
