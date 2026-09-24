import clsx from "clsx";
import { Text } from "../Text/Text";
import "./Button.scss";

interface Props {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  reverse?: boolean;
}

export const Button = ({ title, onClick, reverse }: Props) => {
  return (
    <button
      className={clsx("button_container", reverse ? "reverse" : "normal")}
      onClick={onClick}
    >
      <Text className="text_semi_bold size_2 pointer">{title}</Text>
    </button>
  );
};
