import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCharacters } from "./useCharacters";

const mockGetRandomCharacters = vi.fn();

const mockUseGameContext = vi.fn();

const mockAddCharacters = vi.fn();

vi.mock("../api/characters.api", () => ({
  getRandomCharacters: () => mockGetRandomCharacters(),
}));

vi.mock("../../../app/hooks", () => ({
  useGameContext: () => mockUseGameContext(),
}));

describe("useCharacters", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseGameContext.mockReturnValue({
      characters: [],
      addCharacters: mockAddCharacters,
    });

    mockGetRandomCharacters.mockResolvedValue([]);
  });

  it("starts in the loading state", async () => {
    const { result } = renderHook(() => useCharacters());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("adds the loaded characters to the context with formatted names", async () => {
    mockGetRandomCharacters.mockResolvedValue([
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Human",
        status: "Alive",
      },
      {
        id: 2,
        name: "Mr. Poopybutthole From Earth",
        image: "mr.jpg",
        species: "Unknown",
        status: "Alive",
      },
    ]);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockAddCharacters).toHaveBeenCalledTimes(1);
    expect(mockAddCharacters).toHaveBeenCalledWith([
      expect.objectContaining({ id: 1, name: "Rick Sanchez" }),
      expect.objectContaining({ id: 2, name: "Mr. Poopybutthole" }),
    ]);
    expect(result.current.error).toBeNull();
  });

  it("returns the characters from the context", async () => {
    const characters = [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Human",
        status: "Alive",
      },
    ];

    mockUseGameContext.mockReturnValue({
      characters,
      addCharacters: mockAddCharacters,
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.characters).toBe(characters);
  });

  it("sets an error message when the request fails", async () => {
    mockGetRandomCharacters.mockRejectedValue(new Error("Error HTTP: 500"));

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("No se pudieron cargar los personajes.");
    expect(mockAddCharacters).not.toHaveBeenCalled();
  });
});
