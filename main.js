import express, { request, response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

//memory
let users = {};
let posts = {};
let index = {};

//data file paths
const users_file = './data/users.json';
const posts_file = './data/posts.json';
const index_file = './data/index.json';

//app and port
const app = express();
const port = 3000;

//middlware, static
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./'));

//read file into memory
async function reloadUsers() {
  try {
    const data = await readFile(users_file, {encoding: 'utf8'});
    users = JSON.parse(data);
  } catch (err) {
    users = {};
  }
}
//read file into memory
async function reloadPosts() {
  try {
    const data = await readFile(posts_file, {encoding: 'utf8'});
    posts = JSON.parse(data);
  } catch (err) {
    posts = {};
  }
}
//read file into memory
async function reloadIndex() {
  try {
    const data = await readFile(index_file, {encoding: 'utf8'});
    index = JSON.parse(data);
  } catch (err) {
    index = {};
  }
}

//save file referance to file
async function saveFile(file_name, file_referance) {
  try {
    const data = JSON.stringify(file_referance);
    await writeFile(file_name, data, {encoding: 'utf8'});
  } catch (err) {
    console.log(err);
  }
}

//check to see if an entry is in memory referance
function entryExists(file_referance, entry) {
  return entry in file_referance;
}

//LOGIN
app.get('/login', async (request, response) => {
  //get query from request
  const query = request.query;
  //get UID from query
  const uid = query.uid;
  //get password from query
  const password = query.password;
  //reload users file into memory for updated
  await reloadUsers();
  //404 if user not found
  if (!entryExists(users, uid)) {
    response.status(404).json({ error: `Username '${uid}' does not exist`});
  }
  //400 if password incorrect
  else if (users[uid].password != password) {
    response.status(400).json({ error: `Password for '${uid}' was incorrect`});
  }
  //200 for success (cookie set in API)
  else {
    response.status(200).json(users[uid]);
  }
});

//LOGOUT
app.get('/logout', async (request, response) => {
  //200 for success (cookie deleted in API)
  response.status(200).json({ "status" : "Logout Success" });
});

//CREATE A USER
app.post('/user_create', async (request, response) => {
  //get the query and body from request
  const query = request.query;
  const body = request.body;
  //Reload user file into memory
  await reloadUsers();
  //400 if user does not exist
  if (entryExists(users, query.uid)) {
    response.status(400).json({ error: `Username '${query.uid}' is already taken`});
  }
  //200 for success
  else {
    //put data in memory
    users[query.uid] = {
      uid: query.uid, 
      password: body.password, 
      profileImage: body.profileImage, 
      biography: body.biography, 
      posts: [], 
      following: [], 
      followers: [], 
      likes: []
    };
    //save memory to file
    await saveFile(users_file, users);
    response.status(200).json(users[query.uid]);
  }
});

//GET A USER
app.get('/user', async (request, response) => {
  const query = request.query;
  const uid = query.uid;
  //reload file into memory
  await reloadUsers();
  //200 for success
  if (entryExists(users, uid)) {
    response.status(200).json(users[uid]);
  } 
  //404 for not found
  else {
    response.status(404).json({ error: `User '${uid}' Not Found` });
  }
});

//UPDATE A USER
app.put('/user_update', async (request, response) => {
  const query = request.query;
  const body = request.body
  await reloadUsers();
  //200 for success
  if (entryExists(users, query.uid)) {
    //change password, pfp, bio
    users[query.uid].password = body.newpassword;
    users[query.uid].profileImage = body.profileImage;
    users[query.uid].biography = body.biography;
    //save to file
    await saveFile(users_file, users);
    response.status(200).json(users[query.uid]);
  } 
  //404 not found
  else {
    response.status(404).json({error: `Username '${query.uid}' is  not found`});
  }
});

//DELETE A USER
app.delete('/user_delete', async (request, response) => {
  const query = request.query;
  const uid = query.uid;
  await reloadUsers();
  //200 for success
  if (entryExists(users, uid)) {
    //remove UID from followers list of all following
    users[uid].following.forEach(user => {
      users[user].followers = users[user].followers.filter(u => u != uid);
    });
    //remove UID from following lists of followers
    users[uid].followers.forEach(user => {
      users[user].following = users[user].following.filter(u => u != uid);
    });
    //delete the entry
    delete users[uid];
    //save to file
    await saveFile(users_file, users);
    response.status(200).json(`User '${uid}' Has been Deleted`);
  } 
  //404 user not found
  else {
    response.status(404).json({ error: `User '${uid}' Not Found` });
  }
});

//FOR GETTING NEW PIDs
function getNewPID() {
  //empty object, return 0
  if (Object.keys(posts).length === 0) return 0;
  //else return number that is one greater than largest pid (because of possible deleted posts)
  return parseInt(Object.keys(posts).reduce((a, b) => posts[a].pid > posts[b].pid ? a : b)) + 1;
}

//CREATE A POST
app.post('/post_create', async (request, response) => {
  const body = request.body;
  const query = request.query;
  await reloadUsers();
  //400 if attempting to post as invalid user
  if (!entryExists(users, query.uid)) {
    response.status(400).json({ error: `Must be logged in to post`});
  } 
  //200 for success
  else {
    //reload posts into memory
    await reloadPosts();
    //get new PID
    const pid = getNewPID();
    //create date
    const d = new Date();
    const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    //add to UID's posts list
    users[query.uid].posts.push(pid);
    //save user file
    await saveFile(users_file, users);
    //create post
    posts[pid] = {
      pid: pid, 
      uid: query.uid, 
      title: body.title, 
      image: body.image, 
      date: date, 
      likes: 0, 
      ingredient_keys: body.ingredient_keys, 
      ingredients: body.ingredients, 
      instructions: body.instructions, 
      description : body.description, 
      comments: []
    };
    //save posts file
    await saveFile(posts_file, posts);
    //reload index
    await reloadIndex();
    //use ingredient keys in index to point to PID
    body.ingredient_keys.forEach(ingred => {
      if (entryExists(index, ingred)) {
        index[ingred].push(pid);
      }
      else {
        index[ingred] = [pid];
      }
    });
    //save index
    await saveFile(index_file, index);
    response.status(200).json(posts[pid]);
  }
});

//GET A POST
app.get('/post', async (request, response) => {
  const query = request.query;
  const pid = query.pid;
  //reload file into memory
  await reloadPosts();
  //404 not found
  if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    response.status(200).json(posts[parseInt(pid)]);
  }
});

//GET A USERS OTHER POSTS
app.get('/otherposts', async (request, response) => {
  const query = request.query;
  const uid = query.uid;
  const pid = query.pid;
  //reload file into memory
  await reloadUsers();
  await reloadPosts();
  //404 not found
  if (!entryExists(users, uid)) {
    response.status(404).json({ error: `User '${uid}' Not Found`});
  }
  //404 not found
  else if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    let PIDs = [];
    //get rest of pids in PID list from each user
    users[uid].posts.forEach(post => { 
      if (post != pid) {
        PIDs.push(post);
      }
    });
    response.status(200).json(PIDs);
  }
});

//UPDATE A POST
app.put('/post_update', async (request, response) => {
  const query = request.query
  const body = request.body
  await reloadPosts();
  //200 found post and update
  if (entryExists(posts, query.pid)) {
    //update title, image, ingreds, instructions
    posts[query.pid].title = body.title;
    posts[query.pid].image = body.image;
    posts[query.pid].ingredients = body.ingredients;
    posts[query.pid].instructions = body.instructions;
    //modify index
    await reloadIndex();
    //remove PID from all of index with old keys
    posts[query.pid].ingredient_keys.forEach(ingred => {
      index[ingred] = index[ingred].filter(post => post != query.pid);
    });
    //update the keys
    posts[query.pid].ingredient_keys = body.ingredient_keys;
    //save file
    await saveFile(posts_file, posts);
    //update index with new keys
    body.ingredient_keys.forEach(ingred => {
      if (entryExists(index, ingred)) {
        index[ingred].push(query.pid);
      }
      else {
        index[ingred] = [query.pid];
      }
    });
    //save file
    await saveFile(index_file, index);
    response.status(200).json(posts[query.pid]);
  } 
  //404 post not found
  else {
    response.status(404).json({error: `Post not found`});
  }
});

//DELETE A POST
app.delete('/post_delete', async (request, response) => {
  const query = request.query;
  const pid = query.pid;
  await reloadPosts();
  //200 post found and deleted
  if (entryExists(posts, pid)) {
    //remove PID from index completely
    await reloadIndex();
    posts[pid].ingredient_keys.forEach(ingred => {
      index[ingred] = index[ingred].filter(post => post != pid);
    });
    //save index
    await saveFile(index_file, index);
    //delete post
    delete posts[pid];
    //save posts
    await saveFile(posts_file, posts);
    response.status(200).json(`Post '${pid}' Has been Deleted`);
  } 
  //404 post not found
  else {
    response.status(404).json({ error: `Post not Found` });
  }
});

//QUERY THE INDEX
app.get('/query', async (request, response) => {
  //query from request has attribute query -> what we want
  const query = request.query.query;
  //reload index
  await reloadIndex();
  let posts = {};
  //query in form of [ingred]+....+[ingred] via url -> comes here as string, split on spaces
  query.split(" ").forEach(key => {
    //API replaces spaces in query with undescore, replace them back
    key = key.replace("_"," ");
    //if key is in index
    if (key in index) {
      //push each pid into posts
      index[key].forEach(pid => {
        if(pid in posts) {
          posts[pid] += 1;
        }
        else {
          posts[pid] = 1;
        }
      });
    }
  });
  //404 no mathcing posts
  if (posts === {}) {
    response.status(404).json({error: "No matching posts"});
  }
  //200 posts found, reutrn object of PID->(count of ingred matches)
  response.status(200).json(posts);
});

//FOR USE IN LIKE AND UNLIKE REQUESTS
async function votePost(response, uid, pid, like) {
  //reload users and posts
  await reloadUsers();
  await reloadPosts();
  //404 post not exist
  if (!entryExists(posts, pid)) {
    response.status(400).json({ error: `Post does not exist`});
  }
  //200 success, return post
  else {
    //like = true -> add like, like  = false -> remove like
    posts[pid].likes += like ? 1 : -1;
    //save file
    await saveFile(posts_file, posts);
    //add or remove PID to UID like list
    if (!like) {
      users[uid].likes = users[uid].likes.filter(post => post != pid);
    }
    else {
      users[uid].likes.push(pid);
    }
    //save users
    await saveFile(users_file, users)
    response.status(200).json(posts[pid]);
  }
}

//LIKE A POST
app.put('/like', async (request, response) => {
    const query = request.query;
    votePost(response, query.uid, query.pid, true);
});

//UNLIKE A POST
app.put('/unlike', async (request, response) => {
  const query = request.query;
  votePost(response, query.uid, query.pid, false);
});

//FOR USE IS FOLLOW/UNFOLLOW USER
async function manageFollow(response, uid_from, uid_to, follow) {
  //reload users
  await reloadUsers();
  //404 user not found
  if (!entryExists(users, uid_to) || !entryExists(users, uid_from)) {
    response.status(404).json({ error: `User does not exist`});
  }
  //200 success
  else {
    //follow user
    if (follow) {
      users[uid_from].following.push(uid_to);
      users[uid_to].followers.push(uid_from);
    }
    //unfollow user
    else {
      //remove user from following list
      users[uid_from].following = users[uid_from].following.filter(uid => uid != uid_to);
      //remoce user from followers list
      users[uid_to].followers = users[uid_to].followers.filter(uid => uid != uid_from);
    }
    //save users
    await saveFile(users_file, users);
    response.status(200).json(users[uid_from]);
  }
}

//FOLLOW A USER
app.put('/follow', async (request, response) => {
  const query = request.query;
  manageFollow(response, query.uid_from, query.uid_to, true);
});

//UNFOLLOW A USER
app.put('/unfollow', async (request, response) => {
  const query = request.query;
  manageFollow(response, query.uid_from, query.uid_to, false);
});

//COMMENT ON A POST
app.put('/comment', async (request, response) => {
  const body = request.body;
  const query = request.query;
  //reload users
  await reloadUsers();
  //404 post not found
  if (!entryExists(posts, query.pid)) {
    response.status(404).json({ error: `Post does not exist`});
  }
  //400 invalid user
  else if (!entryExists(users, query.uid)) {
    response.status(400).json({ error: `Must be logged in to post!`});
  }
  //200 success
  else {
    await reloadPosts();
    //add comment
    posts[query.pid].comments.push({
      uid: query.uid, 
      comment: body.comment,
      likes: []
    });
    await saveFile(posts_file, posts);
    response.status(200).json(posts[query.pid]);
  }
});

//GET COMMENTS OF A POST
app.get('/comments_get', async (request, response) => {
  const query = request.query;
  const pid = query.pid;
  //reload file into memory
  await reloadPosts();
  //404 not found
  if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    response.status(200).json(posts[pid].comments.sort((a, b) => b.likes.length - a.score.length));
    // response.status(200).json(posts[pid].comments);
  }
});

//DELETE A COMMENT OF A POST
app.delete('/comment_delete', async (request, response) => {
  const query = request.query;
  const uid = query.uid;
  const pid = query.pid;
  const comment = query.comment;
  //reload file into memeory
  await reloadUsers();
  await reloadPosts();
  //404 not found
  if (!entryExists(users, uid)) {
    response.status(404).json({ error: `User '${uid}' Not Found`});
  }
  //404 not found
  else if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    let newComments = [];
    posts[pid].comments.forEach(c => {
      if (c.comment != comment || c.uid != uid) {
        newComments.push(c);
      }
    });
    posts[pid].comments = newComments;
    await saveFile(posts_file, posts);
    response.status(200).json(`'${comment}' posted by '${uid}' on post '${pid}' Has been Deleted`);
  }
});

//GET WHETHER USER HAS LIKED COMMENT
app.get('/comment_check', async (request, response) => {
  const query = request.query;
  const log = query.log;
  const uid = query.uid;
  const pid = query.pid;
  const comment = query.comment;
  //reload file into memory
  await reloadUsers();
  await reloadPosts();
  //404 not found
  if (!entryExists(users, log)) {
    response.status(404).json({ error: `User '${log}' Not Found`});
  }
  //404 not found
  // else if (!entryExists(users, uid)) { // only uncomment once more users established
  //   response.status(404).json({ error: `User '${uid}' Not Found`});
  // }
  //404 not found
  else if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    let b = false
    posts[pid].comments.forEach(c => {
      if (c.comment === comment && c.uid === uid && log in c.likes) {
        b = true
      }
    });
    response.status(200).json({"value": b});
  }
});

//LIKE A COMMENT
app.put('/comment_like', async (request, response) => {
  const query = request.query;
  const log = query.log;
  const uid = query.uid;
  const pid = query.pid;
  const comment = query.comment;
  //reload file into memory
  await reloadPosts();
  //404 not found
  if (!entryExists(users, log)) {
    response.status(404).json({ error: `User '${log}' Not Found`});
  }
  // //404 not found // only uncomment once more users established
  // else if (!entryExists(users, uid)) {
  //   response.status(404).json({ error: `User '${uid}' Not Found`});
  // } 
  //404 not found
  else if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    posts[pid].comments.forEach(c => {
      if (c.comment === comment && c.uid === uid) {
        c.likes.push(log)
      }
    });
    await saveFile(posts_file, posts);
    response.status(200).json(`Comment by '${uid}' liked by '${log}'`);
  }
});

app.put('/comment_unlike', async (request, response) => {
  const query = request.query;
  const log = query.log;
  const uid = query.uid;
  const pid = query.pid;
  const comment = query.comment;
  //reload file into memory
  await reloadPosts();
  //404 not found
  if (!entryExists(users, log)) {
    response.status(404).json({ error: `User '${log}' Not Found`});
  }
  //404 not found
  // else if (!entryExists(users, uid)) { // only uncomment once more users established
  //   response.status(404).json({ error: `User '${uid}' Not Found`});
  // }
  //404 not found
  else if (!entryExists(posts, pid)) {
    response.status(404).json({ error: `Post '${pid}' does not exist`});
  }
  //200 found, return data
  else {
    let newLikes = [];
    posts[pid].comments.forEach(c => {
      if (c.comment === comment && c.uid === uid) {
        c.likes.forEach(liker => {
          if (liker != log) {
            newLikes.push(liker)
          }
        });
        c.likes = newLikes;
      }
    });
    await saveFile(posts_file, posts);
    response.status(200).json(`Comment by '${uid}' unliked by '${log}'`);
  }
});


//GET THE FEED
app.get('/feed', async (request, response) => {
  const query = request.query;
  const uid = query.uid;
  await reloadUsers();
  //404 user not found
  if (!entryExists(users, uid)) {
    response.status(404).json({ error: `User not found`});
  }
  //200 success
  else {
    let PIDs = [];
    //get PID list from each user followed
    users[uid].following.forEach(user => {
      users[user].posts.forEach(post => PIDs.push(post));
    });
    //send data
    response.status(200).json(PIDs);
  }
});

//OTHER
app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

//START THE WEBAPP
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});