module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT id, username, created_at FROM users",
    };

    return db.query(query).then((result) => result.rows);
  };

  return {
    getUsers,
  };
};
