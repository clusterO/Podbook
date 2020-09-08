const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const { getAllTrolls, addTroll } = require("./handlers/trolls");
const { signUp, login, uploadImage } = require("./handlers/users");

// troll routes
app.get("/trolls", getAllTrolls);
app.post("/troll", FBAuth, addTroll);

// user routes
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);
