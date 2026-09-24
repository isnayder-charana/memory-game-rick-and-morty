export const formatCharacterName = (name: string) => {
  const parts = name.split(" ");

  return parts.length > 2 ? parts.slice(0, 2).join(" ") : name;
};
