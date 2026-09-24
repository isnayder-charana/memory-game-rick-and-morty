import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Game } from "./Game";

const mockNavigate = vi.fn();

const mockUseGameContext = vi.fn();

const mockCreateGameCards = vi.fn();

const mockUseMemoryGame = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../app/hooks", () => ({
  useGameContext: () => mockUseGameContext(),
}));

vi.mock("../../features/memory-game/utils", () => ({
  createGameCards: (...args: unknown[]) => mockCreateGameCards(...args),
}));

vi.mock("../../features/memory-game/hooks", () => ({
  useMemoryGame: () => mockUseMemoryGame(),
}));

describe("Game", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseGameContext.mockReturnValue({
      characters: [],
      setTurns: () => {},
    });

    mockCreateGameCards.mockReturnValue([]);

    mockUseMemoryGame.mockReturnValue({
      gameCards: [],
      onFlip: () => {},
      gameStats: {
        hits: 0,
        turns: 0,
      },
      isCheckingMatch: false,
    });
  });

  it("renders the required turn and hit", () => {
    const gameStats = {
      hits: 5,
      turns: 10,
    };

    mockUseMemoryGame.mockReturnValue({
      gameCards: [],
      onFlip: () => {},
      gameStats,
      isCheckingMatch: false,
    });

    render(<Game />);

    expect(screen.getByText(`Aciertos: ${gameStats.hits}`)).toBeInTheDocument();
    expect(screen.getByText(`Turnos: ${gameStats.turns}`)).toBeInTheDocument();
  });

  it("navigates to the result page", () => {
    const gameStats = {
      hits: 1,
      turns: 2,
    };

    mockUseMemoryGame.mockReturnValue({
      gameCards: [
        {
          uniqueId: 1,
          characterId: 1,
          isFlipped: true,
          isMatched: true,
        },
        {
          uniqueId: 2,
          characterId: 1,
          isFlipped: true,
          isMatched: true,
        },
      ],
      onFlip: () => {},
      gameStats,
      isCheckingMatch: false,
    });

    render(<Game />);

    expect(mockNavigate).toHaveBeenCalledWith("/result");
  });
});
