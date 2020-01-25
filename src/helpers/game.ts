import { Game } from '../interfaces/Game';
import { generateColor } from '../services/color';

export const STATIC_GAMES: Array<Game> = [
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

export const getStaticGamesWithColors = (): { [name: string]: Game } =>
  STATIC_GAMES.reduce(
    (result: { [name: string]: Game }, element) => ({
      ...result,
      [element.name]: { ...element, color: generateColor() },
    }),
    {},
  );
