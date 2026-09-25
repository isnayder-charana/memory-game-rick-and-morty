import { fireEvent, render, screen } from "@testing-library/react";
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
  useMemoryGame: (...args: unknown[]) => mockUseMemoryGame(...args),
}));

const characters = [
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

const gameCards = [
  { uniqueId: "1-1", characterId: 1, isFlipped: false, isMatched: false },
  { uniqueId: "1-2", characterId: 1, isFlipped: false, isMatched: false },
  { uniqueId: "2-1", characterId: 2, isFlipped: false, isMatched: false },
  { uniqueId: "2-2", characterId: 2, isFlipped: false, isMatched: false },
];

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

  it("saves the turns in the context when the game ends", () => {
    const mockSetTurns = vi.fn();

    mockUseGameContext.mockReturnValue({
      characters,
      setTurns: mockSetTurns,
    });

    mockUseMemoryGame.mockReturnValue({
      gameCards,
      onFlip: () => {},
      gameStats: { hits: 2, turns: 6 },
      isCheckingMatch: false,
    });

    render(<Game />);

    expect(mockSetTurns).toHaveBeenCalledWith(6);
    expect(mockNavigate).toHaveBeenCalledWith("/result");
  });

  it("redirects to home when there are no cards", () => {
    render(<Game />);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("does not navigate while the game is in progress", () => {
    const mockSetTurns = vi.fn();

    mockUseGameContext.mockReturnValue({
      characters,
      setTurns: mockSetTurns,
    });

    mockUseMemoryGame.mockReturnValue({
      gameCards,
      onFlip: () => {},
      gameStats: { hits: 1, turns: 3 },
      isCheckingMatch: false,
    });

    render(<Game />);

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetTurns).not.toHaveBeenCalled();
  });

  /*Comprueba que el componente Game toma los personajes del contexto, los convierte en cartas y se las pasa a useMemoryGame.*/
  it("creates the cards from the context characters", () => {
    /*Preparación del contexto. Hace que useGameContext() devuelva los 2 personajes de prueba (Rick y Morty) en lugar del array 
    vacío que pone el beforeEach.*/
    mockUseGameContext.mockReturnValue({
      characters,
      setTurns: () => {},
    });

    /*Control de la salida de createGameCards. La función real no se ejecuta. El mock devuelve directamente las 4 cartas predefinidas 
    (1-1, 1-2, 2-1, 2-2). Así el test no depende de cómo funciona createGameCards por dentro, porque eso se prueba en su propio archivo 
    de test.*/
    mockCreateGameCards.mockReturnValue(gameCards);

    /*Monta el componente, lo que ejecuta el useMemo y la llamada a useMemoryGame.*/
    render(<Game />);

    /*Primera comprobación: Game llamó a createGameCards con los personajes del contexto, y no con otro array ni sin argumentos.*/
    expect(mockCreateGameCards).toHaveBeenCalledWith(characters);

    /*Captura del argumento. mock.calls guarda cada llamada al mock con sus argumentos. calls[0] es la primera llamada y 
    [cardsPassed] extrae su primer argumento, es decir, el previewCards que recibió useMemoryGame.*/
    const [cardsPassed] = mockUseMemoryGame.mock.calls[0];

    /*Segunda comprobación: useMemoryGame recibió las mismas 4 cartas que devolvió createGameCards.*/
    expect(cardsPassed).toHaveLength(gameCards.length);

    /*shuffle no está mockeado, así que la función real baraja las cartas y el orden cambia en cada ejecución. 
    Un toEqual(gameCards) fallaría de forma aleatoria. Por eso el test combina dos comprobaciones:
    - arrayContaining(gameCards): todas las cartas originales están presentes, en cualquier orden.
    - toHaveLength(4): no hay cartas de más.*/
    expect(cardsPassed).toEqual(expect.arrayContaining(gameCards));
  });

  it("renders the game board with the cards", () => {
    mockUseGameContext.mockReturnValue({
      characters,
      setTurns: () => {},
    });

    mockUseMemoryGame.mockReturnValue({
      gameCards,
      onFlip: () => {},
      gameStats: { hits: 0, turns: 0 },
      isCheckingMatch: false,
    });

    render(<Game />);

    expect(
      screen.getAllByRole("button", { name: /Voltear carta/ }),
    ).toHaveLength(4);
  });

  it("flips a card when clicking it", () => {
    const mockOnFlip = vi.fn();

    mockUseGameContext.mockReturnValue({
      characters,
      setTurns: () => {},
    });

    mockUseMemoryGame.mockReturnValue({
      gameCards,
      onFlip: mockOnFlip,
      gameStats: { hits: 0, turns: 0 },
      isCheckingMatch: false,
    });

    render(<Game />);

    fireEvent.click(screen.getByRole("button", { name: "Voltear carta 1" }));

    expect(mockOnFlip).toHaveBeenCalledWith(1, "1-1");
  });

  it("does not flip cards while checking a match", () => {
    const mockOnFlip = vi.fn();

    mockUseGameContext.mockReturnValue({
      characters,
      setTurns: () => {},
    });

    mockUseMemoryGame.mockReturnValue({
      gameCards,
      onFlip: mockOnFlip,
      gameStats: { hits: 0, turns: 0 },
      isCheckingMatch: true,
    });

    render(<Game />);

    fireEvent.click(screen.getByRole("button", { name: "Voltear carta 1" }));

    expect(mockOnFlip).not.toHaveBeenCalled();
  });
});
