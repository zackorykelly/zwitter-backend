const express = require("express");
const router = express.Router();

module.exports = ({ getTweets }) => {
  /* GET tweets listing. */
  router.get("/", function (req, res) {
    getTweets()
      .then((tweets) => {
        res.json(tweets);
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  /* POST new tweet */
  router.post("/", function (req, res) {
    res.send("Post Tweet");
  });

  /* POST update tweet */
  router.post("/update", function (req, res) {
    res.send("Update Tweet");
  });

  /* POST delete tweet */
  router.post("/delete", function (req, res) {
    res.send("Delete Tweet");
  });

  return router;
};
