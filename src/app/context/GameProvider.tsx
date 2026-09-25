import { useCallback, useReducer, type ReactNode } from "react";
import { GameContext } from "./GameContext";
import { gameReducer } from "../../features/memory-game/model/game.reducer";
import { gameInitialState } from "../../features/memory-game/model/game.initial-state";
import type { Character } from "../../features/characters/model/character.types";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, gameInitialState);

  /*Cada vez que GameProvider se renderiza, su función se ejecuta de nuevo. Sin useCallback, addCharacters y setTurns serían funciones nuevas 
  en cada render. Hacen lo mismo, pero === las considera distintas.
  useCallback(fn, []) hace que React guarde la función del primer render y devuelva siempre esa misma. Como el array de dependencias está 
  vacío, no la vuelve a crear nunca. Esto es seguro porque dispatch de useReducer ya es estable: React garantiza que no cambia.*/
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
