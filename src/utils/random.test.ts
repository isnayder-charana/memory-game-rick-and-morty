import { afterEach, describe, expect, it, vi } from "vitest";
import { randomMinMax, shuffle } from "./random";

describe("randomMinMax", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the minimum value when Math.random returns 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(randomMinMax(1, 10)).toBe(1);
  });

  it("returns the maximum value when Math.random is close to 1", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9999);

    expect(randomMinMax(1, 10)).toBe(10);
  });

  it("returns the same value when min and max are equal", () => {
    expect(randomMinMax(5, 5)).toBe(5);
  });

  it("always returns integers inside the range", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomMinMax(1, 825);

      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(825);
    }
  });
});

describe("shuffle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an array with the same elements", () => {
    const array = [1, 2, 3, 4, 5];

    const result = shuffle(array);

    expect(result).toHaveLength(array.length);
    expect([...result].sort()).toEqual([...array].sort());
  });

  it("does not mutate the original array", () => {
    const array = [1, 2, 3, 4, 5];

    const result = shuffle(array);

    expect(array).toEqual([1, 2, 3, 4, 5]);
    /*not.toBe confirma que result es un objeto distinto de array. Así se descarta una implementación que 
    devolviera el mismo array que recibió.*/
    expect(result).not.toBe(array);
  });

  it("swaps the elements following the Fisher-Yates algorithm", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    // i=2, j=0 -> [3, 2, 1]; i=1, j=0 -> [2, 3, 1]
    expect(shuffle([1, 2, 3])).toEqual([2, 3, 1]);
  });

  it("returns an empty array when the input is empty", () => {
    expect(shuffle([])).toEqual([]);
  });
});
