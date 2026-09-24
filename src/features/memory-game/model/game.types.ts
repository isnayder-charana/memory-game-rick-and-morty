import type { Character } from "../../characters/model/character.types";

export interface GameCard {
  uniqueId: string;
  characterId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  characters: Character[];
  turns: number;
}

export interface CardMatch {
  id: number;
  uniqueId?: string;
}

export type GameAction =
  | { type: "addCharacters"; payload: Character[] }
  | { type: "setTurns"; payload: number };
