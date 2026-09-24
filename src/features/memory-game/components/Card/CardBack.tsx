import img from "../../../../assets/ricky_morty_img.svg";
import "./Card.scss";

interface Props {
  id: number;
  uniqueId?: string;
  onClick?: (id: number, uniqueId?: string) => void;
  index: number;
}

export const CardBack = ({ onClick, uniqueId, id, index }: Props) => {
  return (
    <button
      type="button"
      aria-label={`Voltear carta ${index + 1}`}
      className="card_back_container"
      onClick={() => onClick?.(id, uniqueId)}
    >
      <img src={img} alt={"card_face_down"} />
    </button>
  );
};
