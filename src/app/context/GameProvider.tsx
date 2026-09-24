import { useCallback, useReducer, type ReactNode } from "react";
import { GameContext } from "./GameContext";
import { gameReducer } from "../../features/memory-game/model/game.reducer";
import { gameInitialState } from "../../features/memory-game/model/game.initial-state";
import type { Character } from "../../features/characters/model/character.types";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, gameInitialState);

  const addCharacters = useCallback((characters: Character[]) => {
    dispatch({
      type: "addCharacters",
      payload: characters,
    });
  }, []);

  const setTurns = useCallback((payload: number) => {
    dispatch({
      type: "setTurns",
      payload,
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        addCharacters,
        setTurns,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
