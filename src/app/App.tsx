import type { ReactNode } from "react";
import { AppRouter } from "./router";
import { GameProvider } from "./context";

const AppState = ({ children }: { children: ReactNode }) => {
  return <GameProvider>{children}</GameProvider>;
};

export const App = () => {
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
};
