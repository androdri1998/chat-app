import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatMessages } from "./ChatMessages";

vi.mock("socket.io-client", function () {
  return {
    io: function () {
      return {
        connect: vi.fn(),
        disconnect: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      };
    },
  };
});

describe("Message component tests", () => {
  it("should render Message component successfully", () => {
    render(
      <ChatMessages
        chatScrollRef={{ current: null }}
        handleMessageList={() => {}}
        messageList={[
          {
            message: "test message",
            name: "test name",
            sentByUser: true,
          },
        ]}
      />
    );

    const messageList = screen.getByTestId<HTMLElement>("chat-messages");
    const username = screen.getByText<HTMLElement>("test name");
    const messageText = screen.getByText<HTMLElement>("test message");

    expect(messageList).toBeTruthy();
    expect(username).toBeTruthy();
    expect(messageText).toBeTruthy();
  });
});
