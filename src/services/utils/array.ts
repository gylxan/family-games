export const getRandomIndex = <T>(items: Array<T>): number => Math.floor(Math.random() * items.length);
export const getRandomItem = <T>(items: Array<T>): T => items[getRandomIndex(items)];
