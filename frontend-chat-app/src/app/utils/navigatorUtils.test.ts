import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBrowserLocaleSetting } from "./navigatorUtils";

describe("navigatorUtils tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it("should get languange successfully", () => {
    const mockNavigator = {language: "test-language"} as Navigator;
    vi.spyOn(globalThis, 'window', 'get').mockImplementation(() => ({
        navigator: mockNavigator
    } as Window & typeof globalThis));

    const language = getBrowserLocaleSetting();

    expect(language).toBe("test-language");
  });
});
