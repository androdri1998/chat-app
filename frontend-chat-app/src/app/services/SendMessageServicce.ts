import { WebSocketProvider } from "../providers/interfaces/WebSocketProvider";
import { emiters } from "../constants";
import { MessageItemSocket } from "../pages/ChatPage/interfaces/MessageItem";

export default class SendMessageService {
    private webSocketProvider: WebSocketProvider;

    constructor(webSocketProvider: WebSocketProvider) {
        this.webSocketProvider = webSocketProvider;
    }

    execute(message: MessageItemSocket) {
        this.webSocketProvider.emit(emiters.sendMessage, message);
    }
}