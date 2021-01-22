const expect = require("chai").expect;
const file = require("../commands/file");

describe("Text file import", function () {
  it("Parses a text file into an array of command lines", function () {
    const lines = file.parseFile("./testdata.txt");

    expect(lines[0]).to.equal("Driver Dan");
    expect(lines[1]).to.equal("Driver Lauren");
    expect(lines[lines.length - 1]).to.equal("Trip Lauren 12:01 13:16 42.0");
  });

  it("Splits driver and trip commands", function () {
    expect(file.splitCommands(["Driver Dan", "Trip Lauren 12:01 13:16 42.0"])).to.deep.equal({
      driverCommands: [["Dan"]],
      tripCommands: [["Lauren", "12:01", "13:16", "42.0"]],
    });
  });
});
