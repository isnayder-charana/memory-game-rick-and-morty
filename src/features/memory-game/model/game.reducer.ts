import type { GameAction, GameState } from "./game.types";

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case "addCharacters":
      return { ...state, characters: action.payload };
    case "setTurns":
      return { ...state, turns: action.payload };
    default:
      return state;
  }
};
