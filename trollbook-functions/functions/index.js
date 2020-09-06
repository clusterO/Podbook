const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const firebase = require("firebase");
const { response } = require("express");

const firebaseConfig = {
  apiKey: "AIzaSyDmWqNhLzuwWtVoIdZUk4k6mnqFkO5kzfc",
  authDomain: "trollbook-8d299.firebaseapp.com",
  databaseURL: "https://trollbook-8d299.firebaseio.com",
  projectId: "trollbook-8d299",
  storageBucket: "trollbook-8d299.appspot.com",
  messagingSenderId: "554419419125",
  appId: "1:554419419125:web:df6c2e29706131323252bc",
};

admin.initializeApp();
firebase.initializeApp(firebaseConfig);

const app = express();
const db = admin.firestore();

app.get("/trolls", (request, response) => {
  db.collection("trolls")
    .orderBy("createdAt", "desc")
    .get()
    .then(docs => {
      let trolls = [];

      docs.forEach(doc => {
        trolls.push({
          screamId: doc.id,
          troll: doc.data().troll,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });

      return response.json(trolls);
    })
    .catch(err => console.error(err));
});

app.post("/troll", (request, response) => {
  let newTroll = {
    userHandle: request.body.userHandle,
    troll: request.body.troll,
    createdAt: new Date().toISOString(),
  };

  db.collection("trolls")
    .add(newTroll)
    .then(doc => {
      return response.json({
        message: `document ${doc.id} created successfully`,
      });
    })
    .catch(err => {
      console.error(err);
      return response
        .status(500)
        .json({ error: `something went south ${err}` });
    });
});

app.post("/signup", (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle,
  };

  //Data validation

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(value => {
      token = value;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };

      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email is already in use" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.https.onRequest(app);
