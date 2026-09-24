import { useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import "./Result.scss";
import { useGameContext } from "../../app/hooks";
import { Button, Text } from "../../components";

export const Result = () => {
  // El estado global "turns" se proyecta en la interfaz
  const { turns } = useGameContext();
  const navigate = useNavigate();

  const onNavigateBack = () => {
    //Redirige a la pagina "game"
    navigate("/game");
  };

  const onNavigateHome = useCallback(() => {
    //Redirige a la pagina "home"
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    //Esta validación es si el usuario quiere ingresar directamente a la pagina "result"
    if (turns === 0) onNavigateHome();
  }, [onNavigateHome, turns]);

  return (
    <section className="result_container">
      <section className="result_texts_container">
        <Text className="text_bold size_1 color_primary mb_16">
          ¡Felicitaciones!
        </Text>
        <Text className="text_medium size_2">
          Terminaste el juego en {turns} turnos
        </Text>
      </section>

      <section className="result_section_container">
        <Button title="Repetir" onClick={onNavigateBack} />
        <Button title="Inicio" onClick={onNavigateHome} reverse />
      </section>
    </section>
  );
};
