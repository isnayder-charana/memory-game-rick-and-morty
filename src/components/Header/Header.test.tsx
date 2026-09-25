import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Header />);

    expect(screen.getByText("Juego de memoria")).toBeInTheDocument();
  });

  /*Este test comprueba que el componente Header renderiza una etiqueta <header> real.
  Un detalle: <header> solo tiene el rol banner cuando no está dentro de <article>, <aside>, <main>, <nav> o <section>. Dentro de una de 
  esas etiquetas pasa a ser una cabecera de esa sección y deja de ser un landmark.*/
  it("renders a header landmark", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
