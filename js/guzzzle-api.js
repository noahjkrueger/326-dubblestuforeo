export async function login(uid, password) {
    try {
        const response = await fetch(`/login?uid=${uid}&password=${password}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        //bad login
        if (data.hasOwnProperty("error")) {
            window.alert(data.error);
        }
        //create cookie for good login
        else {
            const d = new Date;
            const cookie = {
                "uid": data.uid,
                "expires": `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`
            }
            window.localStorage.setItem("cookie", JSON.stringify(cookie));
        }
        return data;
    }
    catch(err) {
        console.log(err);
    }
  }

export async function logout() {
    try {
        const response = await fetch(`/logout`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        //delete cookie
        window.localStorage.removeItem("cookie");
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export function checkCookie() {
    let cookie = window.localStorage.getItem("cookie");
    if (cookie === null){
        return null;
    }
    cookie = JSON.parse(cookie);
    const d = new Date;
    const date = d.getDate();
    const year = d.getFullYear();
    const month = d.getMonth();
    const expire = cookie.expires.split('/');
    if (year > expire[2] || month > expire[0] || date >= expire[1]) {
        window.localStorage.removeItem("cookie");
        return null;
    }
    return cookie.uid;
}

export async function createUser(uid, email, password, pfp) {
    try {
        const response = await fetch(`/user_create?uid=${uid}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: password, email: email, pfp: pfp})
        });
        const data = await response.json();
        return login(data.uid, data.password);
    }
    catch(err) {
        console.log(err);
    }
  }
  
export async function readUser(uid) {
    try {
        const response = await fetch(`/user?uid=${uid}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function updateUser(uid, password, newPassword, newProfileImage, newBiography) {
    try {
        const response = await fetch(`/user_update?uid=${uid}&password=${password}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newpassword: newPassword, profileImage: newProfileImage, biography: newBiography})
            });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function deleteUser(uid, password) {
    try {
        const response = await fetch(`/user_delete?uid=${uid}&password=${password}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function createPost(uid, title, image, ingredient_keys, ingredients, instructions, description) {
    try {
        const response = await fetch(`/post_create?uid=${uid}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, image: image, ingredient_keys: ingredient_keys, ingredients: ingredients, description: description, instructions: instructions})
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function readPost(pid) {
    try {
        const response = await fetch(`/post?pid=${pid}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function readOtherPosts(uid, pid) {
    try {
        const response = await fetch(`/otherposts?uid=${uid}&pid=${pid}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function updatePost(pid, password, newTitle, newImage, newIngredient_keys, newIngredients, newInstructions, newDescription) {
    try {
        const response = await fetch(`/post_update?pid=${pid}&password=${password}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: newTitle, image: newImage, ingredient_keys: newIngredient_keys, ingredients: newIngredients, description: newDescription, instructions: newInstructions})
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function deletePost(pid, uid, password) {
    try {
        const response = await fetch(`/post_delete?pid=${pid}&uid=${uid}&password=${password}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function likePost(uid, pid) {
    try {
        const response = await fetch(`/like?uid=${uid}&pid=${pid}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function unlikePost(uid, pid) {
    try {
        const response = await fetch(`/unlike?uid=${uid}&pid=${pid}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function followUser(uid_from, uid_to) {
    try {
        const response = await fetch(`/follow?uid_from=${uid_from}&uid_to=${uid_to}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function unfollowUser(uid_from, uid_to) {
    try {
        const response = await fetch(`/unfollow?uid_from=${uid_from}&uid_to=${uid_to}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function commentPost(uid, pid, comment) {
    try {
        const response = await fetch(`/comment?uid=${uid}&pid=${pid}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({comment: comment})
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function getComments(pid) {
    try {
        const response = await fetch(`/comments_get?pid=${pid}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function commentDelete(uid, pid, comment) {
    try {
        const response = await fetch(`/comment_delete?uid=${uid}&pid=${pid}&comment=${comment}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        // return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function checkCommentLike(log, uid, pid, comment) {
    try {
        const response = await fetch(`/comment_check?log=${log}&uid=${uid}&pid=${pid}&comment=${comment}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}


export async function likeComment(log, uid, pid, comment) {
    try {
        const response = await fetch(`/comment_like?log=${log}&uid=${uid}&pid=${pid}&comment=${comment}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}


export async function unlikeComment(log, uid, pid, comment) {
    try {
        const response = await fetch(`/comment_unlike?log=${log}&uid=${uid}&pid=${pid}&comment=${comment}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}


export async function queryPosts(ingredients) {
    try {
        let request = '/query?query=';
        for (let i = 0; i < ingredients.length; i++) {
            if (i < ingredients.length - 1) {
                request += `${ingredients[i]}+`;
            } 
            else {
                request += `${ingredients[i]}`;
            }
        }
        const response = await fetch(request, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function getFeed(uid) {
    try {
        const response = await fetch(`/feed?uid=${uid}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function defaultFeed() {
    try {
        const response = await fetch(`/feed`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}