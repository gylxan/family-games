import { Game } from '../../interfaces/Game';
import Tower from '../../pages/games/Tower';
import JustOne from '../../pages/games/JustOne';
import Pantomime from '../../pages/games/Pantomime';
import PantomimeMaster from '../../pages/master/Pantomime';
import LoopingLouie from '../../pages/games/LoopingLouie';
import JukeBox from '../../pages/games/JukeBox';
import Blur from '../../pages/games/Blur/Blur';
import Estimate from '../../pages/games/Estimate';
import PaperPlane from '../../pages/games/PaperPlane';
import Tetris from '../../pages/games/Tetris';
import LumberMarket from '../../pages/games/LumberMarket';

export const HOLZMARKT_NAME = 'Holzmarkt';

export const STATIC_GAMES: Array<Game> = [
  {
    name: HOLZMARKT_NAME,
    url: '/holzmarkt',
    alreadyPlayed: false,
    component: LumberMarket,
  },
  {
    name: 'EXIT',
    url: '/exit',
    alreadyPlayed: false,
    component: JustOne,
  },
  {
    name: 'Körper-klaus',
    url: '/koerper-klaus',
    alreadyPlayed: false,
    component: Pantomime,
    masterComponent: PantomimeMaster,
  },
  {
    name: 'Hühner schubsen',
    url: '/huehner-schubsen',
    alreadyPlayed: false,
    component: LoopingLouie,
  },
  {
    name: 'Juke-Box',
    url: '/juke-box',
    alreadyPlayed: false,
    component: JukeBox,
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
    component: Tower,
  },
  {
    name: 'Tetris',
    url: '/tetris',
    alreadyPlayed: false,
    component: Tetris,
  },
  {
    name: 'Nur Eins',
    url: '/nur-eins',
    alreadyPlayed: false,
    component: JustOne,
  },
  {
    name: 'Speed Origami',
    url: '/speed-origami',
    alreadyPlayed: false,
    component: PaperPlane,
  },
];

export const COLORS = [
  '#FFC312',
  '#EE5A24',
  '#EA2027',
  '#FDA7DF',
  '#D980FA',
  '#B53471',
  '#0652DD',
  '#1B1464',
  '#12CBC4',
  '#009432',
];
