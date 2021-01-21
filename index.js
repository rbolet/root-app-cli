const arguments = require("minimist")(process.argv.slice(2));
module.exports = () => {
  console.log("DON'T PANIC");
  console.log(arguments);
  console.log(Array.isArray(arguments._));
};
