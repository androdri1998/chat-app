import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TitleChat } from "./TitleChat";

describe("TitleChat component tests", () => {
  it("should render TitleChat component successfully", () => {
    render(<TitleChat title="test title" />);

    const title = screen.getByText<HTMLElement>("test title");

    expect(title).toBeTruthy();
  });
});
