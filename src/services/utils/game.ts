import { Game } from '../../interfaces/Game';
import { COLORS, HOLZMARKT_NAME, STATIC_GAMES } from '../constants/game';
import { getRandomItem } from './array';

const MAX_GAMES = 10;

const isGameAlreadyAdded = (games: Game[], gameToCheck: Game): boolean =>
  games.find(alreadyAdded => alreadyAdded.name === gameToCheck.name) !== undefined;

export const getRandomGamesWithColors = (): { [name: string]: Game } => {
  const games = [];
  // Add holzmarkt game in every case!
  const holzmarktGame = STATIC_GAMES.find(game => game.name === HOLZMARKT_NAME);

  games.push({ ...holzmarktGame, color: COLORS[MAX_GAMES - 1] });

  let game;
  for (let i = 0; i < MAX_GAMES - 1; i++) {
    game = getRandomItem(STATIC_GAMES);
    if (isGameAlreadyAdded(games, game)) {
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
