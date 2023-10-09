const SendMessageService = require("../services/SendMessageService");

class ChatListener {
  constructor({ logProvider, chatEmiter }) {
    this.logProvider = logProvider;
    this.chatEmiter = chatEmiter;

    this.onSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(data) {
    const sendMessageService = new SendMessageService({
      chatEmiter: this.chatEmiter,
      logProvider: this.logProvider,
    });

    sendMessageService.execute(data);
  }
}

module.exports = ChatListener;
