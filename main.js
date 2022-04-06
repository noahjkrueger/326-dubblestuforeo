import express, { response } from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

let users = {};
let posts = {};
let index = {};

const users_file = '/data/users.json';
const posts_file = '/data/posts.json';
const index_file = '/data/index.json';

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

async function createUser(response, query) {
  if (query.uid === undefined || entryExists(users, query.uid)) {
    response.status(400).json({ error: `Username '${query.uid}' is already taken!`});
  } else {
    await reload(users_file);
    users[query.uid] = {uid: query.uid, password: query.password, profileImage: query.profileImage, biography: query.biography, posts: [], following: []};
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

async function updateUser(response, query) {
  await reload(users_file);
  if (entryExists(users, query.uid)) {
    users[query.uid] = {uid: query.uid, password: query.password, profileImage: query.profileImage, biography: query.biography, posts: users[query.uid].posts, following: users[uid].following};
    await saveFile(users_file, users);
    response.json(users[uid]);
  } 
  else {
    response.json({ error: `User '${uid}' Not Found` });
  }
}

async function deleteUser(response, uid) {
  await reload(users_file);
  if (entryExists(users, uid)) {
    delete users[uid];
    await saveFile(users_file, users);
    response.json(`User '${uid}' Has been Deleted`);
  } 
  else {
    response.json({ error: `User '${uid}' Not Found` });
  }
}

app.post('/user_create', async (request, response) => {
  const query = request.query;
  createUser(response, query);
});

app.get('/user', async (request, response) => {
  const query = request.query;
  readUser(response, query.uid);
});

app.put('/user_update', async (request, response) => {
  const query = request.query;
  updateUser(response, query);
});

app.delete('/user_delete', async (request, response) => {
  const query = request.query;
  deleteUser(response, query.uid);
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});