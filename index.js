const minimist = require("minimist");
const error = require("./utils/error");

global.rootDirName = __dirname;

module.exports = () => {
  console.log("DON'T PANIC");
  const input = minimist(process.argv.slice(2));

  let [command, ...args] = input._;

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
    default:
      error(`"${command}" is not a valid command.`, true);
  }
};
