import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Result } from "./Result";

const mockNavigate = vi.fn();

const mockUseGameContext = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../app/hooks", () => ({
  useGameContext: () => mockUseGameContext(),
}));

describe("Result", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseGameContext.mockReturnValue({
      turns: 0,
    });
  });

  it("renders the required turn", () => {
    const turns = 10;

    mockUseGameContext.mockReturnValue({
      turns,
    });

    render(<Result />);

    expect(screen.getByText("¡Felicitaciones!")).toBeInTheDocument();
    expect(
      screen.getByText(`Terminaste el juego en ${turns} turnos`),
    ).toBeInTheDocument();
  });

  it("navigates to the game page when clicking Repetir", () => {
    mockUseGameContext.mockReturnValue({
      turns: 5,
    });

    render(<Result />);

    fireEvent.click(screen.getByRole("button", { name: "Repetir" }));

    expect(mockNavigate).toHaveBeenCalledWith("/game");
  });

  it("navigates to the home page when clicking Inicio", () => {
    mockUseGameContext.mockReturnValue({
      turns: 5,
    });
    render(<Result />);

    fireEvent.click(screen.getByRole("button", { name: "Inicio" }));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigates to the home page when accesing the page directly", () => {
    mockUseGameContext.mockReturnValue({ turns: 0 });

    render(<Result />);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("does not navigate to home when the game has turns", () => {
    mockUseGameContext.mockReturnValue({
      turns: 5,
    });

    render(<Result />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
