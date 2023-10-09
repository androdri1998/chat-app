class SendMessageService {
  constructor({ logProvider, chatEmiter }) {
    this.logProvider = logProvider;
    this.chatEmiter = chatEmiter;

    this.execute = this.execute.bind(this);
  }

  execute(data) {
    try {
      this.chatEmiter.emitReceiveMessage(data);
    } catch (err) {
      this.logProvider.error(err.message, err.stack);
    }
  }
}

module.exports = SendMessageService;
