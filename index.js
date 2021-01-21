const minimist = require("minimist");

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
      if (command === undefined) {
        console.log("Enter a valid command.");
      } else {
        console.log(`${command} is not a valid command.`);
      }
  }
};
