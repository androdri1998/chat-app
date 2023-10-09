import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button component tests", () => {
  it("should render Button component successfully", () => {
    render(<Button label="test label" typeButton="submit" disabled={true} />);

    const button = screen.getByText<HTMLButtonElement>("test label");

    expect(button).toBeTruthy();
    expect(button.type).toBe("submit");
    expect(button.disabled).toBeTruthy();
  });
});
