import { Game } from '../../interfaces/Game';

import { AnyAction, Reducer } from 'redux';
import { GAMES } from '../actionTypes';
import { getRandomGamesWithColors } from '../../services/utils/game';
import CacheManager, { STORAGE_KEY_GAMES } from '../../services/CacheManager';
import config, { Environment } from '../../services/config';
import { EXIT_NAME, STATIC_GAMES } from '../../services/constants/game';

const cacheManager = new CacheManager<GameState>(STORAGE_KEY_GAMES);
if (config.env === Environment.Development) {
  cacheManager.delete();
}
const cachedData = cacheManager.load();

export interface GameState {
  currentGame: undefined | Game;
  byName: { [name: string]: Game };
  isShownFirst: boolean;
  isExitGamePlayed: boolean;
}

const getInitialData = (cachedData: GameState | null): GameState => {
  return cachedData !== null
    ? cachedData
    : {
        byName: getRandomGamesWithColors(),
        isShownFirst: true,
        currentGame: undefined,
        isExitGamePlayed: false,
      };
};

const initialState: GameState = Object.freeze(getInitialData(cachedData));

const gameReducer: Reducer<GameState> = (state: GameState = initialState, action: AnyAction): GameState => {
  let newState, game: Game;
  // TODO Make this more efficient!
  switch (action.type) {
    case GAMES.SET_CURRENT_BY_URL:
      // Use STATIC_GAMES here to set EXIT as current game,too
      game = STATIC_GAMES.find(game => game.url === action.payload.url);
      newState = {
        ...state,
        currentGame: game,
      };
      cacheManager.save(newState);
      return newState;

    case GAMES.UPDATE:
      newState = {
        ...state,
        byName: {
          [action.payload.name]: action.payload,
        },
        isShownFirst: false,
      };
      cacheManager.save(newState);
      return newState;
    case GAMES.SET_ALREADY_PLAYED_BY_URL:
      game = Object.keys(state.byName)
        .map(name => state.byName[name])
        .find(game => game.url === action.payload.url);
      if (!game) {
        game = STATIC_GAMES.find(game => game.url === action.payload.url);
        if (!!game && game.name === EXIT_NAME) {
          newState = {
            ...state,
            isExitGamePlayed: true,
          };
        }
        cacheManager.save(newState);
        return state;
      }
      newState = {
        ...state,
        byName: {
          ...state.byName,
          [game.name]: {
            ...game,
            alreadyPlayed: true,
          },
        },
        isShownFirst: false,
      };
      cacheManager.save(newState);
      return newState;

    case GAMES.RESET:
      cacheManager.delete();
      newState = getInitialData(null);
      cacheManager.save(newState);
      return newState;
    default:
      return state;
  }
};
export default gameReducer;
