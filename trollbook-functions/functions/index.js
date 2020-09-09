const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const {
  getAllTrolls,
  addTroll,
  getTroll,
  commentOnTroll,
  likeTroll,
  unLikeTroll,
} = require("./handlers/trolls");
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

// troll routes
app.get("/trolls", getAllTrolls);
app.post("/troll", FBAuth, addTroll);
app.get("/troll/:trollId", getTroll);
app.post("/troll/:trollId/comment", FBAuth, commentOnTroll);
app.get("/troll/:trollId/like", FBAuth, likeTroll);
app.get("/troll/:trollId/unlike", FBAuth, unLikeTroll);

// user routes
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.post("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
