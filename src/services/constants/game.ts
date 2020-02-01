import { Game } from '../../interfaces/Game';
import MusicGame from '../../pages/games/MusicGame/player/MusicGame';
import JustOneGame from '../../pages/games/JustOneGame/player/';
import Pantomime from '../../pages/games/Pantomime/player/';
import Blur from "../../pages/games/Blur/player/Blur";

export const STATIC_GAMES: Array<Game> = [
  {
    name: 'Holzmarkt',
    url: '/holzmarkt',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'EXIT',
    url: '/exit',
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
    name: 'Wischi Waschi',
    url: '/blur',
    alreadyPlayed: false,
    component: Blur,
  },
  {
    name: 'What?!?!',
    url: '/what',
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
    name: 'Tetris',
    url: '/tetris',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Just One',
    url: '/just-one',
    alreadyPlayed: false,
    component: JustOneGame,
  },
  {
    name: 'Wischi Waschi',
    url: '/wischi-waschi',
    alreadyPlayed: false,
    component: JustOneGame,
  },
];
