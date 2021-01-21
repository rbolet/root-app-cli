//placeholder
const menus = {
  main: `
    root-trips-cli [command] <options>

    towel .............. you know where your towel is
    version ............ show package version
    help ............... show help menu for a command`,

  towel: `
    You are one hoopy frood!`,
};

module.exports = (args) => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
