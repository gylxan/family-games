import { Game } from '../../interfaces/Game';

import { AnyAction, Reducer } from 'redux';
import { GAMES } from '../actionTypes';
import { getRandomGamesWithColors } from '../../services/utils/game';
import CacheManager from '../../services/CacheManager';
import config, { Environment } from '../../services/config';
import { STATIC_GAMES } from '../../services/constants/game';

const cacheManager = new CacheManager<GameState>('games');
if (config.env === Environment.Development) {
  cacheManager.delete();
}
const cachedData = cacheManager.load();

export interface GameState {
  currentGame: undefined | Game;
  byName: { [name: string]: Game };
  isShownFirst: boolean;
}

const initialState: GameState = Object.freeze(
  cachedData !== null
    ? cachedData
    : {
        byName: getRandomGamesWithColors(),
        isShownFirst: true,
        currentGame: undefined,
      },
);

const gameReducer: Reducer<GameState> = (state: GameState = initialState, action: AnyAction): GameState => {
  let newState, game: Game;
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
    default:
      return state;
  }
};
export default gameReducer;
