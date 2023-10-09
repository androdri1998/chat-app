const { listeners } = require("../constants/listeners");

class StartListenersService {
  constructor({ socketProvider, logProvider, chatListener }) {
    this.socketProvider = socketProvider;
    this.logProvider = logProvider;
    this.chatListener = chatListener;

    this.execute = this.execute.bind(this);
  }

  execute() {
    try {
      this.socketProvider.subscribe(
        listeners.sendMessage,
        this.chatListener.onSendMessage
      );
    } catch (err) {
      this.logProvider.error(err.message, err.stack);
    }
  }
}

module.exports = StartListenersService;
