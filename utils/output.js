const db = require("../service/db-service");
const collate = require("./collate");
const calculate = require("./calculate");

exports.tables = () => {
  const jsonData = db.readDB();

  console.log(`
  <<Drivers>>`);
  console.table(jsonData.drivers);
  console.log(`
  <<Trips>>`);
  console.table(jsonData.trips);
  //return for testing purposes
  return jsonData;
};

exports.summary = () => {
  const outputArray = [];
  const allDriverTrips = collate.getAllDriverTrips(db.select("drivers"));

  for (const driverTrips of allDriverTrips) {
    const { name } = driverTrips;
    const { totalDistance, averageSpeed } = calculate.sumAndAverageRows(driverTrips.trips);

    const stringAverageSpeed = totalDistance > 0 ? ` @ ${averageSpeed} mph` : "";
    const stringOutput = `${name}: ${totalDistance} miles${stringAverageSpeed}`;

    outputArray.push(stringOutput);
  }
  logSummary(outputArray);
  return outputArray;
};

function logSummary(summaryArray) {
  console.log(`
  *** Summary ***`);
  for (const line of summaryArray) {
    console.log(line);
  }
}
