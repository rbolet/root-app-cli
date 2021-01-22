const db = require("../service/db-service");
const output = require("../utils/output");

module.exports = (args, verbose) => {
  const [name] = args;
  const newDriver = db.insert("drivers", { name });

  if (verbose) output.tables();
  output.summary();

  //return for testing purposes;
  return newDriver;
};
