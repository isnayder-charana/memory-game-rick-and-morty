import { useCallback, useEffect, useRef, useState } from "react";
import type { CardMatch, GameCard } from "../model/game.types";

export const useMemoryGame = (characters: GameCard[] = []) => {
  const [gameCards, setGameCards] = useState<GameCard[]>(characters);
  const [gameStats, setGameStats] = useState({
    hits: 0,
    turns: 0,
  });
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  const selectedCardsRef = useRef<CardMatch[]>([]);
  const matchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const matchCards = useCallback(() => {
    setIsCheckingMatch(true);
    matchTimeoutRef.current = setTimeout(() => {
      const [first, second] = selectedCardsRef.current;
      //Se esta comprando el "id" de las cartas escogidas
      if (first.id === second.id) {
        /*
          Si son iguales, entonces:
            - Se aumenta en 1 las propiedades "hits" y "turns"
            - Se cambia la propiedad isMatched en true, para asi las cartas
            puedan desaparecer.
        */
        setGameStats((prev) => ({
          hits: prev.hits + 1,
          turns: prev.turns + 1,
        }));
        setGameCards((prev) =>
          prev.map((e) => {
            if (
              e.uniqueId === first.uniqueId ||
              e.uniqueId === second.uniqueId
            ) {
              return { ...e, isMatched: true };
            }

            return e;
          }),
        );
      } else {
        /*
          Caso contrario:
            - Se aumenta en 1 la propiedad "turns"
            - Se cambia la propiedad isFlipped en false, para asi las cartas
            puedan voltearse boca abajo.
        */
        setGameStats((prev) => ({
          ...prev,
          turns: prev.turns + 1,
        }));

        setGameCards((prev) =>
          prev.map((e) => {
            if (
              e.uniqueId === first.uniqueId ||
              e.uniqueId === second.uniqueId
            ) {
              return { ...e, isFlipped: false };
            }

            return e;
          }),
        );
      }
      //El acumulador debe reiniciarse
      selectedCardsRef.current = [];
      setIsCheckingMatch(false);
    }, 1500);
  }, []);

  /*
    Cada vez que se llama esta función se hace una acumulación al "selectedCardsRef", obteniendo
    el id y uniqueId, también se esta cambiando la propiedad isFlipped en true de la carta escogida, 
    comparando la propiedad "uniqueId"
  */
  const onFlip = (id: number, uniqueId?: string) => {
    const newAcum = [...selectedCardsRef.current, { id, uniqueId }];
    selectedCardsRef.current = newAcum;
    setGameCards((prev) =>
      prev.map((e) =>
        e.uniqueId === uniqueId ? { ...e, isFlipped: true } : e,
      ),
    );

    if (newAcum.length === 2) {
      matchCards();
    }
  };

  useEffect(() => {
    return () => {
      if (matchTimeoutRef.current) {
        clearTimeout(matchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const revealTimeout = setTimeout(() => {
      setGameCards((prev) => prev.map((e) => ({ ...e, isFlipped: true })));
    }, 1000);

    const hideTimeout = setTimeout(() => {
      setGameCards((prev) => prev.map((e) => ({ ...e, isFlipped: false })));
    }, 3000);

    return () => {
      clearTimeout(revealTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return { gameCards, onFlip, gameStats, isCheckingMatch };
};
