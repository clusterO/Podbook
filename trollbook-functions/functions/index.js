const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const { getAllTrolls, addTroll } = require("./handlers/trolls");
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
} = require("./handlers/users");

// troll routes
app.get("/trolls", getAllTrolls);
app.post("/troll", FBAuth, addTroll);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);

// user routes
app.post("/signup", signUp);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
