export const STORAGE_KEY_TEAMS = 'teams';
export const STORAGE_KEY_GAMES = 'games';

export default class CacheManager<DataType> {
  storageKey: string | null = null;
  constructor(key: string) {
    this.storageKey = key;
  }

  load(): DataType | null {
    const localStorageData = localStorage.getItem(this.storageKey as string);
    return localStorageData === null ? null : JSON.parse(localStorageData);
  }

  save(data: DataType): void {
    localStorage.setItem(this.storageKey as string, JSON.stringify(data));
  }

  delete(): void {
    localStorage.removeItem(this.storageKey as string);
  }
}
