const db = require("../service/db-service");

module.exports = (args) => {
  let [driverName, startTime, endTime, distance] = args;
  const driver = db.select("drivers", { name: driverName })[0];

  const driverId = driver?.id;
  if (!driverId) {
    throw new Error("Command Import error -- cannot add trip, driver doesn't exist");
  }

  distance = parseFloat(distance);
  const newTrip = db.insert("trips", { driverId, startTime, endTime, distance });

  //return for testing
  return newTrip;
};
