export const getRandomItem = <T>(items: Array<T>): T => items[getRandomIndex(items)];
export const getRandomIndex = <T>(items: Array<T>): number  => Math.floor(Math.random() * items.length);
