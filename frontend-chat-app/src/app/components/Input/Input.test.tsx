import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input component tests", () => {
  it("should render Input component successfully", () => {
    render(
      <Input
        placeholder="test placeholder"
        onChangeValue={() => {}}
        adjustClassname="test-classname"
        value="test value"
      />
    );

    const input =
      screen.getByPlaceholderText<HTMLInputElement>("test placeholder");

    expect(input).toBeTruthy();
    expect(input.className).toBe("input test-classname");
    expect(input.value).toBe("test value");
  });
});
