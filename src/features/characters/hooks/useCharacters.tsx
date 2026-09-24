import { useEffect, useState } from "react";
import { getRandomCharacters } from "../api/characters.api";
import { formatCharacterName } from "../utils";
import { useGameContext } from "../../../app/hooks";

export const useCharacters = () => {
  const { addCharacters, characters } = useGameContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const characters = await getRandomCharacters();
        addCharacters(
          characters.map((e) => ({ ...e, name: formatCharacterName(e.name) })),
        );
      } catch {
        setError("No se pudieron cargar los personajes.");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [addCharacters]);

  return {
    characters,
    loading,
    error,
  };
};
