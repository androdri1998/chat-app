const SendMessageService = require("./SendMessageService");

const chatEmiter = {
  emitReceiveMessage: jest.fn(),
};
const logProvider = {
  error: jest.fn(),
};

describe("SendMessageService tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should execute service successfully", () => {
    const message = {
      name: "test name",
      message: "test message",
    };
    const sendMessageService = new SendMessageService({
      chatEmiter,
      logProvider,
    });

    sendMessageService.execute(message);

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(chatEmiter.emitReceiveMessage).toHaveBeenCalled();
    expect(chatEmiter.emitReceiveMessage).toHaveBeenCalledTimes(1);
    expect(chatEmiter.emitReceiveMessage).toBeCalledWith(message);
  });

  it("Should execute service fail", () => {
    const mockError = new Error("Test error");
    const message = {
      name: "test name",
      message: "test message",
    };
    chatEmiter.emitReceiveMessage.mockImplementation(
      jest.fn(() => {
        throw mockError;
      })
    );
    const sendMessageService = new SendMessageService({
      chatEmiter,
      logProvider,
    });

    sendMessageService.execute(message);

    expect(logProvider.error).toHaveBeenCalled();
    expect(logProvider.error).toHaveBeenCalledTimes(1);
    expect(logProvider.error).toHaveBeenCalledWith(
      mockError.message,
      expect.stringContaining(mockError.message)
    );
    expect(chatEmiter.emitReceiveMessage).toHaveBeenCalled();
    expect(chatEmiter.emitReceiveMessage).toHaveBeenCalledTimes(1);
    expect(chatEmiter.emitReceiveMessage).toBeCalledWith(message);
  });
});
