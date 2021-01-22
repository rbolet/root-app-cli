const db = require("../service/db-service");

exports.tables = () => {
  const jsonData = db.readDB();

  console.log("<<Drivers>>");
  console.table(jsonData.drivers);
  console.log("<<Trips>>");
  console.table(jsonData.trips);
  return jsonData;
};
