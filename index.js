const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const slackApp = require("./app");
const { PORT } = process.env;

slackApp.start(Number(PORT)).then(() => {
  console.log(`⚡️ Bolt app is running on port ${PORT}!`);
});
