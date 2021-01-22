const expect = require("chai").expect;
const output = require("../utils/output");
const db = require("../service/db-service");
const driver = require("../commands/driver");
const trip = require("../commands/trip");

describe("Output utility functions", function () {
  before(function () {
    db.dangerouslyWipeDB();
    driver(["Dan"]);
    driver(["Lauren"]);
    driver(["Kumi"]);
    trip(["Dan", "07:15", "07:45", "17.3"]);
    trip(["Dan", "06:12", "06:32", "21.8"]);
    trip(["Lauren", "12:01", "13:16", "42.0"]);
  });

  it("Tables output as expected", function () {
    expect(output.tables()).to.deep.equal({
      drivers: [
        { id: 1, name: "Dan" },
        { id: 2, name: "Lauren" },
        { id: 3, name: "Kumi" },
      ],
      trips: [
        { id: 1, driverId: 1, startTime: "07:15", endTime: "07:45", distance: 17.3 },
        { id: 2, driverId: 1, startTime: "06:12", endTime: "06:32", distance: 21.8 },
        { id: 3, driverId: 2, startTime: "12:01", endTime: "13:16", distance: 42 },
      ],
    });
  });

  it("Summary output is as expected", function () {
    expect(output.summary()).to.deep.equal([
      "Dan: 39 miles @ 47 mph",
      "Lauren: 42 miles @ 34 mph",
      "Kumi: 0 miles",
    ]);
  });
});
