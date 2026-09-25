import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders the children", () => {
    render(<Text className="text_bold">Hola</Text>);

    expect(screen.getByText("Hola")).toBeInTheDocument();
  });

  it("applies the className to a span", () => {
    render(<Text className="text_bold size_2">Hola</Text>);

    const element = screen.getByText("Hola");

    expect(element.tagName).toBe("SPAN");
    expect(element).toHaveClass("text_bold", "size_2");
  });
});
