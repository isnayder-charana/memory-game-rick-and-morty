import { describe, expect, it } from "vitest";
import { getUniqueRandomNumbers } from "./getUniqueRandomNumbers";

describe("getUniqueRandomNumbers", () => {
  it("returns the requested amount of numbers", () => {
    const result = getUniqueRandomNumbers(5, 1, 10);

    expect(result).toHaveLength(5);
  });

  it("returns unique numbers", () => {
    const result = getUniqueRandomNumbers(5, 1, 10);

    expect(new Set(result).size).toBe(result.length);
  });

  it("returns numbers inside the specified range", () => {
    const result = getUniqueRandomNumbers(5, 1, 10);

    result.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(10);
    });
  });
});
