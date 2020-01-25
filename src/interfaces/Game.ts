export interface Game {
  name: string;
  url: string;
}

export const GAMES: Array<Game> = [
  {
    name: 'Game 1',
    url: 'game1',
  },
  {
    name: 'Rätselraten',
    url: 'puzzle',
  },
  {
    name: 'Pantomime',
    url: 'pantomime',
  },
  {
    name: 'Trinken',
    url: 'drink',
  },
  {
    name: 'Musik',
    url: 'music',
  },
  {
    name: 'What?!?!',
    url: 'what',
  },
];

export interface GameState {
  byName: { [name: string]: Game };
}
