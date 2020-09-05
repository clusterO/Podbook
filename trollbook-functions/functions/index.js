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

exports.addTroll = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    return response.status(400).json({ message: `Methode not allowed` });
  }

  let newTroll = {
    userHandle: request.body.userHandle,
    troll: request.body.troll,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
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
