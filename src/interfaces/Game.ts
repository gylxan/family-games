export interface Game {
  name: string;
  url: string;
  color?: string;
  alreadyPlayed: boolean;
}

export interface GameState {
  byName: { [name: string]: Game };
}
