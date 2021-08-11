const bcrypt = require("bcrypt");

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT id, username, created_at FROM users;",
    };

    return db.query(query).then((result) => result.rows);
  };

  const createUser = (newUsername, newPassword) => {
    const encryptedPass = bcrypt.hashSync(newPassword, 10);
    const query = {
      text: "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING id;",
      values: [newUsername, encryptedPass],
    };

    return db.query(query).then((result) => result.rows);
  };

  const getUserByUsername = (username) => {
    const query = {
      text: "SELECT * FROM users WHERE username = $1;",
      values: [username],
    };

    return db.query(query).then((result) => result.rows);
  };

  return {
    getUsers,
    getUserByUsername,
    createUser,
  };
};
