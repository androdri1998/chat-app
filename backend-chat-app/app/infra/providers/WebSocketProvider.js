const { Server } = require("socket.io");
const ChatListener = require("../../listeners/ChatListener");
const SocketProvider = require("./SocketProvider");
const StartListenersService = require("../../services/StartListenersService");
const ChatEmiter = require("../../emiters/ChatEmiter");
const { listeners } = require("../../constants/listeners");
const AutomaticAnswerService = require("../../services/AutomaticAnswerService");

class WebSocketProvider {
  constructor({
    server,
    originUrl,
    logProvider,
    automaticChatRepository,
    messagesRepository,
  }) {
    this.websocket = new Server(server, {
      cors: {
        origin: originUrl,
      },
    });
    this.logProvider = logProvider;
    this.automaticChatRepository = automaticChatRepository;
    this.messagesRepository = messagesRepository;

    this.getWebsocketServer = this.getWebsocketServer.bind(this);
    this.startListeners = this.startListeners.bind(this);
  }

  getWebsocketServer() {
    return this.websocket;
  }

  subscribe(listenerName, callback = () => {}) {
    this.websocket.on(listenerName, callback);
  }

  emitToSender({ emitName, value, socketId }) {
    this.websocket.to(socketId).emit(emitName, value);
  }

  startListeners() {
    this.subscribe(listeners.connection, (socket) => {
      const socketProvider = new SocketProvider(socket);
      const automaticAnswerService = new AutomaticAnswerService({
        socketProvider,
        webSocketProvider: this,
        automaticChatRepository: this.automaticChatRepository,
        messagesRepository: this.messagesRepository,
        logProvider: this.logProvider,
      });
      const chatEmiter = new ChatEmiter({
        socketProvider,
        webSocketProvider: this,
        automaticAnswerService,
        logProvider: this.logProvider,
      });
      const chatListener = new ChatListener({
        logProvider: this.logProvider,
        chatEmiter,
      });

      const startListenersService = new StartListenersService({
        logProvider: this.logProvider,
        chatListener,
        socketProvider,
      });
      startListenersService.execute();
    });
  }
}

module.exports = WebSocketProvider;
