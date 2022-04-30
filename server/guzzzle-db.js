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
        const result = await this.collection.deleteOne(
            {
                uid: uid
            }
        );
        // unfollow following, have followers unfollow, remove posts
        return result.deletedCount === 1 ? true : false;
    }

    async getPost(pid) {
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
}