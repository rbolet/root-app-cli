//placeholder
const menus = {
  main: `
    root-trips-cli [command] <options>

    driver ............. add driver to data
    trip ............... add trip to data
    data ............... show or clear json data status
    db ................. alias for data
    summary ............ show total distance and speed of all drivers
    file ............... import entire txt file to data
    version ............ show package version
    help ............... show help menu for a command`,
  db: `
      db <options>
      
      status ............... show status of current json db tables
      clear ... PERMANENTLY DELETE ALL DATA FROM JSON DB!`,
  data: `
    data <options>
        
        status ............... show status of current json db tables
        clear ... PERMANENTLY DELETE ALL DATA FROM JSON DB!`,
  towel: `
      DON'T PANIC!`,
};

module.exports = (args) => {
  const subCmd = args[0] ?? "main";

  console.log(menus[subCmd] || menus.main);
};
