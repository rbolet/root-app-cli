const expect = require("chai").expect;
const collate = require("../utils/collate");
const db = require("../service/db-service");
const driver = require("../commands/driver");
const trip = require("../commands/trip");

describe("Utility functions - collate", function () {
  before(function () {
    db.dangerouslyWipeDB();
    driver(["Dan"]);
    driver(["Lauren"]);
    driver(["Kumi"]);
    trip(["Dan", "07:15", "07:45", "17.3"]);
    trip(["Dan", "06:00", "06:30", "21.8"]);
    trip(["Lauren", "12:01", "13:16", "42.0"]);
  });

  it("DB status is as expected", function () {
    expect(db.readDB()).to.deep.equal({
      drivers: [
        { id: 1, name: "Dan" },
        { id: 2, name: "Lauren" },
        { id: 3, name: "Kumi" },
      ],
      trips: [
        { id: 1, driverId: 1, startTime: "07:15", endTime: "07:45", distance: 17.3 },
        { id: 2, driverId: 1, startTime: "06:00", endTime: "06:30", distance: 21.8 },
        { id: 3, driverId: 2, startTime: "12:01", endTime: "13:16", distance: 42 },
      ],
    });
  });

  it("Groups trips by driverId", function () {
    expect(function () {
      collate.groupDriverTrips(1);
    }).to.throw("invalid driver");
    expect(collate.groupDriverTrips({ id: 1, name: "Dan" })).to.deep.equal({
      id: 1,
      name: "Dan",
      trips: [
        { id: 1, driverId: 1, startTime: "07:15", endTime: "07:45", distance: 17.3 },
        { id: 2, driverId: 1, startTime: "06:00", endTime: "06:30", distance: 21.8 },
      ],
    });
  });

  it("Groups all drivers and trips", function () {
    const drivers = db.select("drivers");
    expect(collate.getAllDriverTrips(drivers)).to.deep.equal([
      {
        id: 1,
        name: "Dan",
        trips: [
          { id: 1, driverId: 1, startTime: "07:15", endTime: "07:45", distance: 17.3 },
          { id: 2, driverId: 1, startTime: "06:00", endTime: "06:30", distance: 21.8 },
        ],
      },
      {
        id: 2,
        name: "Lauren",
        trips: [{ id: 3, driverId: 2, startTime: "12:01", endTime: "13:16", distance: 42 }],
      },
      { id: 3, name: "Kumi", trips: [] },
    ]);
  });
});
