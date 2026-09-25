import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRandomCharacters } from "./characters.api";

const mockGetUniqueRandomNumbers = vi.fn();

vi.mock("../../../config/env", () => ({
  env: { apiUrl: "https://api.test" },
}));

vi.mock("../utils", () => ({
  getUniqueRandomNumbers: (...args: unknown[]) =>
    mockGetUniqueRandomNumbers(...args),
}));

describe("getRandomCharacters", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", mockFetch);
    mockGetUniqueRandomNumbers.mockReturnValue([1, 2, 3, 4, 5, 6]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests 6 unique ids between 1 and 825", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });

    await getRandomCharacters();

    expect(mockGetUniqueRandomNumbers).toHaveBeenCalledWith(6, 1, 825);
  });

  it("calls the api with the generated ids", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });

    await getRandomCharacters();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.test/character/1,2,3,4,5,6",
    );
  });

  it("returns the characters from the response", async () => {
    const characters = [
      { id: 1, name: "Rick Sanchez" },
      { id: 2, name: "Morty Smith" },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(characters),
    });

    await expect(getRandomCharacters()).resolves.toEqual(characters);
  });

  it("throws an error when the response is not ok", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(getRandomCharacters()).rejects.toThrow("Error HTTP: 500");
  });

  it("propagates network errors", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    await expect(getRandomCharacters()).rejects.toThrow("Network error");
  });
});
