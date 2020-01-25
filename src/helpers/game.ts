import { Game } from '../interfaces/Game';
import { generateColor } from '../services/color';

export const STATIC_GAMES: Array<Game> = [
  {
    name: 'Game 1',
    url: '/game1',
    alreadyPlayed: false,
  },
  {
    name: 'Rätselraten',
    url: '/puzzle',
    alreadyPlayed: false,
  },
  {
    name: 'Pantomime',
    url: '/pantomime',
    alreadyPlayed: false,
  },
  {
    name: 'Trinken',
    url: '/drink',
    alreadyPlayed: false,
  },
  {
    name: 'Musik',
    url: '/music',
    alreadyPlayed: false,
  },
  {
    name: 'What?!?!',
    url: '/what',
    alreadyPlayed: false,
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
