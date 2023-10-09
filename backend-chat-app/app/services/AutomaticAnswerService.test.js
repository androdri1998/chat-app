const { emiters } = require("../constants/emiters");
const AutomaticAnswerService = require("./AutomaticAnswerService");

const automaticChatRepository = {
  getName: jest.fn(() => "test name"),
};
const messagesRepository = {
  getMessage: jest.fn(() => "test message"),
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

describe("AutomaticAnswerService tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should execute service successfully", () => {
    const message = {
      message: "test message",
      name: "test name",
    };
    const automaticAnswerService = new AutomaticAnswerService({
      messagesRepository,
      automaticChatRepository,
      logProvider,
      socketProvider,
      webSocketProvider,
    });

    automaticAnswerService.execute(message);

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(messagesRepository.getMessage).toHaveBeenCalled();
    expect(messagesRepository.getMessage).toHaveBeenCalledTimes(1);
    expect(automaticChatRepository.getName).toHaveBeenCalled();
    expect(automaticChatRepository.getName).toHaveBeenCalledTimes(1);
    expect(socketProvider.getId).toHaveBeenCalled();
    expect(socketProvider.getId).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emitToSender).toHaveBeenCalled();
    expect(webSocketProvider.emitToSender).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emitToSender).toBeCalledWith({
      emitName: emiters.receiveMessage,
      value: {
        message: "test message",
        name: "test name",
        sentByUser: false,
      },
      socketId: 1,
    });
  });

  it("Should execute service with default message successfully", () => {
    const message = {
      message: "test message",
      name: "test name",
    };
    messagesRepository.getMessage.mockImplementation(
      jest.fn((key) => {
        return key === "default" ? "default message" : undefined;
      })
    );
    const automaticAnswerService = new AutomaticAnswerService({
      messagesRepository,
      automaticChatRepository,
      logProvider,
      socketProvider,
      webSocketProvider,
    });

    automaticAnswerService.execute(message);

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(messagesRepository.getMessage).toHaveBeenCalled();
    expect(messagesRepository.getMessage).toHaveBeenCalledTimes(2);
    expect(automaticChatRepository.getName).toHaveBeenCalled();
    expect(automaticChatRepository.getName).toHaveBeenCalledTimes(1);
    expect(socketProvider.getId).toHaveBeenCalled();
    expect(socketProvider.getId).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emitToSender).toHaveBeenCalled();
    expect(webSocketProvider.emitToSender).toHaveBeenCalledTimes(1);
    expect(webSocketProvider.emitToSender).toBeCalledWith({
      emitName: emiters.receiveMessage,
      value: {
        message: "default message",
        name: "test name",
        sentByUser: false,
      },
      socketId: 1,
    });
  });

  it("Should execute service fail", () => {
    const message = {
      message: "test message",
      name: "test name",
    };
    const mockError = new Error("Test error");
    messagesRepository.getMessage.mockImplementation(
      jest.fn(() => {
        throw mockError;
      })
    );
    const automaticAnswerService = new AutomaticAnswerService({
      messagesRepository,
      automaticChatRepository,
      logProvider,
      socketProvider,
      webSocketProvider,
    });

    automaticAnswerService.execute(message);

    expect(logProvider.error).toHaveBeenCalled();
    expect(logProvider.error).toHaveBeenCalledTimes(1);
    expect(logProvider.error).toHaveBeenCalledWith(
      mockError.message,
      expect.stringContaining(mockError.message)
    );
    expect(messagesRepository.getMessage).toHaveBeenCalled();
    expect(messagesRepository.getMessage).toHaveBeenCalledTimes(1);
    expect(automaticChatRepository.getName).not.toHaveBeenCalled();
    expect(socketProvider.getId).not.toHaveBeenCalled();
    expect(webSocketProvider.emitToSender).not.toHaveBeenCalled();
  });
});
