const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.getTrolls = functions.https.onRequest((request, response) => {
  db.collection("trolls")
    .get()
    .then((docs) => {
      let trolls = [];

      docs.forEach((doc) => {
        trolls.push(doc.data());
      });

      return response.json(trolls);
    })
    .catch((err) => console.error(err));
});
