import express, { request, response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

let users = {};
let posts = {};
let index = {};

const users_file = './data/users.json';
const posts_file = './data/posts.json';
const index_file = './data/index.json';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./'));

async function reload(file_name, file_referance) {
  try {
    const data = await readFile(file_name, {encoding: 'utf8'});
    file_referance = JSON.parse(data);
  } catch (err) {
    file_referance = {};
  }
}

async function saveFile(file_name, file_referance) {
  try {
    const data = JSON.stringify(file_referance);
    await writeFile(file_name, data, {encoding: 'utf8'});
  } catch (err) {
    console.log(err);
  }
}

function entryExists(file_referance, entry) {
  return entry in file_referance;
}

function getNewPID() {
  if (Object.keys(posts).length === 0) return 0;
  Object.keys(posts).reduce((a, b) => a > b);
}

async function login(response, query) {
  await reload(users_file);
  if (!entryExists(users, query.uid)) {
    response.status(404).json({ error: `Username '${query.uid}' does not exist`});
  }
  else if (users[query.uid].password != query.password) {
    response.status(400).json({ error: `Password for '${query.uid}' was incorrect`});
  }
  else {
    response.json(users[query.uid]);
  }
}

async function createUser(response, query, body) {
  if (query.uid === undefined || entryExists(users, query.uid)) {
    response.status(400).json({ error: `Username '${query.uid}' is already taken`});
  } else {
    await reload(users_file);
    users[query.uid] = {uid: query.uid, password: body.password, profileImage: body.profileImage, biography: body.biography, posts: [], following: [], followers: []};
    await saveFile(users_file, users);
    response.json(users[query.uid]);
  }
}

async function readUser(response, uid) {
  await reload(users_file);
  if (entryExists(users, uid)) {
    response.json(users[uid]);
  } else {
    response.json({ error: `User '${uid}' Not Found` });
  }
}

async function updateUser(response, query, body) {
  await reload(users_file);
  if (entryExists(users, query.uid)) {
    users[query.uid].password = body.newpassword;
    users[query.uid].profileImage = body.profileImage;
    users[query.uid].biography = body.biography;
    await saveFile(users_file, users);
    response.json(users[query.uid]);
  } 
  else {
    response.status(404).json({error: `Username '${query.uid}' is  not found`});
  }
}

async function deleteUser(response, uid) {
  await reload(users_file);
  if (entryExists(users, uid)) {
    users[uid].following.forEach(user => {
      users[user].followers = users[user].followers.filter(u => u != uid);
    });
    users[uid].followers.forEach(user => {
      users[user].following = users[user].following.filter(u => u != uid);
    });
    delete users[uid];
    await saveFile(users_file, users);
    response.json(`User '${uid}' Has been Deleted`);
  } 
  else {
    response.json({ error: `User '${uid}' Not Found` });
  }
}

async function manageFollow(response, uid_from, uid_to, follow) {
  await reload(users_file);
  if (!entryExists(users, uid_to) || !entryExists(users, uid_from)) {
    response.status(404).json({ error: `User does not exist`});
  }
  else {
    if (follow) {
      users[uid_from].following.push(uid_to);
      users[uid_to].followers.push(uid_from);
    }
    else {
      users[uid_from].following = users[uid_from].following.filter(uid => uid != uid_to);
      users[uid_to].followers = users[uid_to].followers.filter(uid => uid != uid_from);
    }
    await saveFile(users_file, users);
    response.json(users[uid_from]);
  }
}

async function createPost(response, query, body) {
  await reload(users_file);
  if (query.uid === undefined || !entryExists(users, query.uid)) {
    response.status(400).json({ error: `Must be logged in to post`});
  } 
  else {
    await reload(posts_file);
    const pid = getNewPID();
    const d = new Date();
    const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    users[query.uid].posts.push(pid);
    await saveFile(users_file, users);
    posts[pid] = {pid: pid, uid: query.uid, title: body.title, image: body.image, date: date, likes: 0, ingredient_keys: body.ingredient_keys, ingredients: body.ingredients, instructions: body.instructions, comments: []};
    await saveFile(posts_file, posts);
    await reload(index_file);
    body.ingredient_keys.forEach(ingred => {
      if (entryExists(index, ingred)) {
        index[ingred].push(pid);
      }
      else {
        index[ingred] = [pid];
      }
    });
    await saveFile(index_file, index);
    response.json(posts[pid]);
  }
}

async function readPost(response, pid) {
  await reload(posts_file);
  if (!entryExists(posts, pid)) {
    response.status(400).json({ error: `Post does not exist`});
  } 
  else {
    response.json(posts[pid]);
  }
}

async function updatePost(response, query, body) {
  await reload(posts_file);
  if (entryExists(posts, query.pid)) {
    posts[query.pid].title = body.title;
    posts[query.pid].image = body.image;
    posts[query.pid].ingredients = body.ingredients;
    posts[query.pid].instructions = body.instructions;
    await reload(index_file);
    posts[query.pid].ingredient_keys.forEach(ingred => {
      index[ingred] = index[ingred].filter(post => post != query.pid);
    });
    posts[query.pid].ingredient_keys = body.ingredient_keys;
    await saveFile(posts_file, posts);
    body.ingredient_keys.forEach(ingred => {
      if (entryExists(index, ingred)) {
        index[ingred].push(query.pid);
      }
      else {
        index[ingred] = [query.pid];
      }
    });
    await saveFile(index_file, index);
    response.json(posts[query.pid]);
  } 
  else {
    response.status(404).json({error: `Post not found`});
  }
}

async function deletePost(response, pid) {
  await reload(posts_file);
  if (entryExists(posts, pid)) {
    await reload(index_file);
    posts[pid].ingredient_keys.forEach(ingred => {
      index[ingred] = index[ingred].filter(post => post != pid);
    });
    await saveFile(index_file, index);
    delete posts[pid];
    await saveFile(posts_file, posts);
    response.json(`Post '${pid}' Has been Deleted`);
  } 
  else {
    response.json({ error: `Post not Found` });
  }
}

async function queryIndex(response, query) {
  await reload(index_file);
  let posts = {};
  console.log(index);
  console.log(query);
  query.split(" ").forEach(key => {
    index[key].forEach(pid => {
      if(pid in posts) {
        posts[pid] += 1;
      }
      else {
        posts[pid] = 1;
      }
    });
  });
  response.json(posts);
}

async function votePost(response, pid, like) {
  await reload(users_file);
  if (!entryExists(posts, pid)) {
    response.status(400).json({ error: `Post does not exist`});
  }
  else {
    await reload(posts_file);
    posts[pid].likes += like ? 1 : -1;
    await saveFile(posts_file, posts);
    response.json(posts[pid]);
  }
}

async function commentPost(response, query, body) {
  await reload(users_file);
  if (!entryExists(posts, query.pid)) {
    response.status(404).json({ error: `Post does not exist`});
  }
  else if (!entryExists(users, query.uid)) {
    response.status(400).json({ error: `Must be logged in to post!`});
  }
  else {
    await reload(posts_file);
    posts[query.pid].comments.push({uid: query.uid, comment: body.comment});
    await saveFile(posts_file, posts);
    response.json(posts[query.pid]);
  }
}

async function getFeed(response, uid) {
  await reload(users_file);
  if (!entryExists(users, query.uid)) {
    response.status(404).json({ error: `User not found`});
  }
  else {
    let PIDs = [];
    users[uid].following.forEach(user => {
      users[user].posts.forEach(post => PIDs.push(post));
    });
    response.json(PIDs);
  }
}

app.get('/login', async (request, response) => {
  const query = request.query;
  login(response, query);
});

app.post('/user_create', async (request, response) => {
  const query = request.query;
  const body = request.body;
  createUser(response, query, body);
});

app.get('/user', async (request, response) => {
  const query = request.query;
  readUser(response, query.uid);
});

app.put('/user_update', async (request, response) => {
  const query = request.query;
  const body = request.body
  updateUser(response, query, body);
});

app.delete('/user_delete', async (request, response) => {
  const query = request.query;
  deleteUser(response, query.uid);
});

app.post('/post_create', async (request, response) => {
  const body = request.body;
  const query = request.query;
  createPost(response, query, body);
});

app.get('/post', async (request, response) => {
  const query = request.query;
  readPost(response, query.pid);
});

app.put('/post_update', async (request, response) => {
  const query = request.query
  const body = request.body
  updatePost(response, query, body);
});

app.delete('/post_delete', async (request, response) => {
  const query = request.query;
  deletePost(response, query.pid);
});

app.get('/query', async (request, response) => {
  const query = request.query;
  queryIndex(response, query.query);
});

app.put('/like', async (request, response) => {
    const query = request.query;
    votePost(response, query.pid, true);
});

app.put('/unlike', async (request, response) => {
  const query = request.query;
  votePost(response, query.pid, false);
});

app.put('/follow', async (request, response) => {
  const query = request.query;
  manageFollow(response, query.uid_from, query.uid_to, true);
});

app.put('/unfollow', async (request, response) => {
  const query = request.query;
  manageFollow(response, query.uid_from, query.uid_to, false);
});

app.put('/comment', async (request, response) => {
  const body = request.body;
  const query = request.query;
  commentPost(response, query, body);
});

app.get('/feed', async (request, response) => {
  const query = request.query;
  getFeed(response, query.uid);
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});