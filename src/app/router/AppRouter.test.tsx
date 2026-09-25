import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AppRouter } from "./AppRouter";

vi.mock("../../pages", () => ({
  Home: () => <div>Home Page</div>,
  Game: () => <div>Game Page</div>,
  Result: () => <div>Result Page</div>,
}));

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRouter />
    </MemoryRouter>,
  );

describe("AppRouter", () => {
  it("renders the header on every page", () => {
    renderAt("/");

    expect(screen.getByText("Juego de memoria")).toBeInTheDocument();
  });

  it("renders the Home page on /", () => {
    renderAt("/");

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders the Game page on /game", () => {
    renderAt("/game");

    expect(screen.getByText("Game Page")).toBeInTheDocument();
  });

  it("renders the Result page on /result", () => {
    renderAt("/result");

    expect(screen.getByText("Result Page")).toBeInTheDocument();
  });

  it("redirects unknown routes to the Home page", () => {
    renderAt("/unknown-route");

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
