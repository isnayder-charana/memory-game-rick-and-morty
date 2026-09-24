import { env } from "../../../config/env";
import type { CharacterResponse } from "../model/character.types";
import { getUniqueRandomNumbers } from "../utils";

export const getRandomCharacters = async (): Promise<CharacterResponse[]> => {
  const ids = getUniqueRandomNumbers(6, 1, 825);

  const response = await fetch(`${env.apiUrl}/character/${ids}`);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
};
