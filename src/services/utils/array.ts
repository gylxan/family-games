export const getRandomIndex = <T>(items: Array<T>): number => Math.floor(Math.random() * items.length);
export const getRandomItem = <T>(items: Array<T>): T => items[getRandomIndex(items)];

export const shuffle = <T>(items: Array<T>): Array<T> => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};
