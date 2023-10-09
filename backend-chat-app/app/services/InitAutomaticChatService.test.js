const InitAutomaticChatService = require("./InitAutomaticChatService");

const automaticChatRepository = {
  setName: jest.fn(),
};
const messagesRepository = {
  setMessage: jest.fn(),
};
const logProvider = {
  error: jest.fn(),
};

describe("InitAutomaticChatService tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should execute service successfully", () => {
    const initAutomaticChatService = new InitAutomaticChatService({
      messagesRepository,
      automaticChatRepository,
      logProvider,
    });

    initAutomaticChatService.execute();

    expect(logProvider.error).not.toHaveBeenCalled();
    expect(messagesRepository.setMessage).toHaveBeenCalled();
    expect(messagesRepository.setMessage).toHaveBeenCalledTimes(5);
    expect(automaticChatRepository.setName).toHaveBeenCalled();
    expect(automaticChatRepository.setName).toHaveBeenCalledTimes(1);
  });

  it("Should execute service fail", () => {
    const mockError = new Error("Test error");
    automaticChatRepository.setName.mockImplementation(
      jest.fn(() => {
        throw mockError;
      })
    );
    const initAutomaticChatService = new InitAutomaticChatService({
      messagesRepository,
      automaticChatRepository,
      logProvider,
    });

    initAutomaticChatService.execute();

    expect(logProvider.error).toHaveBeenCalled();
    expect(logProvider.error).toHaveBeenCalledTimes(1);
    expect(logProvider.error).toHaveBeenCalledWith(
      mockError.message,
      expect.stringContaining(mockError.message)
    );
    expect(automaticChatRepository.setName).toHaveBeenCalled();
    expect(automaticChatRepository.setName).toHaveBeenCalledTimes(1);
    expect(messagesRepository.setMessage).not.toHaveBeenCalled();
  });
});
