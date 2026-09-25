import { afterEach, describe, expect, it, vi } from "vitest";
import { getUniqueRandomNumbers } from "./getUniqueRandomNumbers";

describe("getUniqueRandomNumbers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps generating numbers when a duplicate appears", () => {
    // 0 -> 1, 0 -> 1 (duplicado), 0.5 -> 6
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5);

    expect(getUniqueRandomNumbers(2, 1, 10)).toEqual([1, 6]);
  });

  it("returns an empty array when count is 0", () => {
    expect(getUniqueRandomNumbers(0, 1, 10)).toEqual([]);
  });

  it("returns every number of the range when count equals the range size", () => {
    const result = getUniqueRandomNumbers(5, 1, 5);

    expect([...result].sort()).toEqual([1, 2, 3, 4, 5]);
  });

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
