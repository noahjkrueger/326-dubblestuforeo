import { MongoClient, ServerApiVersion } from 'mongodb';
import "dotenv/config";

export class GuzzzleDatabase {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        this.db = this.client.db('guzzzle');
    }

    async close() {
        this.client.close();
    }

    async getUser(uid) {
        this.collection = this.db.collection('users');
        const result = await this.collection.findOne(
            {
                uid: uid
            }
        );
        return result;
    }

    async createUser(uid, email, password, pfp) {
        this.collection = this.db.collection('users');
        await this.collection.insertOne(
            {
                uid: uid,
                email: email,
                password: password,
                profileImage: pfp, 
                biography: "", 
                posts: [], 
                following: [],
                followers: [], 
                likes: []
            }
        );
        return this.getUser(uid);
    }
    
    async updateUser(uid, newpassword, bio, pfp) {
        this.collection = this.db.collection('users');
        await this.collection.updateOne(
            {
                uid: uid
            },
            {
                $set: {
                    password: newpassword,
                    biography: bio,
                    profileImage: pfp
                }
            }
        );
        return await this.getUser(uid);
    }

    async deleteUser(uid) {
        this.collection = this.db.collection('users');
        //get user 
                //Once unfollow function complete
        // unfollow following, have followers unfollow, remove posts
        const result = await this.collection.deleteOne(
            {
                uid: uid
            }
        );
        return result.deletedCount === 1 ? true : false;
    }

    async getPost(pid) {
        // console.log(pid)
        // console.log(typeof(pid))
        this.collection = this.db.collection('posts');
        const result = await this.collection.findOne(
            {
                pid: pid
            }
        );
        return result;
    }

    async createPost(uid, title, image, date, ingredient_keys, ingredients, instructions, description) {
        this.collection = this.db.collection('posts');
        const result = await this.collection.find({}).toArray();
        let pid = -1;
        result.forEach(res => {
            pid = res.pid > pid ? res.pid : pid;
        });
        pid += 1;
        this.collection = this.db.collection('users');
        await this.collection.updateOne(
            {
                uid: uid
            },
            {
                $push: {
                    "posts": pid
                } 
            }
        );
        this.collection = this.db.collection('posts');
        await this.collection.insertOne(
            {
                pid: pid,
                uid: uid,
                title: title, 
                image: image, 
                date: date, 
                likes: 0, 
                ingredient_keys: ingredient_keys, 
                ingredients: ingredients, 
                instructions: instructions, 
                description : description, 
                comments: [], 
            }
        );
        return self.getPost(pid);
    }
    
    async updatePost(pid, title, image, ingredient_keys, ingredients, instructions, description) {
        this.collection = this.db.collection('posts');
        await this.collection.updateOne(
            {
                pid: pid
            },
            {
                $set: {
                    title: title,
                    image: image,
                    ingredient_keys: ingredient_keys,
                    ingredients: ingredients,
                    instructions: instructions,
                    description: description
                }
            }
        );
        return await this.getPost(pid);
    }

    async deletePost(pid) {
        const post = await this.getPost(pid);
        if (!post) return false;
        this.collection = this.db.collection('posts');
        const rmPost = await this.collection.deleteOne(
            {
                pid: pid
            }
        );
        this.collection = this.db.collection('users');
        const rmPID = await this.collection.updateOne(
            {
                uid: post.uid
            },
            {
                $pull : {
                    posts: pid
                }
            }
        );
        return (rmPost.deletedCount === 1 ? true : false) && (rmPID.modifiedCount === 1 ? true : false);
    }

    async query(keys) {
        this.collection = this.db.collection('posts');
        let posts = [];
        let order = {};
        const self = this;
        for (let key of keys) {
            let result = await self.collection.find(
                {
                    ingredient_keys: {
                        $all: [key]
                    }
                }
            ).toArray();
            for (let res of result) {
                if (res.pid in order) {
                    order[res.pid] += 1;
                }
                else {
                    order[res.pid] = 1;
                    posts.push(res);
                }
            }
        }
        return posts.sort((a, b) => order[String(a.pid)] > order[String(b.pid)] ? -1 : a.likes < b.likes ? -1 : 1);
    }

    async feedHelper(people) {
        let pids = [];
        for (const person of people) {
            const person_obj = await this.getUser(person);
            for (const pid of person_obj.posts) {
                pids.push(pid);
            }
        }
        this.collection = this.db.collection('posts');
        let posts = [];
        for (const pid of pids) {
            posts.push(await this.getPost(pid));
        }
        return posts.sort((a, b) => {
            let a_split = a.date.split("/");
            let b_split = b.date.split("/");
            const bFirst = (100 *(a_split[2] - b_split[2]) + 10 * (a_split[0] - b_split[0]) + a_split[1] - b_split[1]);
            return bFirst > 0 ? -1 : bFirst === 0 ? -1 : 0;
        });
    }

    async feed(uid) {
        this.collection = this.db.collection('users');
        const user = await this.getUser(uid);
        let follow = user.following;
        return this.feedHelper(follow);
    }

    async defaultFeed() {
        const default_follow = ["noah", "hi"]; //change this to our accounts
        return this.feedHelper(default_follow);
    }

    async likePost(uid, pid) {
        //get original post by calling getPost
        let post = await this.getPost(pid);
        //update post to increment like count
        let newLikes = post.likes + 1;
        //see updateUser -> $set
        this.collection = this.db.collection('posts');
        await this.collection.updateOne(
            {
                pid: pid
            },
            {
                $set: {
                    likes: newLikes
                }
            }
        );
        //add pid to uid like list via updateOne, $push (see createPost)
        this.collection = this.db.collection('users');
        await this.collection.updateOne(
            {
                uid: uid
            },
            {
                $push: {
                    "likes": pid
                } 
            }
        );
        return await this.getPost(pid);
    }

    async unlikePost(uid, pid) {
        //reverse of likePost
        let post = await this.getPost(pid);
        this.collection = this.db.collection('posts');
        let newLikes = post.likes - 1;
        await this.collection.updateOne(
            {
                pid: pid
            },
            {
                $set: {
                    likes: newLikes
                }
            }
        );
        //rm pid from uid like list via updateOne, $pull (see deletePost)
        this.collection = this.db.collection('users');
        await this.collection.updateOne(
            {
                uid: uid
            },
            {
                $pull: {
                    "likes": pid
                } 
            }
        );
        return await this.getPost(pid);
    }

    async follow(uid_to, uid_from) {
        //update uid_to follow list
        //update uid_from following list
        //use updateOne, $push for each user
        let user1 = await this.getUser(uid_to);
        let user2 = await this.getUser(uid_from);
        let arr1 = user1.following;
        arr1.push(uid_from);
        let arr2 = user2.followers;
        arr2.push(uid_to);
        this.collection = this.db.collection('users');
        // following array
        await this.collection.updateOne(
            {
                uid: uid_to
            },
            {
                $push: {
                   following: arr1 
                }
            }
        );
        // followers array
        await this.collection.updateOne(
            {
                uid: uid_from
            },
            {
                $push: {
                    followers: arr2
                }
            }
        );
    }

    async unfollow(uid_to, uid_from) {
        //reverse of follow
        //use updateOne, $pull for each user
        let user1 = await this.getUser(uid_to);
        let user2 = await this.getUser(uid_from);
        let arr1 = user1.following;
        arr1.push(uid_from);
        let arr2 = user2.followers;
        arr2.push(uid_to);
        this.collection = this.db.collection('users');
        // following array
        await this.collection.updateOne(
            {
                uid: uid_to
            },
            {
                $push: {
                   following: arr1 
                }
            }
        );
        // followers array
        await this.collection.updateOne(
            {
                uid: uid_from
            },
            {
                $push: {
                    followers: arr2
                }
            }
        );
    }

    //Should probably restructure the commments. Include a comment ID (cid) for each comment obj within a post.
    //comment object = {uid: (who posted), 
    //                  cid: (comment ID - see createPost for getting new cid (keep in mind this is nested))
    //                  comment: (String, the actual comment)
    //                  likes: (Array<String> -> list of uids?) or (Int, keep list of liked comments in user DB ?)
    //}
    async createComment(pid, uid, comment) {

    }

    async getComments(pid) {
        //return the comments attribute of post
    }

    async updateComment(pid, cid, comment) {
        //update comment cid on post pid
    }

    async deleteComment(pid, cid) {
        //remove comment cid on post pid
    }

    async likeComment(uid, pid, cid) {

    }

    async unlikeComment(uid, pid, cid) {

    }
}