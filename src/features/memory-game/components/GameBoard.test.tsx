import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GameBoard } from "./GameBoard";
import type { GameCard } from "../model/game.types";
import type { Character } from "../../characters/model/character.types";

const characters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    image: "rick.jpg",
    species: "Human",
    status: "Alive",
  },
  {
    id: 2,
    name: "Morty Smith",
    image: "morty.jpg",
    species: "Human",
    status: "Alive",
  },
];

const cards: GameCard[] = [
  { uniqueId: "1-1", characterId: 1, isFlipped: false, isMatched: false },
  { uniqueId: "2-1", characterId: 2, isFlipped: false, isMatched: false },
  { uniqueId: "1-2", characterId: 1, isFlipped: false, isMatched: false },
  { uniqueId: "2-2", characterId: 2, isFlipped: false, isMatched: false },
];

describe("GameBoard", () => {
  it("renders one card for each game card", () => {
    render(<GameBoard cards={cards} characters={characters} />);

    expect(screen.getAllByLabelText("card")).toHaveLength(4);
    expect(screen.getAllByAltText("Rick Sanchez")).toHaveLength(2);
    expect(screen.getAllByAltText("Morty Smith")).toHaveLength(2);
  });

  it("renders nothing when there are no cards", () => {
    render(<GameBoard cards={[]} characters={characters} />);

    expect(screen.queryAllByLabelText("card")).toHaveLength(0);
  });

  it("skips cards whose character does not exist", () => {
    const cardsWithUnknown: GameCard[] = [
      ...cards,
      { uniqueId: "99-1", characterId: 99, isFlipped: false, isMatched: false },
    ];

    render(<GameBoard cards={cardsWithUnknown} characters={characters} />);

    expect(screen.getAllByLabelText("card")).toHaveLength(4);
  });

  it("passes onClick to each card", () => {
    const onClick = vi.fn();

    render(
      <GameBoard cards={cards} characters={characters} onClick={onClick} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Voltear carta 2" }));

    expect(onClick).toHaveBeenCalledWith(2, "2-1");
  });
});
