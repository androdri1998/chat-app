require("dotenv").config();

const server = require("./app");
const config = require("./app/config");
const LogProvider = require("./app/infra/providers/LogProvider");

server.listen(config.port, () => {
  const logProvider = new LogProvider();
  logProvider.log(`listening on port ${config.port}`);
});
