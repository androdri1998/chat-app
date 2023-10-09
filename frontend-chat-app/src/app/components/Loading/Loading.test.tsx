import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loading } from "./Loading";

describe("Loading component tests", () => {
  it("should render Loading component successfully", () => {
    render(<Loading />);

    expect(screen.getByText("general.loading")).toBeTruthy();
  });
});
