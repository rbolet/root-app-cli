module.exports = (message, exit) => {
  console.error(message);
  if (exit) console.error("x.x Exiting with exist status (1) ...");
  exit && process.exit(1);
};
