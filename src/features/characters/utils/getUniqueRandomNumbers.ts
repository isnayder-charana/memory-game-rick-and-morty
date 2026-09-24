import { randomMinMax } from "../../../utils";

export const getUniqueRandomNumbers = (
  count: number,
  min: number,
  max: number,
): number[] => {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    numbers.add(randomMinMax(min, max));
  }

  return [...numbers];
};
