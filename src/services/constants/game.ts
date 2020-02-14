import { Game } from '../../interfaces/Game';
import MusicGame from '../../pages/games/MusicGame/player';
import JustOneGame from '../../pages/games/JustOneGame/player/';
import Pantomime from '../../pages/games/PantomimeGame/player/';
import Blur from '../../pages/games/Blur/player/Blur';
import Estimate from '../../pages/games/Estimate/player/';
import LoopingLouie from '../../pages/games/LoopingLouie/player';

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
    name: 'Körper-klaus',
    url: '/koerper-klaus',
    alreadyPlayed: false,
    component: Pantomime,
  },
  {
    name: 'Looping Louie',
    url: '/looping-louie',
    alreadyPlayed: false,
    component: LoopingLouie,
  },
  {
    name: 'Musik',
    url: '/music',
    alreadyPlayed: false,
    component: MusicGame,
  },
  {
    name: 'Wischi Waschi',
    url: '/wischi-waschi',
    alreadyPlayed: false,
    component: Blur,
  },
  {
    name: 'Schätze',
    url: '/schaetze',
    alreadyPlayed: false,
    component: Estimate,
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
];
