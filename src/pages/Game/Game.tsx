import { useEffect, useMemo } from "react";
import { Text } from "../../components";
import { useNavigate } from "react-router";
import { useGameContext } from "../../app/hooks";
import { createGameCards } from "../../features/memory-game/utils";
import { shuffle } from "../../utils";
import { GameBoard } from "../../features/memory-game/components";
import { useMemoryGame } from "../../features/memory-game/hooks";
import "./Game.scss";

export const Game = () => {
  const navigate = useNavigate();
  const { characters, setTurns } = useGameContext();
  /*
    gameCards: Es una copia de characters(estado global) solo que esta ahora en un estado local
    onFlip: Para que la carta se pueda voltear
    puntuation: Es un objeto que sirve para mostrar los aciertos y turnos
    isCheckingMatch: Sirve para que cuando el usuario escoja 2 cartas, ya no pueda escoger una tercera mientras
    que las 2 se estan comparando.
  */

  const previewCards = useMemo(
    () => shuffle(createGameCards(characters)),
    [characters],
  );

  const { gameCards, onFlip, gameStats, isCheckingMatch } =
    useMemoryGame(previewCards);

  useEffect(() => {
    //En el caso de que el usuario quiera ingresar directamente a "game" esta validación le hara redirigir a la pagina "home"
    if (gameCards.length === 0) navigate("/");
    /*Se hace una comparacion de los aciertos con la cantidad de parejas en total de las cartas, en el caso que sea igual,
    se va añadir los turnos al estado global(turns), y redirigir a la pagina "result"
    */ else if (gameStats.hits === gameCards.length / 2) {
      setTurns(gameStats.turns);
      navigate("/result");
    }
  }, [setTurns, gameCards, navigate, gameStats.hits, gameStats.turns]);

  return (
    <>
      <section className="game_texts_container">
        <Text className="text_bold size_2">Aciertos: {gameStats.hits}</Text>
        <Text className="text_bold size_2">Turnos: {gameStats.turns}</Text>
      </section>
      <section className="game_card_container">
        <GameBoard
          cards={gameCards}
          characters={characters}
          onClick={isCheckingMatch ? undefined : onFlip}
        />
      </section>
    </>
  );
};
