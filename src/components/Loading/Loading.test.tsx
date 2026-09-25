import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loading } from "./Loading";

describe("Loading", () => {
  it("renders the loading image", () => {
    render(<Loading />);

    expect(screen.getByAltText("loading")).toBeInTheDocument();
  });

  it("renders the loading text", () => {
    render(<Loading />);

    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });

  it("renders the three animated dots", () => {
    const { container } = render(<Loading />);

    expect(container.querySelectorAll(".load")).toHaveLength(3);
  });
});
