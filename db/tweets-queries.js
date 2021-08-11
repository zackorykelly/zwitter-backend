module.exports = (db) => {
  const getTweets = () => {
    const query = {
      text: "SELECT * FROM tweets;",
    };

    return db.query(query).then((result) => result.rows);
  };

  const getTweetsByUser = (userID) => {
    const query = {
      text: "SELECT * FROM tweets WHERE id = $1;",
      values: [userID],
    };

    return db.query(query).then((result) => result.rows);
  };

  return {
    getTweets,
    getTweetsByUser,
  };
};
