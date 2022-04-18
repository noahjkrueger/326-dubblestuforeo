import renderFeed from './feed.js'
import * as guzzzleAPI from './guzzzle-api.js'

const cookie_uid = JSON.parse(window.localStorage.getItem("uid"));
const obj = guzzzleAPI.readUser(cookie_uid);
let userFeed = document.getElementById('user_feed');

let PIDs = [];


