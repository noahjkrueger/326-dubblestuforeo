export async function currentUser() {
    try {
        const response = await fetch(`/currentuser`, {
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

export async function login(uid, password) {
    try {
        const response = await fetch(`/login?uid=${uid}&password=${password}`, {
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

export async function logout() {
    try {
        const response = await fetch(`/logout`, {
            method: 'GET'
        });
        await response;
    }
    catch(err) {
        console.log(err);
    }
}

export async function createUser(uid, email, password, pfp) {
    try {
        const response = await fetch(`/user_create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({uid: uid, password: password, email: email, pfp: pfp})
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
  
export async function updateUser(password, newPassword, newProfileImage, newBiography) {
    try {
        const response = await fetch(`/user_update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: password, newPassword: newPassword, profileImage: newProfileImage, biography: newBiography})
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function deleteUser(password) {
    try {
        const response = await fetch(`/user_delete?password=${password}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        if (data.hasOwnProperty("error")) {
            window.alert(data.error);
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function createPost(title, image, ingredient_keys, ingredients, instructions, description) {
    try {
        const response = await fetch(`/post_create`, {
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

export async function updatePost(pid, newTitle, newImage, newIngredient_keys, newIngredients, newInstructions, newDescription) {
    try {
        const response = await fetch(`/post_update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({pid: pid, title: newTitle, image: newImage, ingredient_keys: newIngredient_keys, ingredients: newIngredients, description: newDescription, instructions: newInstructions})
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function deletePost(pid) {
    try {
        const response = await fetch(`/post_delete?pid=${pid}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await response.json();
        if (data.hasOwnProperty("error")) {
            window.alert(data.error);
        }
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

export async function getFeed() {
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