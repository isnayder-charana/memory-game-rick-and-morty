import logo from "../../assets/ricky_morty_logo.svg";
import { Text } from "../Text/Text";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header_container">
      <img src={logo} alt="logo" />
      <Text className="text_bold size_3">Juego de memoria</Text>
    </header>
  );
};
