const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");
const {
  getAllTrolls,
  addTroll,
  getTroll,
  commentOnTroll,
  likeTroll,
  unLikeTroll,
  deleteTroll,
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
app.delete("/troll/:trollId", FBAuth, deleteTroll);

// user routes
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.post("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(snapshot => {
    db.doc(`/trolls/${snapshot.data().trollId}`)
      .get()
      .then(doc => {
        if (doc.exists)
          return db
            .doc(`/notifications/${snaposhot.id}`)
            .set({
              createdAt: new Date().toISOString(),
              recipient: doc.data().userHandle,
              sender: snaposhot.data().userHandle,
              trollId: doc.id,
              type: "like",
              read: false,
            })
            .then(() => {
              return;
            });
      })
      .catch(err => {
        console.error(err);
        return;
      });
  });
