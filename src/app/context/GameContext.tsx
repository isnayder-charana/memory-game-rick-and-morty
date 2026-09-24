import { createContext } from "react";
import type { Character } from "../../features/characters/model/character.types";

export type GameContextProps = {
  characters: Character[];
  turns: number;
  addCharacters: (characters: Character[]) => void;
  setTurns: (turns: number) => void;
};

export const GameContext = createContext<GameContextProps | null>(null);
