const fs = require("fs");
const driver = require("./driver");
const trip = require("./trip");

exports.importFile = (args) => {
  const [filePath] = args;
  const commandLines = this.parseFile(filePath);
  //split driver and trip commands to ensure driver commands are executed first
  const { driverCommands, tripCommands } = this.splitCommands(commandLines);

  for (let driverCommand of driverCommands) {
    driver(driverCommand);
  }

  for (let tripCommand of tripCommands) {
    trip(tripCommand);
  }
};

exports.parseFile = (filePath) => {
  try {
    const string = fs.readFileSync(filePath, "utf8");
    // should this return null or []?
    return string.split(/\n|\r/) ?? null;
  } catch (err) {
    console.error(err);
  }
};

exports.splitCommands = (commandLines) => {
  let driverCommands = [];
  let tripCommands = [];

  for (const line of commandLines) {
    const inputs = line.split(" ");

    const command = inputs.shift().toLowerCase();
    if (command === "driver") {
      driverCommands.push(inputs);
    } else if (command === "trip") {
      tripCommands.push(inputs);
    } else {
      throw new Error("File parse error -- invalid command");
    }
  }
  return { driverCommands, tripCommands };
};
