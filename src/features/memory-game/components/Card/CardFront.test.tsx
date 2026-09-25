import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardFront } from "./CardFront";

const character = {
  id: 1,
  name: "Rick Sanchez",
  image: "rick.jpg",
  species: "Human",
  status: "Alive",
};

describe("CardFront", () => {
  it("renders the character image", () => {
    render(<CardFront {...character} opacity={false} />);

    const image = screen.getByAltText("Rick Sanchez");

    expect(image).toHaveAttribute("src", "rick.jpg");
  });

  it("renders the character name", () => {
    render(<CardFront {...character} opacity={false} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders the status and species", () => {
    render(<CardFront {...character} opacity={false} />);

    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
  });

  it("does not apply the opacity class when opacity is false", () => {
    const { container } = render(
      <CardFront {...character} opacity={false} />,
    );

    expect(container.firstChild).toHaveClass("card_front_container");
    expect(container.firstChild).not.toHaveClass("opacity");
  });

  it("applies the opacity class when opacity is true", () => {
    const { container } = render(<CardFront {...character} opacity />);

    expect(container.firstChild).toHaveClass("card_front_container", "opacity");
  });
});
