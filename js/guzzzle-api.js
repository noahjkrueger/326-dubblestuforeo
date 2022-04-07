export async function createUser(uid, password, profileImage, biography) {
    try {
        const response = await fetch(`/user_create?uid=${uid}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({password: password, profileImage: profileImage, biography: biography})
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
  }
  
export async function readUser(uid) {
    try {
        const response = await fetch(`/user?uid=${uid}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function updateUser(uid, newpassword, profileImage, biography) {
    try {
        const response = await fetch(`/user_update?uid=${uid}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newpassword: newpassword, profileImage: profileImage, biography: biography})
            });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}
  
export async function deleteUser(uid) {
    try {
        const response = await fetch(`/user_delete?uid=${uid}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function createPost(uid, title, image, ingredient_keys, ingredients, instructions) {
    try {
        const response = await fetch(`/post_create?uid=${uid}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: title, image: image, ingredient_keys: ingredient_keys, ingredients: ingredients, instructions: instructions})
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
        const response = await fetch(`/post?uid=${pid}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function updatePost(pid, title, image, ingredient_keys, ingredients, instructions) {
    try {
        const response = await fetch(`/post_update?uid=${pid}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, image: image, ingredient_keys: ingredient_keys, ingredients: ingredients, instructions: instructions})
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
        const response = await fetch(`/post_delete?uid=${pid}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function likePost(pid) {
    try {
        const response = await fetch(`/like?pid=${pid}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function unlikePost(pid) {
    try {
        const response = await fetch(`/unlike?pid=${pid}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
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
            headers: {
            'Content-Type': 'application/json',
            },
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
            headers: {
            'Content-Type': 'application/json',
            },
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
            headers: {
            'Content-Type': 'application/json',
            },
            body : {
                comment: comment
            }
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export async function queryPosts(ingredients) {
    try {
        let request = '/query?query=';
        ingredients.forEach(ingred => {
            request += `+${ingred}`;
        });
        const response = await fetch(request, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}