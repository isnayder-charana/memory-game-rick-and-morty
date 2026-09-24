import { Navigate, Route, Routes } from "react-router";
import { Header } from "../../components";
import { Game, Home, Result } from "../../pages";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
