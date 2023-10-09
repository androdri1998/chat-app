const express = require("express");
const { createServer } = require("node:http");
const helmet = require("helmet");
const cors = require("cors");

const config = require("./config");
const WebSocketProvider = require("./infra/providers/WebSocketProvider");
const { messages } = require("./constants/messages");
const LogProvider = require("./infra/providers/LogProvider");
const AutomaticChatRepository = require("./infra/repositories/AutomaticChatRepository");
const MessagesRepository = require("./infra/repositories/MessagesRepository");
const InitAutomaticChatService = require("./services/InitAutomaticChatService");

const app = express();
const server = createServer(app);
const logProvider = new LogProvider();
const automaticChatRepository = new AutomaticChatRepository();
const messagesRepository = new MessagesRepository();

const initAutomaticChatService = new InitAutomaticChatService({
  automaticChatRepository,
  messagesRepository,
  logProvider,
});
initAutomaticChatService.execute();
const webSocketProvider = new WebSocketProvider({
  server,
  originUrl: config.frontendURL,
  logProvider: logProvider,
  automaticChatRepository,
  messagesRepository,
});

app.use(helmet());
app.use(express.json());
app.use(cors());

webSocketProvider.startListeners();

app.use((err, req, res, next) => {
  logProvider.error(err.message, err);
  res.json({ message: messages.errorDefault, error: err.statuCode });
  next(err);
});

module.exports = server;
