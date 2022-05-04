import express, { request } from 'express';
import logger from 'morgan';
import { GuzzzleDatabase } from './guzzzle-db.js';
import Session from "express-session";
import cookieParser from "cookie-parser";
import {randomBytes, pbkdf2Sync} from "crypto";

class GuzzzleServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.static('./'));
    this.app.use(express.json({limit: "10 mb"}));
    //THIS NEEDS TO GO AFTER JSON (do not change)
    this.app.use(express.urlencoded({limit: "10mb", extended: true}));
    var sess = {
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 86400000}
    };
    this.app.use(cookieParser());
    this.app.use(Session(sess));
  }

  async initRoutes() {
    const self = this;

    this.app.get('/currentuser', async (request, response) => {
      try {
        response.status(200).json(await self.db.getUser(request.session.uid));
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //LOGIN
    this.app.get('/login', async (request, response) => {
      try {
        const uid = request.query.uid;
        const password = request.query.password;
        const user = await self.db.getUser(uid);
        if (!user) {
          response.status(404).json({ error: `Username '${uid}' does not exist`});
        }
        else if (user.password != password) {
          response.status.json({error: `Password for '${uid}' is incorrect`});
        }
        else {
          request.session.uid = uid;
          response.status(200).json(user);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //LOGOUT
    this.app.get('/logout', async (request, response) => {
      request.session.destroy();
      response.status(200).json({status: "Logout Success"});
    });

    //CREATE A USER
    this.app.post('/user_create', async (request, response) => {
      try {
        const body = request.body;
        const not_available = await self.db.getUser(body.uid);
        if (not_available) {
          response.status(400).json({error: `Username '${body.uid}' is already taken`});
        }
        else {
          const new_user = await self.db.createUser(
            body.uid,
            body.email,
            body.password,
            body.pfp
          );
          request.session.uid = body.uid;
          response.status(200).json(new_user);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //GET A USER
    this.app.get('/user', async (request, response) => {
      try {
        const uid = request.query.uid;
        const user = await self.db.getUser(uid);
        if (!user) {
          response.status(404).json({ error: `Username '${uid}' does not exist`});
        }
        else {
          response.status(200).json(user);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //UPDATE A USER
    this.app.put('/user_update', async (request, response) => {
      try {
        const uid = request.session.uid;
        const password = request.body.password;
        const check = await self.db.getUser(uid);
        if (check === null || check.password != password) {
          response.status(400).json({error: "Password Incorrect"});
        }
        else {
          const body = request.body;
          const result = await self.db.updateUser(uid, body.newPassword, body.biography, body.profileImage);
          if (!result) {
            response.status(400).json({ error: `Error updating account`});
          }
          else {
            response.status(200).json(result);
          }
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //DELETE A USER
    this.app.delete('/user_delete', async (request, response) => {
      try {
        const uid = request.session.uid;
        const password = request.query.password;
        const check = await self.db.getUser(uid);
        if (check === null || check.password != password) {
          response.status(400).json({error: "Password Incorrect"});
        }
        else {
          const result = await self.db.deleteUser(uid);
          if (!result) {
            response.status(400).json({ error: `Error deleting account`});
          }
          else {
            response.status(200).json({status: "success"});
          }
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //CREATE A POST
    this.app.post('/post_create', async (request, response) => {
      try {
        const uid = request.session.uid;
        const body = request.body;
        const not_available = await self.db.getUser(uid);
        if (!not_available) {
          response.status(400).json({error: `Must be logged in to post`});
        }
        else {
          const d = new Date();
          const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
          const result = await self.db.createPost(
            uid,
            body.title,
            body.image, 
            date, 
            body.ingredient_keys, 
            body.ingredients, 
            body.instructions, 
            body.description
          );
          response.status(200).json(result);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //GET A POST
    this.app.get('/post', async (request, response) => {
      try {
        const pid = parseInt(request.query.pid);
        const post = await self.db.getPost(pid);
        if (!post) {
          response.status(404).json({ error: `Post '${pid}' does not exist`});
        }
        else {
          response.status(200).json(post);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //UPDATE A POST
    this.app.put('/post_update', async (request, response) => {
      try {
        const pid = request.body.pid;
        const body = request.body;
        const post = await self.db.getPost(pid);
        console.log(post);
        if (post.uid != request.session.uid) {
          response.status(400).json({erroe: "You must own this post to update."})
        }
        else {
          const result = await self.db.updatePost(
            pid,
            body.title,
            body.image,
            body.ingredient_keys,
            body.ingredients,
            body.instructions,
            body.description
          );
          if (!result) {
            response.status(400).json({ error: `Error updating post`});
          }
          else {
            response.status(200).json(result);
          }
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //DELETE A POST
    this.app.delete('/post_delete', async (request, response) => {
      try {
        const pid = parseInt(request.query.pid);
        const post = await self.db.getPost(pid);
        if (post.uid != request.session.uid) {
          response.status(400).json({error: "You must own the post to delete it."});
        }
        else {
          const result = await self.db.deletePost(pid);
          if (!result) {
            response.status(400).json({ error: `Error deleting post`});
          }
          else {
            response.status(200).json({status: "success"});
          }
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

    //QUERY THE INDEX
    this.app.get('/query', async (request, response) => {
      try {
        let keys = request.query.query;
        keys = keys.split(" ");
        keys = keys.map(key => key.replace("_", " "));
        const result = await self.db.query(keys);
        if (result === []) {
          response.status(404).json({ error: `No matching posts`});
        }
        else {
          response.status(200).json(result);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });


    //GET THE FEED
    this.app.get('/feed', async (request, response) => {
      try {
        const uid = request.session.uid;
        const user = await self.db.getUser(uid);
        if (!uid || !user) {
          const defaultFeed = await self.db.defaultFeed();
          response.status(200).json(defaultFeed);
        }
        else {
          const posts = await self.db.feed(uid);
          response.status(200).json(posts);
        }
      }
      catch (err) {
        response.status(500).json({error: err});
      }
    });

        // //GET A USERS OTHER POSTS
    // this.app.get('/otherposts', async (request, response) => {
    //   const query = request.query;
    //   const uid = query.uid;
    //   const pid = query.pid;
    //   //reload file into memory
    //   await reloadUsers();
    //   await reloadPosts();
    //   //404 not found
    //   if (!entryExists(users, uid)) {
    //     response.status(404).json({ error: `User '${uid}' Not Found`});
    //   }
    //   //404 not found
    //   else if (!entryExists(posts, pid)) {
    //     response.status(404).json({ error: `Post '${pid}' does not exist`});
    //   }
    //   //200 found, return data
    //   else {
    //     let PIDs = [];
    //     //get rest of pids in PID list from each user
    //     users[uid].posts.forEach(post => { 
    //       if (post != pid) {
    //         PIDs.push(post);
    //       }
    //     });
    //     response.status(200).json(PIDs);
    //   }
    // });    

    //FOR USE IN LIKE AND UNLIKE REQUESTS
    async function votePost(response, uid, pid, like) {
      try {
        if(like) {
          let post = await self.db.likePost(uid, pid);
          response.status(200).json(post)
        } else {
          let post = await self.db.unlikePost(uid, pid);
          response.status(200).json(post)
        }
      }
      catch(err) {
        response.status(500).json({error: err});
      }
    }

    //LIKE A POST
    this.app.put('/like', async (request, response) => {
        const query = request.query;
        votePost(response, query.uid, parseInt(query.pid), true);
    });

    // //UNLIKE A POST
    this.app.put('/unlike', async (request, response) => {
      const query = request.query;
      votePost(response, query.uid, parseInt(query.pid), false);
    });

    // //FOR USE IS FOLLOW/UNFOLLOW USER
    // async function manageFollow(response, uid_from, uid_to, follow) {
    //   //reload users
    //   await reloadUsers();
    //   //404 user not found
    //   if (!entryExists(users, uid_to) || !entryExists(users, uid_from)) {
    //     response.status(404).json({ error: `User does not exist`});
    //   }
    //   //200 success
    //   else {
    //     //follow user
    //     if (follow) {
    //       users[uid_from].following.push(uid_to);
    //       users[uid_to].followers.push(uid_from);
    //     }
    //     //unfollow user
    //     else {
    //       //remove user from following list
    //       users[uid_from].following = users[uid_from].following.filter(uid => uid != uid_to);
    //       //remoce user from followers list
    //       users[uid_to].followers = users[uid_to].followers.filter(uid => uid != uid_from);
    //     }
    //     //save users
    //     await saveFile(users_file, users);
    //     response.status(200).json(users[uid_from]);
    //   }
    // }

    // //FOLLOW A USER
    // this.app.put('/follow', async (request, response) => {
    //   const query = request.query;
    //   manageFollow(response, query.uid_from, query.uid_to, true);
    // });

    // //UNFOLLOW A USER
    // this.app.put('/unfollow', async (request, response) => {
    //   const query = request.query;
    //   manageFollow(response, query.uid_from, query.uid_to, false);
    // });

    // //COMMENT ON A POST
    // this.app.put('/comment', async (request, response) => {
    //   const body = request.body;
    //  const uid = request.session.uid;
    //   const query = request.query;
    //   //reload users
    //   await reloadUsers();
    //   //404 post not found
    //   if (!entryExists(posts, query.pid)) {
    //     response.status(404).json({ error: `Post does not exist`});
    //   }
    //   //400 invalid user
    //   else if (!entryExists(users, query.uid)) {
    //     response.status(400).json({ error: `Must be logged in to post!`});
    //   }
    //   //200 success
    //   else {
    //     await reloadPosts();
    //     //add comment
    //     posts[query.pid].comments.push({
    //       uid: query.uid, 
    //       comment: body.comment,
    //       likes: []
    //     });
    //     await saveFile(posts_file, posts);
    //     response.status(200).json(posts[query.pid]);
    //   }
    // });

    // //GET COMMENTS OF A POST
    // this.app.get('/comments_get', async (request, response) => {
    //   const query = request.query;
    //   const pid = query.pid;
    //   //reload file into memory
    //   await reloadPosts();
    //   //404 not found
    //   if (!entryExists(posts, pid)) {
    //     response.status(404).json({ error: `Post '${pid}' does not exist`});
    //   }
    //   //200 found, return data
    //   else {
    //     response.status(200).json(posts[pid].comments.sort((a, b) => b.likes.length - a.score.length));
    //     // response.status(200).json(posts[pid].comments);
    //   }
    // });

    // //DELETE A COMMENT OF A POST
    // this.app.delete('/comment_delete', async (request, response) => {
    //   const query = request.query;
    //   const uid = query.uid;
    //   const pid = query.pid;
    //   const comment = query.comment;
    //   //reload file into memeory
    //   await reloadUsers();
    //   await reloadPosts();
    //   //404 not found
    //   if (!entryExists(users, uid)) {
    //     response.status(404).json({ error: `User '${uid}' Not Found`});
    //   }
    //   //404 not found
    //   else if (!entryExists(posts, pid)) {
    //     response.status(404).json({ error: `Post '${pid}' does not exist`});
    //   }
    //   //200 found, return data
    //   else {
    //     let newComments = [];
    //     posts[pid].comments.forEach(c => {
    //       if (c.comment != comment || c.uid != uid) {
    //         newComments.push(c);
    //       }
    //     });
    //     posts[pid].comments = newComments;
    //     await saveFile(posts_file, posts);
    //     response.status(200).json(`'${comment}' posted by '${uid}' on post '${pid}' Has been Deleted`);
    //   }
    // });

    // //GET WHETHER USER HAS LIKED COMMENT
    // this.app.get('/comment_check', async (request, response) => {
    //   const query = request.query;
    //   const log = query.log;
    //   const uid = query.uid;
    //   const pid = query.pid;
    //   const comment = query.comment;
    //   //reload file into memory
    //   await reloadUsers();
    //   await reloadPosts();
    //   //404 not found
    //   if (!entryExists(users, log)) {
    //     response.status(404).json({ error: `User '${log}' Not Found`});
    //   }
    //   //404 not found
    //   // else if (!entryExists(users, uid)) { // only uncomment once more users established
    //   //   response.status(404).json({ error: `User '${uid}' Not Found`});
    //   // }
    //   //404 not found
    //   else if (!entryExists(posts, pid)) {
    //     response.status(404).json({ error: `Post '${pid}' does not exist`});
    //   }
    //   //200 found, return data
    //   else {
    //     let b = false
    //     posts[pid].comments.forEach(c => {
    //       if (c.comment === comment && c.uid === uid && log in c.likes) {
    //         b = true
    //       }
    //     });
    //     response.status(200).json({"value": b});
    //   }
    // });

    // //LIKE A COMMENT
    // this.app.put('/comment_like', async (request, response) => {
    //   const query = request.query;
    //   const log = query.log;
    //   const uid = query.uid;
    //   const pid = query.pid;
    //   const comment = query.comment;
    //   //reload file into memory
    //   await reloadPosts();
    //   //404 not found
    //   if (!entryExists(users, log)) {
    //     response.status(404).json({ error: `User '${log}' Not Found`});
    //   }
    //   // //404 not found // only uncomment once more users established
    //   // else if (!entryExists(users, uid)) {
    //   //   response.status(404).json({ error: `User '${uid}' Not Found`});
    //   // } 
    //   //404 not found
    //   else if (!entryExists(posts, pid)) {
    //     response.status(404).json({ error: `Post '${pid}' does not exist`});
    //   }
    //   //200 found, return data
    //   else {
    //     posts[pid].comments.forEach(c => {
    //       if (c.comment === comment && c.uid === uid) {
    //         c.likes.push(log)
    //       }
    //     });
    //     await saveFile(posts_file, posts);
    //     response.status(200).json(`Comment by '${uid}' liked by '${log}'`);
    //   }
    // });

    // this.app.put('/comment_unlike', async (request, response) => {
    //   const query = request.query;
    //   const log = query.log;
    //   const uid = query.uid;
    //   const pid = query.pid;
    //   const comment = query.comment;
    //   //reload file into memory
    //   await reloadPosts();
    //   //404 not found
    //   if (!entryExists(users, log)) {
    //     response.status(404).json({ error: `User '${log}' Not Found`});
    //   }
    //   //404 not found
    //   // else if (!entryExists(users, uid)) { // only uncomment once more users established
    //   //   response.status(404).json({ error: `User '${uid}' Not Found`});
    //   // }
    //   //404 not found
    //   else if (!entryExists(posts, pid)) {
    //     response.status(404).json({ error: `Post '${pid}' does not exist`});
    //   }
    //   //200 found, return data
    //   else {
    //     let newLikes = [];
    //     posts[pid].comments.forEach(c => {
    //       if (c.comment === comment && c.uid === uid) {
    //         c.likes.forEach(liker => {
    //           if (liker != log) {
    //             newLikes.push(liker)
    //           }
    //         });
    //         c.likes = newLikes;
    //       }
    //     });
    //     await saveFile(posts_file, posts);
    //     response.status(200).json(`Comment by '${uid}' unliked by '${log}'`);
    //   }
    // });

    //OTHER
    this.app.get('*', async (request, response) => {
      response.status(404).send(`Not found: ${request.path}`);
    });
  }

  async initDb() {
    this.db = new GuzzzleDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 8080;
    this.app.listen(port, () => {
      console.log(`GuzzzleServer listening on port ${port}!`);
    });
  }
}

const server = new GuzzzleServer(process.env.DATABASE_URI);
server.start();