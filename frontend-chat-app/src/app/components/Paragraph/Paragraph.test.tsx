import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Paragraph } from "./Paragraph";

describe("Paragraph component tests", () => {
  it("should render Paragraph component successfully when text prop is given", () => {
    render(<Paragraph text="test text" />);

    expect(screen.getByText("test text")).toBeTruthy();
  });

  it("should render Paragraph component successfully when classname prop is given", () => {
    render(<Paragraph classNames="test-classname" text="test text" />);

    const paragraph = screen.getByText("test text");

    expect(paragraph.className).toBe("test-classname");
  });
});
