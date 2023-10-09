import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header component tests", () => {
  it("should render Header component successfully", () => {
    render(<Header title="test title" />);

    const title = screen.getByText<HTMLElement>("test title");
    const header = screen.getByTestId<HTMLElement>("chat-header");

    expect(title).toBeTruthy();
    expect(header).toBeTruthy();
  });
});
