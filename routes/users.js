var express = require("express");
var router = express.Router();

module.exports = ({ getUsers }) => {
  /* GET users listing. */
  router.get("/", function (req, res) {
    getUsers()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  /* POST new user */
  router.post("/", function (req, res) {
    res.send("Post Users");
  });

  return router;
};
