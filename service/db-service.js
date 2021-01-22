const fs = require("fs");
const path = require("path");
const dbFilePath = path.join(process.env.PWD, "/database/db.json");
// const error = require("./error");

module.exports = {
  tempDrivers: [],
  tempTrips: [],
  select(fakeTableName, criteria = false) {
    if (!fakeTableName) {
      throw new Error("Database insert error -- table name incorrect or missing");
    }

    let table = this.getTableFromName(fakeTableName);
    const tableData = this.readTable(fakeTableName);
    table = tableData;

    if (!criteria) {
      // select() with no arguments === "SELECT *"
      return table;
    } else {
      const result = [];
      const selectBy = Object.keys(criteria);

      for (const column of selectBy) {
        this.validateColumns(fakeTableName, column);
        for (const row of table) {
          if (criteria[column] === row[column]) {
            // ignore duplicates (where multiple criteria fit a single result)
            if (!result.some((resultRow) => resultRow?.id === row.id)) {
              result.push(row);
            }
          }
        }
      }
      return result;
    }
  },
  insert(fakeTableName, columns = {}) {
    //put up to date values in the temp arrays
    this.temporarilyLoadTables();

    Object.keys(columns).forEach((column) => {
      this.validateColumns(fakeTableName, column);
    });

    const table = this.getTableFromName(fakeTableName);
    const newRow = { id: this.generateId(table, fakeTableName), ...columns };
    table.push(newRow);

    //write up to date values + newly added row to file
    this.writeDB();

    //return for testing
    return newRow;
  },
  getTableFromName(fakeTableName) {
    let table;
    if (fakeTableName === "drivers") {
      table = this.tempDrivers;
    } else if (fakeTableName === "trips") {
      table = this.tempTrips;
    } else {
      throw new Error("Database insert error -- table name incorrect or missing");
    }
    return table;
  },
  generateId(fakeTable, fakeTableName) {
    if (fakeTableName === "drivers" || fakeTableName === "trips") {
      const lastId = fakeTable.length ? fakeTable[fakeTable.length - 1]?.id : 0;
      return lastId + 1;
    }
    throw new Error("Database error -- could not generate id");
  },
  validateColumns(fakeTableName, column) {
    let isValid = false;
    if (fakeTableName === "drivers") {
      switch (column) {
        case "id":
        case "name":
          isValid = true;
          break;
        default:
          isValid = false;
      }
    } else if (fakeTableName === "trips") {
      switch (column) {
        case "id":
        case "driverId":
        case "startTime":
        case "endTime":
        case "distance":
          isValid = true;
          break;
        default:
          isValid = false;
      }
    }

    if (!isValid) throw new Error("Database error -- invalid column");
    return isValid;
  },
  temporarilyLoadTables() {
    const { drivers, trips } = this.readDB();
    this.tempDrivers = drivers;
    this.tempTrips = trips;
  },
  readTable(table) {
    if (table === "drivers" || table === "trips") {
      return this.readDB()[table];
    } else {
      throw new Error(`Cannot read table "${table}"`);
    }
  },
  readDB() {
    try {
      const db = JSON.parse(fs.readFileSync(dbFilePath));
      if (!db) {
        throw new Error("Cannot find json database file!");
      }
      return db;
    } catch {
      throw new Error("Error reading json db");
    }
  },
  writeDB() {
    const dbObject = { drivers: this.tempDrivers, trips: this.tempTrips };
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(dbObject));
    } catch {
      throw new Error("Error writing to json db");
    }
    return dbObject;
  },
  dangerouslyWipeDB() {
    this.tempTrips = [];
    this.tempDrivers = [];
    this.writeDB();
  },
};
