import { describe, expect, it } from "vitest";
import { gameReducer } from "./game.reducer";
import { gameInitialState } from "./game.initial-state";
import type { Character } from "../../characters/model/character.types";

describe("gameReducer", () => {
  it("adds characters to the state", () => {
    const characters: Character[] = [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Humanoid",
        status: "Alive",
      },
    ];

    const state = gameReducer(gameInitialState, {
      type: "addCharacters",
      payload: characters,
    });

    expect(state.characters).toEqual(characters);
    expect(state.turns).toBe(0);
  });

  it("updates turns", () => {
    const state = gameReducer(gameInitialState, {
      type: "setTurns",
      payload: 3,
    });

    expect(state.turns).toBe(3);
    expect(state.characters).toEqual([]);
  });

  it("returns the same state for an unknown action", () => {
    const state = gameReducer(gameInitialState, {
      type: "unknown",
    } as never);

    expect(state).toBe(gameInitialState);
  });
});
