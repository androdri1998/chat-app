class SocketProvider {
  constructor(socket) {
    this.socket = socket;

    this.getId = this.getId.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.emit = this.emit.bind(this);
  }

  getId() {
    return this.socket.id;
  }

  subscribe(listenerName, callback = () => {}) {
    this.socket.on(listenerName, callback);
  }

  emit(emitName, value) {
    this.socket.broadcast.emit(emitName, value);
  }
}

module.exports = SocketProvider;
