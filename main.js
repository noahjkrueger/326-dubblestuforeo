import * as http from 'http';
import * as url from 'url';
import { readFile, writeFile } from 'fs/promises';

const users_data = '/data/users.json';
const posts_data = '/data/posts.json';
const index_data = '/data/index.json'

let users = null;
let posts = null;
let index = null;

const headerFields = { 'Content-Type': 'application/json' };

async function reload(filename, reference) {
  try {
    const data = await readFile(filename, { encoding: 'utf8' });
    reference = JSON.parse(data);
  } catch (err) {
    reference = {};
  }
}

async function saveData(filename, reference) {
  try {
    const data = JSON.stringify(reference);
    await writeFile(filename, data, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

function userExists(uid) {
  return uid in users;
}

function postExists(pid) {
  return pid in posts;
}

function ingredientExists(ingred) {
  return ingred in index;
}

async function updateIndex(ingredientList, pid, action) {
  ingredientList.forEach(ingred => {
    if (action === 'add') {
      if (ingredientExists(ingred)) {
        index[ingred].push(pid);
      }
      else {
        index[ingred] = [pid];
      }
    }
    else if (action === 'remove') {
      if (ingredientExists(ingred)) {
        index[ingred].filter(id => id != pid);
      }
    }
  });
  await saveData(index_data, index);
}

async function createAccount(response, options) {
  if (userExists(options.uid)) {
    response.writeHead(400, headerFields);
    response.write({error: "user already exists"});
    response.end();
  } else {
    await reload(users_data);
    users[options.uid] = {uid: options.uid, password: options.password, profileImage: options.profileImage, userPIDs: [], followingUIDs: []}
    await saveData(users_data, users);
    response.writeHead(200, headerFields);
    response.write(users[uid]);
    response.end();
  }
}

async function getAccount(response, uid) {
  if (!userExists(uid)) {
    response.writeHead(400, headerFields);
    response.write({error: "user does not exists"});
    response.end();
  } else {
    await reload(users_data);
    response.writeHead(200, headerFields);
    response.write(users[uid]);
    response.end();
  }
}

async function createPost(response, options) {
  await reload(posts_data);
  posts[options.pid] = {pid: options.pid, title: options.title, body: options.body, image: options.image, ingredients: options.ingredients, comments: [], likes: 0}
  await saveData(posts_data, posts);
  response.writeHead(200, headerFields);
  response.write(posts[options.pid]);
  updateIndex(posts[options.pid].ingredients, options.pid, 'add');
  response.end();
}

async function deletePost(response, pid) {
  await reload(posts_data);
  updateIndex(posts[options.pid].ingredients, options.pid, 'remove');
  delete posts[pid];
  await saveData(posts_data, posts);
  response.writeHead(200, headerFields);
  response.end();
}

async function getPost(response, pid) {
  if (!postExists(pid)) {
    response.writeHead(400, headerFields);
    response.write({error: "post does not exists"});
    response.end();
  } else {
    await reload(posts_data);
    response.writeHead(200, headerFields);
    response.write(posts[pid]);
    response.end();
  }
}

async function basicServer(request, response) {
  const parsedURL = url.parse(request.url, true);
  const options = parsedURL.query;
  const pathname = parsedURL.pathname;
  const method = request.method;

  if (method === 'POST' && pathname.startsWith('/account_create')) {
    createAccount(response, options);
  } 
  else if (method == 'GET' && pathname.startsWith('/account')) {
    getAccount(response, options.uid);
  }
  else if (method === 'POST' && pathname.startsWith('/post_create')) {
    createPost(response, options);
  } 
  else if (method == 'GET' && pathname.startsWith('/post')) {
    getPost(response, options.pid);
  }
  else if (method == 'GET' && pathname.startsWith('/client')) {
    try {
      let data = null;
      let type = '';
      if (pathname.endsWith('.css')) {
        type = 'text/css';
        data = await readFile(pathname.substring(1), 'utf8');
      } 
      else if (pathname.endsWith('.js')) {
        type = 'text/javascript';
        data = await readFile(pathname.substring(1), 'utf8');
      } 
      else if (pathname.endsWith('.html')) {
        type = 'text/html';
        data = await readFile(pathname.substring(1), 'utf8');
      } 
      else if (pathname.endsWith('.png')) {
        type = 'image/png';
        data = data = await readFile(pathname.substring(1));
      }
      else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
        type = 'image/jpeg';
        data = data = await readFile(pathname.substring(1));
      }
      else if (pathname.endsWith('.svg')) {
        type = 'image/svg+xml';
        data = data = await readFile(pathname.substring(1));
      }
      else if (pathname.endsWith('.ico')) {
        type = 'image/vnd.microsoft.icon';
        data = data = await readFile(pathname.substring(1));
      }
      else {
        type = 'text/plain';
        data = await readFile(pathname.substring(1), 'utf8');
      }
      response.writeHead(200, { 'Content-Type': type });
      response.write(data);
    } catch (err) {
      response.statusCode = 404;
      response.write('Not found: ' + pathname);
    }
    response.end();
  } else {
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: 'Not Found' }));
    response.end();
  }
}

// Start the server on port 3000.
http.createServer(basicServer).listen(3000, () => {
  console.log('Server started on port 3000');
});