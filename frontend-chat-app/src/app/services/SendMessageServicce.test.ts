import { describe, it, expect, vi, beforeEach } from "vitest";

import SendMessageService from "./SendMessageServicce";
import { WebSocketProvider as IWebSocketProvider } from "../providers/interfaces/WebSocketProvider";
import WebSocketProvider from "../providers/fakes/WebSocketProvider";
import { socket } from "../lib";
import { emiters } from "../constants";

vi.mock("socket.io-client");
vi.mock("../providers/fakes/WebSocketProvider");

describe("SendMessageService tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it("should execute service successfully", () => {
    const message = {
        message: "test message",
        name: "test name",
    };

    const webSocketProvider: IWebSocketProvider = new WebSocketProvider(socket);
    const sendMessageService = new SendMessageService(webSocketProvider);
    sendMessageService.execute(message);

    expect(webSocketProvider.emit).toHaveBeenCalled();
    expect(webSocketProvider.emit).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emit).toHaveBeenCalledWith(emiters.sendMessage, message);
  });
});
