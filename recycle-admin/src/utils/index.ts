export const truncateString = (s: string, size: number = 45) => {
  if (s.length <= size) return s;

  return s.slice(0, size) + "...";
};
