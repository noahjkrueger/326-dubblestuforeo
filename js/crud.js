export async function createUser(uid, password, profileImage) {
    const response = await fetch(`/account_create?uid=${uid}&password=${password}&profileImage=${profileImage}`, {
        method: 'POST',
    });
    const data = await response.json();
    return data;
}

export async function getUser(uid) {
    const response = await fetch(`/account?uid=${uid}`, {
        method: 'POST',
    });
    const data = await response.json();
    return data;
}

export async function createPost(pid, title, body, image, ingredients) {
    const response = await fetch(`/post_create?pid=${pid}&title=${title}&body=${body}&image=${image}&ingedients=${ingredients}`, {
        method: 'POST',
    });
    const data = await response.json();
    return data;
}

export async function getPost(pid,) {
    const response = await fetch(`/post?pid=${pid}`, {
        method: 'POST',
    });
    const data = await response.json();
    return data;
}