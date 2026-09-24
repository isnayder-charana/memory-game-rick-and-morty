import { describe, expect, it } from "vitest";
import { formatCharacterName } from "./formatCharacterName";

describe("formatCharacterName", () => {
  it("returns the name unchanged when it has two words", () => {
    expect(formatCharacterName("Rick Sanchez")).toBe("Rick Sanchez");
  });

  it("returns the name unchanged when it has one word", () => {
    expect(formatCharacterName("Rick")).toBe("Rick");
  });

  it("keeps only the first two words when the name has more than two words", () => {
    expect(formatCharacterName("Rick Sanchez Smith")).toBe("Rick Sanchez");
  });
});
