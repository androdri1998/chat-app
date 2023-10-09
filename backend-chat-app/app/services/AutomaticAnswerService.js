const { emiters } = require("../constants/emiters");

class AutomaticAnswerService {
  constructor({
    messagesRepository,
    automaticChatRepository,
    webSocketProvider,
    socketProvider,
    logProvider,
  }) {
    this.messagesRepository = messagesRepository;
    this.automaticChatRepository = automaticChatRepository;
    this.webSocketProvider = webSocketProvider;
    this.socketProvider = socketProvider;
    this.logProvider = logProvider;

    this.execute = this.execute.bind(this);
  }

  execute(data) {
    try {
      const automaticTextMessage =
        this.messagesRepository.getMessage(data.message.toLowerCase()) ||
        this.messagesRepository.getMessage("default");
      const automaticMessage = {
        sentByUser: false,
        name: this.automaticChatRepository.getName(),
        message: automaticTextMessage,
      };

      this.webSocketProvider.emitToSender({
        emitName: emiters.receiveMessage,
        value: automaticMessage,
        socketId: this.socketProvider.getId(),
      });
    } catch (err) {
      this.logProvider.error(err.message, err.stack);
    }
  }
}

module.exports = AutomaticAnswerService;
