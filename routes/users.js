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
    getUserByUsername(newUsername)
      .then((user) => {
        if (user) {
          // Duplicate username path
          return res.json("Username already in use");
        }
        // No duplicate username, proceed with registration
        createUser(newUsername, newPassword)
          .then((user) => {
            return res.json(user);
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
          req.session["user_id"] = user[0].id;
          return res.json(req.session["user_id"]);
        }
        // If either the username is invalid, or if the username is valid but password does not match, return same error
        return res.json("Login fail");
      })
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  /* POST user logous */
  router.post("/logout", function (req, res) {
    res.clearCookie("session");
    res.json("Logged Out");
  });

  return router;
};
