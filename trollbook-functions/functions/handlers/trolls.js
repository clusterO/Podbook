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
    imageUrl: request.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("trolls")
    .add(newTroll)
    .then(doc => {
      const resTroll = newTroll;
      resTroll.trollId = doc.id;
      return response.json(resTroll);
    })
    .catch(err => {
      console.error(err);
      return response
        .status(500)
        .json({ error: `something went south ${err}` });
    });

  return;
};

exports.getTroll = (request, response) => {
  let trollData = {};

  db.doc(`/trolls/${request.params.trollId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return response.status(404).json({ error: "Troll not found" });

      trollData = doc.data();
      trollData.trollId = doc.id;

      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("trollId", "==", request.params.trollId)
        .get();
    })
    .then(data => {
      trollData.comments = [];

      data.forEach(doc => {
        trollData.comments.push(doc.data());
      });

      return response.json(trollData);
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });

  return;
};

exports.commentOnTroll = (request, response) => {
  if (request.body.body.trim() === "")
    return response.status(400).json({ error: "Must not be empty" });

  const newComment = {
    body: request.body.body,
    createdAt: new Date().toISOString(),
    trollId: request.params.trollId,
    userHandle: request.user.handle,
    imageUrl: request.user.imageUrl,
  };

  db.doc(`trolls/${request.params.trollId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return response.status(404).json({ error: "Troll not found" });

      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => response.json(newComment))
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.likeTroll = (request, response) => {
  let trollData;

  db.doc(`trolls/${request.params.trollId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return response.status(404).json({ error: "Troll not found" });

      trollData = doc.data();
      trollData.trollId = doc.id;

      return db
        .collection("likes")
        .where("userHandle", "==", request.user.handle)
        .where("trollId", "==", request.params.trollId)
        .limit(1)
        .get();
    })
    .then(data => {
      if (!data.empty)
        return response
          .status(400)
          .json({ message: "Troll have been liked before" });

      return db
        .collection("likes")
        .add({
          userHandle: request.user.handle,
          trollId: request.params.trollId,
        })
        .then(() => {
          trollData.likeCount++;
          return db
            .doc(`trolls/${request.params.trollId}`)
            .update({ likeCount: trollData.likeCount });
        })
        .then(() => {
          return response.json(trollData);
        });
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.unLikeTroll = (request, response) => {
  let trollData;

  db.doc(`trolls/${request.params.trollId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return response.status(404).json({ error: "Troll not found" });

      trollData = doc.data();
      trollData.trollId = doc.id;

      return db
        .collection("likes")
        .where("userHandle", "==", request.user.handle)
        .where("trollId", "==", request.params.trollId)
        .limit(1)
        .get();
    })
    .then(data => {
      if (data.empty)
        return response
          .status(400)
          .json({ message: "Troll haven't been liked yet" });

      return db
        .doc(`/likes/${data.docs[0].id}`)
        .delete()
        .then(() => {
          trollData.likeCount--;
          return db
            .doc(`trolls/${request.params.trollId}`)
            .update({ likeCount: trollData.likeCount });
        })
        .then(() => {
          return response.json(trollData);
        });
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.deleteTroll = (request, response) => {
  db.doc(`/trolls/${request.params.trollId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return response.status(404).json({ error: "Troll not found" });

      if (doc.data().userHandle !== request.user.handle)
        return response.status(403).json({ error: "Unauthorized " });
      else return db.doc(`/trolls/${request.params.trollId}`).delete();
    })
    .then(() => {
      return response.json({ message: "Troll deleted" });
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
