const expect = require("chai").expect;
const trip = require("../commands/trip");
const db = require("../service/db-service");

describe("Trip command properly adds a trip to the json db", function () {
  before(function () {
    db.dangerouslyWipeDB();
  });

  it("Trip can be added to json database", function () {
    expect(function () {
      trip(["Joe", "12:01", "13:16", "42.0"]);
    }).to.throw();

    db.insert("drivers", { name: "Joe" });
    expect(trip(["Joe", "12:01", "13:16", "42.0"])).to.deep.equal({
      id: 1,
      driverId: 1,
      startTime: "12:01",
      endTime: "13:16",
      distance: 42,
    });
    expect(db.readTable("trips")).to.deep.equal([
      {
        id: 1,
        driverId: 1,
        startTime: "12:01",
        endTime: "13:16",
        distance: 42,
      },
    ]);
  });
});
