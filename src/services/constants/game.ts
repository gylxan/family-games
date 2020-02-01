import { Game } from '../../interfaces/Game';
import MusicGame from '../../pages/games/MusicGame/player/MusicGame';
import JustOneGame from '../../pages/games/JustOneGame/player/';
import Pantomime from '../../pages/games/Pantomime/player/';

export const STATIC_GAMES: Array<Game> = [
  {
    name: 'Holzmarkt',
    url: '/holzmarkt',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Rätselraten',
    url: '/puzzle',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Körperklaus',
    url: '/koerper-klaus',
    alreadyPlayed: false,
    component: Pantomime,
  },
  {
    name: 'Looping Louie',
    url: '/looping-louie',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Musik',
    url: '/music',
    alreadyPlayed: false,
    component: MusicGame,
  },
  {
    name: 'What?!?!',
    url: '/what',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Quiz',
    url: '/quiz',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Tabu',
    url: '/tabu',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Erbsenzählen',
    url: '/erbsenzaehlen',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Kegeln',
    url: '/kegeln',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Turmbau zu Babel',
    url: '/turmbau-zu-babel',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Teambindung',
    url: '/teambindung',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Just One',
    url: '/just-one',
    alreadyPlayed: false,
    component: JustOneGame,
  },
];
