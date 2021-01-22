const expect = require("chai").expect;
const driver = require("../commands/driver");
const db = require("../service/db-service");

describe("Drivers can be added to the db", function () {
  before(function () {
    db.dangerouslyWipeDB();
  });
  it("Driver command adds a driver to the json db", function () {
    expect(driver(["Joe"])).to.deep.equal({ id: 1, name: "Joe" });
    expect(driver(["Fred"])).to.deep.equal({ id: 2, name: "Fred" });
    expect(db.readTable("drivers")).to.deep.equal([
      { id: 1, name: "Joe" },
      { id: 2, name: "Fred" },
    ]);
  });
});
