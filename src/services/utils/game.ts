import { Game } from '../../interfaces/Game';
import { COLORS, STATIC_GAMES } from '../constants/game';
import { getRandomItem } from './array';

const MAX_GAMES = 10;

export const getRandomGamesWithColors = (): { [name: string]: Game } => {
  const games = [];
  let game;
  for (let i = 0; i < MAX_GAMES; i++) {
    game = getRandomItem(STATIC_GAMES);
    if (games.find(alreadyAdded => alreadyAdded.name === game.name) !== undefined) {
      i--;
    } else {
      games.push({ ...game, color: COLORS[i] });
    }
  }

  return games.reduce(
    (result: { [name: string]: Game }, element) => ({
      ...result,
      [element.name]: element,
    }),
    {},
  );
};
export const hasAllGamesPlayed = (games: Game[]): boolean =>
  games.map(game => game.alreadyPlayed).reduce((prev, current) => prev && current, true);
