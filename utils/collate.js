const db = require("../service/db-service");

exports.groupDriverTrips = (driver) => {
  if (!driver?.id) throw new Error("Error getting driver trips - invalid driver");
  const trips = db.select("trips", { driverId: driver.id });

  return { ...driver, trips };
};

exports.getAllDriverTrips = (driversArray) => {
  let allDriverTrips = [];
  for (const driver of driversArray) {
    const driverTrips = this.groupDriverTrips(driver);
    allDriverTrips.push(driverTrips);
  }

  return allDriverTrips;
};
