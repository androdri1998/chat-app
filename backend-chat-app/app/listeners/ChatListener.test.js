const ChatListener = require("./ChatListener");
const SendMessageService = require("../services/SendMessageService");

jest.mock("../services/SendMessageService");

const chatEmiter = {
  emitReceiveMessage: jest.fn(),
};
const logProvider = {
  error: jest.fn(),
};

describe("ChatListener tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should execute listener successfully", () => {
    const message = {
      name: "test name",
      message: "test message",
    };
    const chatListener = new ChatListener({
      chatEmiter,
      logProvider,
    });
    chatListener.onSendMessage(message);
    const executeSpyOn = jest.spyOn(SendMessageService.prototype, "execute");

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(executeSpyOn).toHaveBeenCalled();
    expect(executeSpyOn).toHaveBeenCalledTimes(1);
    expect(executeSpyOn).toBeCalledWith(message);
  });
});
