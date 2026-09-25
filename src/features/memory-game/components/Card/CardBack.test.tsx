import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardBack } from "./CardBack";

describe("CardBack", () => {
  it("renders an accessible button based on the index", () => {
    render(<CardBack id={1} uniqueId="1-1" index={2} />);

    expect(
      screen.getByRole("button", { name: "Voltear carta 3" }),
    ).toBeInTheDocument();
  });

  it("renders the face down image", () => {
    render(<CardBack id={1} uniqueId="1-1" index={0} />);

    expect(screen.getByAltText("card_face_down")).toBeInTheDocument();
  });

  it("calls onClick with the id and uniqueId", () => {
    const onClick = vi.fn();

    render(<CardBack id={7} uniqueId="7-2" index={0} onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "Voltear carta 1" }));

    expect(onClick).toHaveBeenCalledWith(7, "7-2");
  });

  it("does not fail when onClick is not provided", () => {
    render(<CardBack id={7} uniqueId="7-2" index={0} />);

    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: "Voltear carta 1" })),
    ).not.toThrow();
  });
});
