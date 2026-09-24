import img from "../../assets/ricky_morty_img.svg";
import { Text } from "../Text/Text";
import "./Loading.scss";

export const Loading = () => {
  return (
    <section className="loading_container">
      <img src={img} alt={"loading"} />
      <div className="loading_div_container">
        <Text className="text_bold size_2 color_primary">Cargando</Text>
        <div className="load" />
        <div className="load" />
        <div className="load" />
      </div>
    </section>
  );
};
