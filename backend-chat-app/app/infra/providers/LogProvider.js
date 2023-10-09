const pino = require("pino");

class LogProvider {
  constructor() {
    this.logger = pino();
  }

  log(message) {
    this.logger.info(message);
  }

  error(message, stack) {
    this.logger.error({ message, stack });
  }
}

module.exports = LogProvider;
