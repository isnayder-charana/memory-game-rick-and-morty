import { describe, expect, it } from "vitest";
import { createGameCards } from "./createGameCards";
import type { Character } from "../../characters/model/character.types";

describe("createGameCards", () => {
  const characters: Character[] = [
    {
      id: 1,
      name: "Rick Sanchez",
      image: "rick.jpg",
      species: "Humanoid",
      status: "Alive",
    },
    {
      id: 2,
      name: "Morty Smith",
      image: "morty.jpg",
      species: "Alien",
      status: "Dead",
    },
  ];

  it("creates two cards for each character", () => {
    const cards = createGameCards(characters);

    expect(cards).toHaveLength(4);
  });

  it("creates two cards with the same character id", () => {
    const cards = createGameCards(characters);

    expect(cards[0].characterId).toBe(1);
    expect(cards[1].characterId).toBe(1);
    expect(cards[2].characterId).toBe(2);
    expect(cards[3].characterId).toBe(2);
  });

  it("creates unique card ids", () => {
    const cards = createGameCards(characters);

    const ids = cards.map((card) => card.uniqueId);

    expect(new Set(ids).size).toBe(cards.length);
  });

  it("creates cards flipped when isFlipped is true", () => {
    const cards = createGameCards(characters, true);

    expect(cards.every((card) => card.isFlipped)).toBe(true);
  });

  it("creates cards unmatched by default", () => {
    const cards = createGameCards(characters);

    expect(cards.every((card) => !card.isMatched)).toBe(true);
  });
});
