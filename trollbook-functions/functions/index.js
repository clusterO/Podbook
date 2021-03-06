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
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");
const cors = require("cors");

app.use(cors());

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
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/trolls/${snapshot.data().trollId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle)
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            trollId: doc.id,
            type: "like",
            read: false,
          });
        else return;
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.removeNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete(snapshot => {
    return db
      .doc(`notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
      });
  });

exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/trolls/${snapshot.data().trollId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle)
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            trollId: doc.id,
            type: "comment",
            read: false,
          });
        else return;
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.onUserImageChange = functions.firestore
  .document(`/users/{userId}`)
  .onUpdate(change => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      let batch = db.batch();
      return db
        .collection("trolls")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const troll = db.doc(`/trolls/${doc.id}`);
            batch.update(troll, {
              imageUrl: change.after.data().imageUrl,
            });
          });
          return batch.commit();
        });
    } else return;
  });

exports.onDeleteTroll = functions.firestore
  .document(`/trolls/{id}`)
  .onDelete((snapshot, context) => {
    const trollId = context.params.id;
    const batch = db.batch();

    return db
      .collection("comments")
      .where("trollId", "==", trollId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("trollId", "==", trollId).get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("trollId", "==", trollId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch(err => {
        console.error(err);
      });
  });
