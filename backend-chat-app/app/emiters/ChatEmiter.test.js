const { emiters } = require("../constants/emiters");
const ChatEmiter = require("./ChatEmiter");

const automaticAnswerService = {
  execute: jest.fn(),
};
const webSocketProvider = {
  emitToSender: jest.fn(),
};
const socketProvider = {
  getId: jest.fn(() => 1),
};
const logProvider = {
  error: jest.fn(),
};

describe("ChatEmiter tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should execute emmiter successfully", () => {
    const message = {
      message: "test message",
      name: "test name",
    };
    const chatEmiter = new ChatEmiter({
      socketProvider,
      webSocketProvider,
      automaticAnswerService,
      logProvider,
    });

    chatEmiter.emitReceiveMessage(message);

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(socketProvider.getId).toHaveBeenCalled();
    expect(socketProvider.getId).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emitToSender).toHaveBeenCalled();
    expect(webSocketProvider.emitToSender).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emitToSender).toBeCalledWith({
      emitName: emiters.receiveMessage,
      value: {
        message: "test message",
        name: "test name",
        sentByUser: true,
      },
      socketId: 1,
    });
    expect(automaticAnswerService.execute).toHaveBeenCalled();
    expect(automaticAnswerService.execute).toHaveBeenCalledTimes(1);
    expect(automaticAnswerService.execute).toBeCalledWith(message);
  });

  it("Should execute emiter fail", () => {
    const message = {
      message: "test message",
      name: "test name",
    };
    const mockError = new Error("Test error");
    webSocketProvider.emitToSender.mockImplementation(
      jest.fn(() => {
        throw mockError;
      })
    );
    const chatEmiter = new ChatEmiter({
      socketProvider,
      webSocketProvider,
      automaticAnswerService,
      logProvider,
    });

    chatEmiter.emitReceiveMessage(message);

    expect(logProvider.error).toHaveBeenCalled();
    expect(logProvider.error).toHaveBeenCalledTimes(1);
    expect(logProvider.error).toHaveBeenCalledWith(
      mockError.message,
      expect.stringContaining(mockError.message)
    );
    expect(webSocketProvider.emitToSender).toHaveBeenCalled();
    expect(webSocketProvider.emitToSender).toHaveBeenCalledTimes(1);
    expect(socketProvider.getId).toHaveBeenCalled();
    expect(socketProvider.getId).toHaveBeenCalledTimes(1);
    expect(automaticAnswerService.execute).not.toHaveBeenCalled();
  });
});
