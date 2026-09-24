import clsx from "clsx";
import { Text } from "../../../../components";
import type { Character } from "../../../characters/model/character.types";
import "./Card.scss";

interface Props extends Character {
  opacity: boolean;
}

export const CardFront = ({ image, name, status, species, opacity }: Props) => {
  return (
    <article className={clsx("card_front_container", { opacity: opacity })}>
      <img src={image} alt={name} />
      <Text className="text_bold size_4">{name}</Text>
      <Text className="text_regular size_5">
        {status} - {species}
      </Text>
    </article>
  );
};
