import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Card } from "./Card";
import type { GameCard } from "../../model/game.types";

const character = {
  id: 1,
  name: "Rick Sanchez",
  image: "rick.jpg",
  species: "Human",
  status: "Alive",
};

const createCard = (overrides: Partial<GameCard> = {}): GameCard => ({
  uniqueId: "1-1",
  characterId: 1,
  isFlipped: false,
  isMatched: false,
  ...overrides,
});

describe("Card", () => {
  it("renders the front and the back of the card", () => {
    render(<Card index={0} card={createCard()} character={character} />);

    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Voltear carta 1" }),
    ).toBeInTheDocument();
  });

  it("shows the back side when the card is not flipped", () => {
    render(<Card index={0} card={createCard()} character={character} />);

    const card = screen.getByLabelText("card");

    expect(card).toHaveClass("card_div_back_container");
    expect(card).not.toHaveClass("card_div_front_container");
  });

  it("shows the front side when the card is flipped", () => {
    render(
      <Card
        index={0}
        card={createCard({ isFlipped: true })}
        character={character}
      />,
    );

    const card = screen.getByLabelText("card");

    expect(card).toHaveClass("card_div_front_container");
    expect(card).not.toHaveClass("card_div_back_container");
  });

  it("applies the opacity class when the card is matched", () => {
    const { container } = render(
      <Card
        index={0}
        card={createCard({ isFlipped: true, isMatched: true })}
        character={character}
      />,
    );

    expect(container.querySelector(".card_front_container")).toHaveClass(
      "opacity",
    );
  });

  it("calls onClick with the character id and the card uniqueId", () => {
    const onClick = vi.fn();

    render(
      <Card
        index={0}
        card={createCard({ uniqueId: "1-2" })}
        character={character}
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Voltear carta 1" }));

    expect(onClick).toHaveBeenCalledWith(1, "1-2");
  });
});
