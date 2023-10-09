class AutomaticChatRepository {
  constructor() {
    this.automaticChat = new Map();
  }

  setName(name) {
    this.automaticChat.set("name", name);
  }

  getName() {
    return this.automaticChat.get("name");
  }
}

module.exports = AutomaticChatRepository;
