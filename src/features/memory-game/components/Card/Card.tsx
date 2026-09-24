import clsx from "clsx";
import type { GameCard } from "../../model/game.types";
import type { Character } from "../../../characters/model/character.types";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import "./Card.scss";

interface Props {
  onClick?: (id: number, uniqueId?: string) => void;
  index: number;
  card: GameCard;
  character: Character;
}

export const Card = ({ onClick, index, card, character }: Props) => {
  const { id, image, name, status, species } = character;
  const { isFlipped, isMatched, uniqueId } = card;

  return (
    <article className="card_container">
      <div
        aria-label="card"
        className={clsx(
          { card_div_front_container: isFlipped },
          { card_div_back_container: !isFlipped },
        )}
      >
        <CardFront
          id={id}
          image={image}
          name={name}
          status={status}
          species={species}
          opacity={isMatched}
        />
        <CardBack uniqueId={uniqueId} id={id} onClick={onClick} index={index} />
      </div>
    </article>
  );
};
