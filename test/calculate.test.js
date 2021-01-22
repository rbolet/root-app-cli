const expect = require("chai").expect;
const calculate = require("../utils/calculate");

describe("Calculate util functions", function () {
  it("Returns average speed from time and distance", function () {
    expect(calculate.averageSpeed(1, 60)).to.equal(60);
    expect(calculate.averageSpeed(2, 30)).to.equal(15);
    //make sure we're not rounding yet
    expect(calculate.averageSpeed(3, 100)).to.equal(33.333333333333336);
  });

  it("Calculates fractional hours from string start and end times", function () {
    expect(calculate.getTime("6:00", "06:30")).to.equal(0.5);
    expect(calculate.getTime("07:00", "13:00")).to.equal(6);
    //make sure we're not rounding yet
    expect(calculate.getTime("12:00", "12:01")).to.equal(0.016666666666667496);
  });

  it("Converts string times to fractional hours", function () {
    expect(calculate.convertStringsToHours("04:30")).to.equal(4.5);
    expect(calculate.convertStringsToHours("13:00")).to.equal(13);
  });

  it("Calculates rounded total distance and total average speed from array of trips", function () {
    const testTrips = [
      { id: 1, driverId: 1, startTime: "07:15", endTime: "07:45", distance: 17.3 },
      { id: 2, driverId: 1, startTime: "06:12", endTime: "06:32", distance: 21.8 },
    ];
    expect(calculate.sumAndAverageRows(testTrips)).to.deep.equal({
      totalDistance: 39,
      averageSpeed: 47,
    });
  });
});
