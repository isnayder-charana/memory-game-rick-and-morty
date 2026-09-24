import type { Character } from "../../characters/model/character.types";
import type { GameCard } from "../model/game.types";

export const createGameCards = (
  characters: Character[],
  isFlipped = false,
): GameCard[] => {
  return characters.flatMap((character) => [
    {
      uniqueId: `${character.id}-1`,
      characterId: character.id,
      isFlipped,
      isMatched: false,
    },
    {
      uniqueId: `${character.id}-2`,
      characterId: character.id,
      isFlipped,
      isMatched: false,
    },
  ]);
};
