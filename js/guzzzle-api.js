export async function login(uid, password) {
    try {
        const response = await fetch(`/login?uid=${uid}&password=${password}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        window.localStorage.setItem("uid", JSON.stringify(data.uid));
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
        });
        const data = await response.json();
        window.localStorage.removeItem("uid");
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

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
  
export async function updateUser(uid, newPassword, newProfileImage, newBiography) {
    try {
        const response = await fetch(`/user_update?uid=${uid}`, {
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

export async function createPost(uid, title, image, ingredient_keys, ingredients, instructions, description) {
    try {
        const response = await fetch(`/post_create?uid=${uid}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
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
        });
        const data = await response.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export async function updatePost(pid, newTitle, newImage, newIngredient_keys, newIngredients, newInstructions) {
    try {
        const response = await fetch(`/post_update?pid=${pid}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: newTitle, image: newImage, ingredient_keys: newIngredient_keys, ingredients: newIngredients, instructions: newInstructions})
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

export async function unlikePost(uid, pid) {
    try {
        const response = await fetch(`/unlike?uid=${uid}&pid=${pid}`, {
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

export async function getFeed(uid) {
    try {
        const response = await fetch(`/feed?uid=${uid}`, {
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