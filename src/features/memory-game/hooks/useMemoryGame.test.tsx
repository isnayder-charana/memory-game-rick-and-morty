import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMemoryGame } from "./useMemoryGame";
import type { GameCard } from "../model/game.types";

const createCards = (): GameCard[] => [
  { uniqueId: "1-1", characterId: 1, isFlipped: false, isMatched: false },
  { uniqueId: "1-2", characterId: 1, isFlipped: false, isMatched: false },
  { uniqueId: "2-1", characterId: 2, isFlipped: false, isMatched: false },
  { uniqueId: "2-2", characterId: 2, isFlipped: false, isMatched: false },
];

const getCard = (cards: GameCard[], uniqueId: string) =>
  cards.find((card) => card.uniqueId === uniqueId)!;

describe("useMemoryGame", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Termina la vista previa inicial (se muestran a 1s y se ocultan a 3s)
  const finishPreview = () => {
    act(() => {
      vi.advanceTimersByTime(3000);
    });
  };

  it("returns the initial state", () => {
    const cards = createCards();

    const { result } = renderHook(() => useMemoryGame(cards));

    expect(result.current.gameCards).toEqual(cards);
    expect(result.current.gameStats).toEqual({ hits: 0, turns: 0 });
    expect(result.current.isCheckingMatch).toBe(false);
  });

  it("uses an empty array when no cards are passed", () => {
    const { result } = renderHook(() => useMemoryGame());

    expect(result.current.gameCards).toEqual([]);
  });

  it("reveals every card after one second", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.gameCards.every((card) => card.isFlipped)).toBe(true);
  });

  it("hides every card after three seconds", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    expect(result.current.gameCards.every((card) => !card.isFlipped)).toBe(
      true,
    );
  });

  it("flips only the selected card", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });

    expect(getCard(result.current.gameCards, "1-1").isFlipped).toBe(true);
    expect(getCard(result.current.gameCards, "1-2").isFlipped).toBe(false);
    expect(getCard(result.current.gameCards, "2-1").isFlipped).toBe(false);
    expect(getCard(result.current.gameCards, "2-2").isFlipped).toBe(false);
    expect(result.current.isCheckingMatch).toBe(false);
  });

  it("starts checking the match when two cards are selected", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(2, "2-1");
    });

    expect(result.current.isCheckingMatch).toBe(true);
    expect(result.current.gameStats).toEqual({ hits: 0, turns: 0 });
  });

  it("marks both cards as matched when they have the same id", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(1, "1-2");
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(getCard(result.current.gameCards, "1-1").isMatched).toBe(true);
    expect(getCard(result.current.gameCards, "1-2").isMatched).toBe(true);
    expect(getCard(result.current.gameCards, "2-1").isMatched).toBe(false);
    expect(getCard(result.current.gameCards, "2-2").isMatched).toBe(false);
    expect(result.current.gameStats).toEqual({ hits: 1, turns: 1 });
    expect(result.current.isCheckingMatch).toBe(false);
  });

  it("flips both cards back when they have different ids", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(2, "2-1");
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(getCard(result.current.gameCards, "1-1").isFlipped).toBe(false);
    expect(getCard(result.current.gameCards, "2-1").isFlipped).toBe(false);
    expect(result.current.gameCards.every((card) => !card.isMatched)).toBe(
      true,
    );
    expect(result.current.gameStats).toEqual({ hits: 0, turns: 1 });
    expect(result.current.isCheckingMatch).toBe(false);
  });

  it("does not resolve the match before 1.5 seconds", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(1, "1-2");
    });
    act(() => {
      vi.advanceTimersByTime(1499);
    });

    expect(result.current.isCheckingMatch).toBe(true);
    expect(result.current.gameStats).toEqual({ hits: 0, turns: 0 });
  });

  it("resets the selection after each turn", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(2, "2-1");
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    act(() => {
      result.current.onFlip(2, "2-1");
    });
    act(() => {
      result.current.onFlip(2, "2-2");
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(getCard(result.current.gameCards, "1-1").isMatched).toBe(false);
    expect(getCard(result.current.gameCards, "1-2").isMatched).toBe(false);
    expect(getCard(result.current.gameCards, "2-1").isMatched).toBe(true);
    expect(getCard(result.current.gameCards, "2-2").isMatched).toBe(true);
    expect(result.current.gameStats).toEqual({ hits: 1, turns: 2 });
  });

  it("completes the game when every pair is matched", () => {
    const { result } = renderHook(() => useMemoryGame(createCards()));

    finishPreview();

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(1, "1-2");
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    act(() => {
      result.current.onFlip(2, "2-1");
    });
    act(() => {
      result.current.onFlip(2, "2-2");
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.gameCards.every((card) => card.isMatched)).toBe(true);
    expect(result.current.gameStats).toEqual({ hits: 2, turns: 2 });
  });

  it("clears pending timers on unmount", () => {
    const { result, unmount } = renderHook(() => useMemoryGame(createCards()));

    act(() => {
      result.current.onFlip(1, "1-1");
    });
    act(() => {
      result.current.onFlip(1, "1-2");
    });

    expect(vi.getTimerCount()).toBeGreaterThan(0);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
