const { db } = require("../util/admin");

exports.getAllTrolls = (request, response) => {
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
};

exports.addTroll = (request, response) => {
  if (request.body.troll.trim() === "")
    return response.status(400).json({ troll: "Most not be empty" });

  let newTroll = {
    userHandle: request.user.handle,
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
};
