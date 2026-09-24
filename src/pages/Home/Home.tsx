import clsx from "clsx";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./Home.scss";
import { useCharacters } from "../../features/characters/hooks/useCharacters";
import { createGameCards } from "../../features/memory-game/utils";
import { Button, Loading, Text } from "../../components";
import { GameBoard } from "../../features/memory-game/components";

export const Home = () => {
  const [isPreviewFlipped, setIsPreviewFlipped] = useState(false);
  /*
    loading: es un booleano para que en la interfaz pueda aparecer el componente Loading
    characters: es la data consumida por la api, se pueda recorrer y mostrar en la interfaz
  */
  const { characters, loading, error } = useCharacters();
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("/game");
  };

  const previewCards = useMemo(
    () => createGameCards(characters, isPreviewFlipped),
    [characters, isPreviewFlipped],
  );

  useEffect(() => {
    if (loading || characters.length === 0) return;
    const timeout = setTimeout(() => {
      setIsPreviewFlipped(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loading, characters.length]);

  if (error) {
    return (
      <>
        <section className="home_text_container">
          <Text className="text_bold size_2">{error}</Text>
        </section>
        <section className="home_button_container">
          <Button title="Reintentar" onClick={() => navigate(0)} />
        </section>
      </>
    );
  }

  return (
    <>
      <section className="home_text_container">
        <Text className="text_bold size_2">Personajes</Text>
      </section>
      <section
        role={"article"}
        className={clsx(
          { home_loading_container: loading },
          { home_characters_container: !loading },
        )}
        aria-label="section_container"
      >
        {loading ? (
          <Loading />
        ) : (
          previewCards && (
            <GameBoard cards={previewCards} characters={characters} />
          )
        )}
      </section>
      <section className="home_button_container">
        <Button title="Jugar" onClick={onNavigate} />
      </section>
    </>
  );
};
