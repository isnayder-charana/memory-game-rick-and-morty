import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the title", () => {
    render(<Button title="Jugar" onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "Jugar" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(<Button title="Jugar" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "Jugar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("uses the normal style by default", () => {
    render(<Button title="Jugar" onClick={() => {}} />);

    const button = screen.getByRole("button", { name: "Jugar" });

    expect(button).toHaveClass("button_container", "normal");
    expect(button).not.toHaveClass("reverse");
  });

  it("uses the reverse style when reverse is true", () => {
    render(<Button title="Inicio" onClick={() => {}} reverse />);

    const button = screen.getByRole("button", { name: "Inicio" });

    expect(button).toHaveClass("button_container", "reverse");
    expect(button).not.toHaveClass("normal");
  });
});
