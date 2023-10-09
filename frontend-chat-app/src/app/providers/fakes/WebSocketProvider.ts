/* eslint-disable @typescript-eslint/no-unused-vars */
import { Socket } from "socket.io-client";
import { WebSocketProvider as IWebSocketProvider } from "../interfaces/WebSocketProvider";

export default class WebSocketProvider implements IWebSocketProvider {
    constructor(_socket: Socket) {}

    connect(): void {}

    disconnect(): void {}

    subscribe<DataType>(_listenerName: string, _callback: (data: DataType) => void): void {} 

    unsubscribe<DataType>(_listenerName: string, _callback: (data: DataType) => void): void {}

    emit<DataType>(_emitName: string, _value: DataType): void {}
}