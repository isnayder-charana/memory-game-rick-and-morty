import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GameProvider } from "./GameProvider";
import { useGameContext } from "../hooks";
import type { Character } from "../../features/characters/model/character.types";

const wrapper = ({ children }: { children: ReactNode }) => (
  <GameProvider>{children}</GameProvider>
);

describe("GameProvider + useGameContext", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /*El contexto se crea con valor por defecto null. Si un componente llama a useGameContext() y no tiene un <GameProvider> por encima en el 
  árbol, useContext devuelve ese null y el hook lanza un error. Así el fallo aparece enseguida y con un mensaje claro. 
  Sin esta comprobación, el error saldría más tarde y sería más confuso, algo como Cannot read properties of null (reading 'turns').*/
  it("throws an error when used outside GameProvider", () => {
    /*Cuando un componente lanza un error durante el render, React lo escribe en console.error con un mensaje largo y la traza del componente. 
    Esta línea silencia esa salida para que no ensucie el resultado de los tests. No cambia lo que se comprueba, solo quita ruido. 
    Después del test, el vi.restoreAllMocks() del afterEach devuelve console.error a su comportamiento normal.*/
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useGameContext())).toThrow(
      "useGameContext must be used within GameProvider",
    );

    /*Si alguien quita o cambia la comprobación if (!context) del hook, este test falla. 
    De esa forma, usar el hook fuera del provider siempre produce un error claro y fácil de entender.*/
  });

  it("provides the initial state", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.characters).toEqual([]);
    expect(result.current.turns).toBe(0);
  });

  it("adds characters to the state", () => {
    const characters: Character[] = [
      {
        id: 1,
        name: "Rick Sanchez",
        image: "rick.jpg",
        species: "Human",
        status: "Alive",
      },
    ];

    const { result } = renderHook(() => useGameContext(), { wrapper });

    act(() => {
      result.current.addCharacters(characters);
    });

    expect(result.current.characters).toEqual(characters);
    expect(result.current.turns).toBe(0);
  });

  it("updates the turns", () => {
    const { result } = renderHook(() => useGameContext(), { wrapper });

    act(() => {
      result.current.setTurns(7);
    });

    expect(result.current.turns).toBe(7);
  });

  /*Este test comprueba que las funciones addCharacters y setTurns que da el contexto siguen siendo la misma función 
  (la misma referencia en memoria) aunque el estado cambie y el componente se vuelva a renderizar */
  it("keeps the same action references between renders", () => {
    /*Renderiza el hook dentro de GameProvider. Además de result, se obtiene rerender, que sirve para forzar un nuevo render.*/
    const { result, rerender } = renderHook(() => useGameContext(), {
      wrapper,
    });

    /*Guarda las referencias del primer render. result.current siempre apunta al valor más reciente, así que se copian aquí para compararlas después.*/
    const { addCharacters, setTurns } = result.current;

    /*Cambia el estado del reducer. Esto hace que GameProvider se vuelva a renderizar de verdad, que es el caso importante: sin useCallback, 
    en ese render se crearían funciones nuevas. act hace que React termine de aplicar la actualización antes de seguir.*/
    act(() => {
      result.current.setTurns(3);
    });

    /*Fuerza otro render más. Así se comprueba que las funciones siguen estables también en un render que no viene de un cambio de estado.*/
    rerender();
    /*toBe compara con Object.is, es decir, por referencia. Aquí eso es lo que interesa: no basta con que "hagan lo mismo", 
    tienen que ser exactamente el mismo objeto. toEqual no serviría, porque no distingue entre dos funciones diferentes.*/
    expect(result.current.addCharacters).toBe(addCharacters);
    expect(result.current.setTurns).toBe(setTurns);

    /*Si alguien quita el useCallback, o le añade una dependencia que cambia en cada render (por ejemplo state), 
    las referencias cambiarán y este test fallará. Así se detecta el error antes de que aparezca en la app como efectos que se repiten 
    o peticiones duplicadas.*/
  });
});
