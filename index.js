const minimist = require("minimist");

global.rootDirName = __dirname;

module.exports = () => {
  const input = minimist(process.argv.slice(2));

  let [command, ...args] = input._;
  let verbose = input.verbose || input.v;
  command = command.toLowerCase();

  if (input.version || input.v) {
    command = "version";
  }

  if (input.help || input.h) {
    command = "help";
  }

  switch (command) {
    case "version":
      require("./commands/version")(args);
      break;
    case "help":
      require("./commands/help")(args);
      break;
    case "driver":
      require("./commands/driver")(args, verbose);
      break;
    case "trip":
      require("./commands/trip")(args, verbose);
      break;
    case "db":
      require("./commands/db")(args);
      break;
    default:
      throw new Error(`"${command}" is not a valid command.`);
  }
};
