const minimist = require("minimist");
const error = require("./utils/error");

module.exports = () => {
  console.log("DON'T PANIC");
  const args = minimist(process.argv.slice(2));

  let command = args._[0] || "help";

  if (args.version || args.v) {
    command = "version";
  }

  if (args.help || args.h) {
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
