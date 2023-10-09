import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTranslate } from "./useTranslate";

const mockTranslatefunction = vi.fn();
vi.mock("react-i18next", function () {
  return {
    useTranslation: () => ({ t: mockTranslatefunction }),
  };
});

describe("useTranslate tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should use t function successfully", () => {
    const { result } = renderHook(useTranslate);

    act(() => result.current.t("test key"));

    expect(mockTranslatefunction).toHaveBeenCalled();
    expect(mockTranslatefunction).toHaveBeenCalledTimes(1);
    expect(mockTranslatefunction).toHaveBeenCalledWith("test key");
  });
});
