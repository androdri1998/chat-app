import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SendMessageForm } from "./SendMessageForm";

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

describe("SendMessageForm component tests", () => {
  it("should render SendMessageForm component successfully", () => {
    render(<SendMessageForm handleMessageList={() => {}} messageList={[]} />);

    const input = screen.getByPlaceholderText<HTMLInputElement>(
      "Type your message..."
    );
    const button = screen.getByText<HTMLButtonElement>("Send");

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
