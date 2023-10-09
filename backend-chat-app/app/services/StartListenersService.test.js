const { listeners } = require("../constants/listeners");
const StartListenersService = require("./StartListenersService");

const socketProvider = {
  subscribe: jest.fn(),
};
const logProvider = {
  error: jest.fn(),
};

const onSendMessageSpyOn = jest.fn();
const chatListener = {
  onSendMessage: onSendMessageSpyOn,
};

describe("StartListenersService tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should execute service successfully", () => {
    const startListenersService = new StartListenersService({
      chatListener,
      logProvider,
      socketProvider,
    });
    startListenersService.execute();

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(socketProvider.subscribe).toHaveBeenCalled();
    expect(socketProvider.subscribe).toHaveBeenCalledTimes(1);
    expect(socketProvider.subscribe).toBeCalledWith(
      listeners.sendMessage,
      chatListener.onSendMessage
    );
  });

  it("Should execute service fail", () => {
    const mockError = new Error("Test error");
    socketProvider.subscribe.mockImplementation(
      jest.fn(() => {
        throw mockError;
      })
    );
    const startListenersService = new StartListenersService({
      chatListener,
      logProvider,
      socketProvider,
    });

    startListenersService.execute();

    expect(logProvider.error).toHaveBeenCalled();
    expect(logProvider.error).toHaveBeenCalledTimes(1);
    expect(logProvider.error).toHaveBeenCalledWith(
      mockError.message,
      expect.stringContaining(mockError.message)
    );
    expect(socketProvider.subscribe).toHaveBeenCalled();
    expect(socketProvider.subscribe).toHaveBeenCalledTimes(1);
    expect(socketProvider.subscribe).toBeCalledWith(
      listeners.sendMessage,
      chatListener.onSendMessage
    );
  });
});
