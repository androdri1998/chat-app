class MessagesRepository {
  constructor() {
    this.messages = new Map();
  }

  setMessage(key, value) {
    this.messages.set(key, value);
  }

  getMessage(key) {
    return this.messages.get(key);
  }
}

module.exports = MessagesRepository;
