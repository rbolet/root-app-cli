//placeholder
const menus = {
  main: `
    root-trips-cli [command] <options>

    driver ............. add driver to db
    trip ............... add trip to db
    db ................. show or clear json db status
    summary ............ show total distance and speed of all drivers
    version ............ show package version
    help ............... show help menu for a command`,

  towel: `
    DON'T PANIC!`,
};

module.exports = (args) => {
  const subCmd = args[0] ?? "main";

  console.log(menus[subCmd] || menus.main);
};
