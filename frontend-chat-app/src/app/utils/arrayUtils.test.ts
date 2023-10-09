import { describe, it, expect, vi, beforeEach } from "vitest";
import { addValueToANewArray } from "./arrayUtils";

describe("arrayUtils tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it("should values to array successfully", () => {
    const originalArray = [1];

    const newArray = addValueToANewArray(originalArray, 2);

    expect(newArray).toEqual([1,2]);
  });
});
