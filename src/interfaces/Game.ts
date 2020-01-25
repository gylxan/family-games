export interface Game {
  name: string;
  url: string;
  color?: string;
}

export interface GameState {
  byName: { [name: string]: Game };
}
