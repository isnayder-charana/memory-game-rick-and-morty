import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Home } from "./Home";

const mockNavigate = vi.fn();

const mockUseCharacters = vi.fn();

const mockCreateGameCards = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../features/characters/hooks/useCharacters", () => ({
  useCharacters: () => mockUseCharacters(),
}));

vi.mock("../../features/memory-game/utils", () => ({
  createGameCards: (...args: unknown[]) => mockCreateGameCards(...args),
}));

vi.mock("../../features/memory-game/components", () => ({
  GameBoard: () => <div data-testid="game-board">Game Board</div>,
}));

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: null,
    });

    mockCreateGameCards.mockReturnValue([]);
  });

  it("renders the loading state", () => {
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: true,
      error: null,
    });

    render(<Home />);

    expect(screen.getByText("Personajes")).toBeInTheDocument();
    expect(screen.getByAltText("loading")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Jugar" })).toBeInTheDocument();
  });

  it("renders the game board when characters are loaded", () => {
    const characters = [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Humanoid",
        status: "Alive",
      },
    ];

    mockUseCharacters.mockReturnValue({
      characters,
      loading: false,
      error: null,
    });

    mockCreateGameCards.mockReturnValue([
      {
        uniqueId: "1",
        characterId: 1,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    render(<Home />);

    expect(screen.getByTestId("game-board")).toBeInTheDocument();

    expect(mockCreateGameCards).toHaveBeenCalledWith(characters, false);
  });

  it("flips the preview cards after one second", () => {
    vi.useFakeTimers();

    const characters = [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Humanoid",
        status: "Alive",
      },
    ];

    mockUseCharacters.mockReturnValue({
      characters,
      loading: false,
      error: null,
    });

    mockCreateGameCards.mockReturnValue([
      {
        uniqueId: "1",
        characterId: 1,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    render(<Home />);

    expect(mockCreateGameCards).toHaveBeenLastCalledWith(characters, false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockCreateGameCards).toHaveBeenLastCalledWith(characters, true);

    vi.useRealTimers();
  });

  it("does not start the preview timer while loading", () => {
    vi.useFakeTimers();

    const characters = [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Humanoid",
        status: "Alive",
      },
    ];

    mockUseCharacters.mockReturnValue({
      characters,
      loading: true,
      error: null,
    });

    render(<Home />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockCreateGameCards).toHaveBeenCalledWith(characters, false);

    vi.useRealTimers();
  });

  it("does not start the preview timer when there are no characters", () => {
    vi.useFakeTimers();

    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: null,
    });

    render(<Home />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockCreateGameCards).toHaveBeenCalledWith([], false);

    vi.useRealTimers();
  });

  it("navigates to the game page when clicking Jugar", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Jugar" }));

    expect(mockNavigate).toHaveBeenCalledWith("/game");
  });

  it("renders the error message and retry button", () => {
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: "No se pudieron cargar los personajes.",
    });

    render(<Home />);

    expect(
      screen.getByText("No se pudieron cargar los personajes."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Reintentar" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Jugar" }),
    ).not.toBeInTheDocument();
  });

  it("reloads the page when clicking Reintentar", () => {
    mockUseCharacters.mockReturnValue({
      characters: [],
      loading: false,
      error: "No se pudieron cargar los personajes.",
    });

    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(mockNavigate).toHaveBeenCalledWith(0);
  });
});
