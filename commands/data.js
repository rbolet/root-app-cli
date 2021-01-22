const output = require("../utils/output");
const db = require("../service/db-service");

module.exports = (args) => {
  let subCommand = args[0] || "status";
  subCommand = subCommand.toLowerCase();

  if (subCommand === "status") {
    output.tables();
  } else if (subCommand === "clear") {
    db.dangerouslyWipeDB();
    console.log("!! JSON db permanently cleared (hope you knew what you were doing) !!");
  }
};
