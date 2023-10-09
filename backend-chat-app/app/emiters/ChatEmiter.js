const { emiters } = require("../constants/emiters");

class ChatEmiter {
  constructor({
    socketProvider,
    webSocketProvider,
    automaticAnswerService,
    logProvider,
  }) {
    this.socketProvider = socketProvider;
    this.webSocketProvider = webSocketProvider;
    this.automaticAnswerService = automaticAnswerService;
    this.logProvider = logProvider;

    this.emitReceiveMessage = this.emitReceiveMessage.bind(this);
  }

  emitReceiveMessage(data) {
    try {
      const message = {
        sentByUser: true,
        name: data.name,
        message: data.message,
      };
      this.webSocketProvider.emitToSender({
        emitName: emiters.receiveMessage,
        value: message,
        socketId: this.socketProvider.getId(),
      });

      this.automaticAnswerService.execute(data);
    } catch (err) {
      this.logProvider.error(err.message, err.stack);
    }
  }
}

module.exports = ChatEmiter;
