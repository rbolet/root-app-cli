const fs = require("fs");
const driver = require("./driver");
const trip = require("./trip");

module.exports = (args) => {
  const [filePath] = args;
  let commandLines = [];
  let addDriverCommands = [];
  let addTripCommands = [];

  try {
    const string = fs.readFileSync(filePath, "utf8");
    // should this return null or []?
    commandLines = string.split(/\n|\r/) ?? null;
  } catch (err) {
    console.error(err);
  }

  for (const line of commandLines) {
    const inputs = line.split(" ");
    if (inputs[0].toLowerCase() === "driver") {
      addDriverCommands.push(inputs);
    } else if (inputs[0].toLowerCase() === "trip") {
      addTripCommands.push(inputs);
    } else {
      throw new Error("File parse error -- invalid command");
    }
  }

  for (let driverCommand of addDriverCommands) {
    //remove "Driver" from command array
    driverCommand.shift();
    driver(driverCommand);
  }

  for (let tripCommand of addTripCommands) {
    //remove "Trip" from command array
    tripCommand.shift();
    trip(tripCommand);
  }
};
