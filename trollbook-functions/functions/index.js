const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();

const app = express();
const db = admin.firestore();

app.get("/trolls", (request, response) => {
  db.collection("trolls")
    .orderBy("createdAt", "desc")
    .get()
    .then((docs) => {
      let trolls = [];

      docs.forEach((doc) => {
        trolls.push({
          screamId: doc.id,
          troll: doc.data().troll,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });

      return response.json(trolls);
    })
    .catch((err) => console.error(err));
});

app.post("/troll", (request, response) => {
  let newTroll = {
    userHandle: request.body.userHandle,
    troll: request.body.troll,
    createdAt: new Date().toISOString(),
  };

  db.collection("trolls")
    .add(newTroll)
    .then((doc) => {
      return response.json({
        message: `document ${doc.id} created successfully`,
      });
    })
    .catch((err) => {
      response.status(500).json({ error: `something went south ${err}` });
      console.error(err);
    });
});

exports.api = functions.https.onRequest(app);
