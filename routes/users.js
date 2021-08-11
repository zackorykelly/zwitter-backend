const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = ({ getUsers, createUser, getUserByUsername }) => {
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
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    getUsers()
      .then((users) => {
        if (users.find((user) => user.username === newUsername)) {
          // Duplicate username
          return res.send("Username already in use");
        }
        // No duplicate, proceed with registration
        createUser(newUsername, newPassword)
          .then((user) => {
            return res.send(user);
          })
          .catch((err) => {
            res.json({
              error: err.message,
            });
          });
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  /* POST user login */
  router.post("/login", function (req, res) {
    const loginUsername = req.body.username;
    const loginPassword = req.body.password;
    getUserByUsername(loginUsername)
      .then((user) => {
        if (user[0] && bcrypt.compareSync(loginPassword, user[0].password)) {
          return res.send("Login success");
        }
        return res.send("Login fail");
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  return router;
};
