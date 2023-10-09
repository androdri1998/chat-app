class InitAutomaticChatService {
  constructor({ automaticChatRepository, messagesRepository, logProvider }) {
    this.automaticChatRepository = automaticChatRepository;
    this.messagesRepository = messagesRepository;
    this.logProvider = logProvider;

    this.execute = this.execute.bind(this);
  }

  execute() {
    try {
      this.automaticChatRepository.setName("Automatic chat");

      this.messagesRepository.setMessage("olá", "Olá, como vai você?");
      this.messagesRepository.setMessage("tudo bem e com você?", "Estou bem");
      this.messagesRepository.setMessage("hello", "Hello, how are you?");
      this.messagesRepository.setMessage("i'm fine and you?", "I'm fine too!");

      this.messagesRepository.setMessage(
        "default",
        "I can't understand, can you type your message again, please?"
      );
    } catch (err) {
      this.logProvider.error(err.message, err.stack);
    }
  }
}

module.exports = InitAutomaticChatService;
