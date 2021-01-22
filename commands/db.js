const output = require("../utils/output");
const db = require("../service/db-service");

module.exports = (args) => {
  let subCommand = args[0];
  subCommand = subCommand.toLowerCase();

  if (subCommand === "status") {
    output.tables();
  } else if (subCommand === "dangerouslyclearfortesting") {
    db.dangerouslyWipeDB();
  }
};
