const bcrypt = require("bcrypt");

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT id, username, created_at FROM users;",
    };

    return db.query(query).then((result) => result.rows);
  };

  // Used for registration
  const createUser = (newUsername, newPassword) => {
    const encryptedPass = bcrypt.hashSync(newPassword, 10);
    const query = {
      text: "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING id, username;",
      values: [newUsername, encryptedPass],
    };

    return db.query(query).then((result) => result.rows);
  };

  // Used to retrieve user for login
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
