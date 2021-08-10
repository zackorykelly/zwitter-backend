const express = require("express");
const router = express.Router();

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
  router.post("/register", function (req, res) {
    getUsers()
      .then((users) => {
        if (users.find((user) => user.username === newUsername)) {
          return 0;
        }
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  /* POST user login */
  router.post("/login", function (req, res) {
    const loginUsername = "";
    const loginPassword = "";
    getUserByUsername(loginUsername)
      .then((user) => {
        if (user[0].password === loginPassword) {
          return 0;
        }
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  return router;
};
