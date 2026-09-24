export const randomMinMax = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Algoritmo de Fisher-Yates
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
