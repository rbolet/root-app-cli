const expect = require("chai").expect;
const db = require("../service/db-service");
const dbCommand = require("../commands/db");

describe("db service can insert to json 'tables'", function () {
  it("Can wipe the db for testing", function () {
    db.dangerouslyWipeDB();
    expect(db.readDB()).to.deep.equal({ drivers: [], trips: [] });
  });
});

describe("db service can read the contents of the .json 'db'", function () {
  it("Returns the entire db", function () {
    expect(db.readDB()).to.haveOwnProperty("drivers");
    expect(db.readDB()).to.haveOwnProperty("trips");
  });
  it("Returns a specific table", function () {
    expect(db.readTable("drivers")).to.deep.equal([]);
    expect(db.readTable("trips")).to.deep.equal([]);
    expect(function () {
      db.readTable("towels");
    }).to.throw("towels");
  });
});

describe("Can CR(UD) into json tables", function () {
  it("Bad inputs fail", function () {
    expect(db.insert).to.throw();
    expect(function () {
      db.insert("towel");
    }).to.throw();
    expect(function () {
      db.insert("drivers", { namer: "Steve" });
    }).to.throw("column");
    expect(function () {
      db.insert("trips", { name: "Steve" });
    }).to.throw("column");
  });

  it("Fake db insert method works as expected", function () {
    expect(db.insert("drivers", { name: "Steve" })).to.deep.equal({ id: 1, name: "Steve" });
    expect(db.insert("drivers", { name: "Frank" })).to.deep.equal({ id: 2, name: "Frank" });
  });

  it("Can read from db json file", function () {
    expect(db.readTable("drivers")).to.deep.equal([
      { id: 1, name: "Steve" },
      { id: 2, name: "Frank" },
    ]);
  });

  it("Can select from driver table", function () {
    expect(db.select("drivers", { id: 4 })).to.deep.equal([]);
    expect(db.select("drivers", { id: 1 })).to.deep.equal([{ id: 1, name: "Steve" }]);
    expect(db.select("drivers")).to.deep.equal([
      { id: 1, name: "Steve" },
      { id: 2, name: "Frank" },
    ]);
  });

  it("Can insert into trips table", function () {
    const testTrip = { driverId: 2, startTime: "12:00", endTime: "12:30", distance: 1.5 };
    expect(db.insert("trips", testTrip)).to.deep.equal({ id: 1, ...testTrip });
  });

  it("Can read trips from db json file", function () {
    expect(db.readTable("trips")).to.deep.equal([
      { id: 1, driverId: 2, startTime: "12:00", endTime: "12:30", distance: 1.5 },
    ]);
  });

  it("Can select from trips table", function () {
    expect(db.select("trips", { id: 4 })).to.deep.equal([]);
    expect(db.select("trips", { id: 1 })).to.deep.equal([
      { id: 1, driverId: 2, startTime: "12:00", endTime: "12:30", distance: 1.5 },
    ]);
    expect(db.select("trips", { driverId: 2 })).to.deep.equal([
      { id: 1, driverId: 2, startTime: "12:00", endTime: "12:30", distance: 1.5 },
    ]);
  });

  it("Whole db from file matches properly", function () {
    expect(db.readDB()).to.deep.equal({
      drivers: [
        { id: 1, name: "Steve" },
        { id: 2, name: "Frank" },
      ],
      trips: [{ id: 1, driverId: 2, startTime: "12:00", endTime: "12:30", distance: 1.5 }],
    });
  });
});

describe("Db command", function () {
  it("Can wipe db with command", function () {
    dbCommand(["DangerouslyClearForTesting"]);
    expect(db.readDB()).to.deep.equal({ drivers: [], trips: [] });
  });
});
