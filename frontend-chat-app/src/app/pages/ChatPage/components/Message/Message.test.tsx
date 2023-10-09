import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Message } from "./Message";

describe("Message component tests", () => {
  it("should render Message component successfully", () => {
    render(
      <Message
        messageItem={{
          message: "test message",
          name: "test name",
          sentByUser: true,
        }}
      />
    );

    const message = screen.getByTestId<HTMLElement>("message-component");
    const username = screen.getByText<HTMLElement>("test name");
    const messageText = screen.getByText<HTMLElement>("test message");

    expect(message).toBeTruthy();
    expect(username).toBeTruthy();
    expect(messageText).toBeTruthy();
  });
});
