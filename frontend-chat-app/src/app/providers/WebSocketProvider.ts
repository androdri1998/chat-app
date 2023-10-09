import { Socket } from "socket.io-client";
import { WebSocketProvider as IWebSocketProvider } from "./interfaces/WebSocketProvider";

export default class WebSocketProvider implements IWebSocketProvider {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

    subscribe<DataType>(listenerName: string, callback: (data: DataType) => void): void {
        this.socket.on(listenerName, callback);
    } 

    unsubscribe<DataType>(listenerName: string, callback: (data: DataType) => void): void {
        this.socket.off(listenerName, callback);
    }

    emit<DataType>(emitName: string, value: DataType): void {
        this.socket.emit(emitName, value);
    }
}