const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://knowyourmeme.com/";

const userData = {
  email: "john@doe.com",
  password: "123456",
};

axios.defaults.baseURL =
  "https://us-central1-trollbook-8d299.cloudfunctions.net/api";

getData = async () => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const newsFeed = $("#feed_items");

  axios
    .post("/login", userData)
    .then(result => {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${result.data.token}`,
      };

      newsFeed.find("article").each((i, elm) => {
        if (i > 2) return;
        const $elm = $(elm);

        axios
          .post("/troll", { troll: $elm.attr("data-title") })
          .then(() => {
            console.log("Posted successfully");
          })
          .catch(err => {
            console.error(err);
          });
      });
    })
    .catch(err => {
      console.error(err);
    });
};

exports.scheduledNewPost = functions.pubsub
  .schedule("every 24 hours")
  .onRun(context => {
    getData();
  });
