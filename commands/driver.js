const db = require("../service/db-service");

module.exports = (args) => {
  const [name] = args;
  return db.insert("drivers", { name });
};
