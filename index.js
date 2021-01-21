const minimist = require("minimist");

module.exports = () => {
  console.log("DON'T PANIC");
  const arguments = minimist(process.argv.slice(2));
  const command = arguments?._[0];

  switch (command) {
    case "towel":
      console.log("You're one hoopy frood!");
      break;
    default:
      if (command === undefined) {
        console.log("Enter a valid command.");
      } else {
        console.log(`${command} is not a valid command.`);
      }
  }
};
