import { useMemo } from "react";
import type { Character } from "../../characters/model/character.types";
import type { GameCard } from "../model/game.types";
import { Card } from "./";

interface Props {
  cards: GameCard[];
  characters: Character[];
  onClick?: (id: number, uniqueId?: string) => void;
}

export const GameBoard = ({ cards, characters, onClick }: Props) => {
  const charactersById = useMemo(
    () => new Map(characters.map((character) => [character.id, character])),
    [characters],
  );
  return (
    <>
      {cards.map((card, index) => {
        const character = charactersById.get(card.characterId);

        if (!character) {
          return null;
        }

        return (
          <Card
            key={card.uniqueId}
            index={index}
            onClick={onClick}
            character={character}
            card={card}
          />
        );
      })}
    </>
  );
};
