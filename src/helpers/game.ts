import { Game } from '../interfaces/Game';
import { generateColor } from '../services/color';

export const STATIC_GAMES: Array<Game> = [
  {
    name: 'Holzmarkt',
    url: '/holzmarkt',
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
    name: 'Looping Louie',
    url: '/looping-louie',
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
  {
    name: 'Quiz',
    url: '/quiz',
    alreadyPlayed: false,
  },
  {
    name: 'Tabu',
    url: '/tabu',
    alreadyPlayed: false,
  },
  {
    name: 'Erbsenzählen',
    url: '/erbsenzaehlen',
    alreadyPlayed: false,
  },
  {
    name: 'Kegeln',
    url: '/kegeln',
    alreadyPlayed: false,
  },
  {
    name: 'Turmbau zu Babel',
    url: '/turmbau-zu-babel',
    alreadyPlayed: false,
  },
  {
    name: 'Team-Knoten',
    url: '/team-knoten',
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
