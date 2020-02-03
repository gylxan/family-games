import { Game } from '../../interfaces/Game';
import { generateColor } from './color';
import { STATIC_GAMES } from '../constants/game';

export const getStaticGamesWithColors = (): { [name: string]: Game } =>
  STATIC_GAMES.reduce(
    (result: { [name: string]: Game }, element) => ({
      ...result,
      [element.name]: { ...element, color: generateColor() },
    }),
    {},
  );

export const hasAllGamesPlayed = (games: Game[]): boolean =>
  games.map(game => game.alreadyPlayed).reduce((prev, current) => prev && current, true);
