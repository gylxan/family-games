import { Game } from '../../interfaces/Game';
import { COLORS, EXIT_NAME, HOLZMARKT_NAME, STATIC_GAMES } from '../constants/game';
import { getRandomItem } from './array';

const MAX_GAMES = 10;

const isGameAlreadyAdded = (games: Game[], gameToCheck: Game): boolean =>
  games.find(alreadyAdded => alreadyAdded.name === gameToCheck.name) !== undefined;

export const getRandomGamesWithColors = (): { [name: string]: Game } => {
  const games = [];
  const gamesWithoutIgnored = STATIC_GAMES.filter(game => game.name !== EXIT_NAME);
  // Add holzmarkt game in every case!
  const holzmarktGame = gamesWithoutIgnored.find(game => game.name === HOLZMARKT_NAME);

  games.push({ ...holzmarktGame, color: COLORS[0] });

  let game;
  for (let i = 0; i < MAX_GAMES - 1; i++) {
    game = getRandomItem(gamesWithoutIgnored);
    if (isGameAlreadyAdded(games, game)) {
      i--;
    } else {
      games.push({ ...game, color: COLORS[i + 1] });
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

export const getPlayedGames = (games: Game[]): Game[] => games.filter(game => game.alreadyPlayed === true);
