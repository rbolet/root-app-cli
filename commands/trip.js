const db = require("../service/db-service");
const calculate = require("../utils/calculate");

module.exports = (args) => {
  let [driverName, startTime, endTime, distance] = args;

  distance = parseFloat(distance);
  const { averageSpeed } = calculate.sumAndAverageRows([{ startTime, endTime, distance }]);

  if (averageSpeed < 5) {
    const message = "Trips < 5 mph are ignored";
    console.log(message);
    return message;
  } else if (averageSpeed > 100) {
    const message = "Trips > 100 mph are ignored";
    console.log(message);
    return message;
  } else {
    const driver = db.select("drivers", { name: driverName })[0];

    const driverId = driver?.id;
    if (!driverId) {
      throw new Error("Command Import error -- cannot add trip, driver doesn't exist");
    }

    const newTrip = db.insert("trips", { driverId, startTime, endTime, distance });

    //return for testing
    return newTrip;
  }
};
