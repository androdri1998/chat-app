import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatPage } from "./ChatPage";

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

describe("ChatPage component tests", () => {
  it("should render ChatPage component successfully", () => {
    render(<ChatPage />);

    const title = screen.getByText<HTMLElement>("Chat");
    const header = screen.getByTestId<HTMLElement>("chat-header");
    const messageList = screen.getByTestId<HTMLElement>("chat-messages");
    const input = screen.getByPlaceholderText<HTMLInputElement>(
      "Type your message..."
    );
    const button = screen.getByText<HTMLButtonElement>("Send");

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
    expect(title).toBeTruthy();
    expect(header).toBeTruthy();
    expect(messageList).toBeTruthy();
  });
});
