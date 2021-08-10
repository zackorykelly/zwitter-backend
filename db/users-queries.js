module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT id, username, created_at FROM users",
    };

    return db.query(query).then((result) => result.rows);
  };

  const getUserByUsername = () => {
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
    };

    return db.query(query).then((result) => result.rows);
  };

  return {
    getUsers,
    getUserByUsername,
  };
};
