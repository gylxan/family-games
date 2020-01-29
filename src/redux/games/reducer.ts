import { Game } from '../../interfaces/Game';

import { AnyAction, Reducer } from 'redux';
import { GAMES } from '../actionTypes';
import { getStaticGamesWithColors } from '../../services/utils/game';
import CacheManager from '../../services/CacheManager';

const cacheManager = new CacheManager<GameState>('games');
const cachedData = cacheManager.load();

export interface GameState {
  byName: { [name: string]: Game };
}

const initialState: GameState = Object.freeze(
  cachedData !== null
    ? cachedData
    : {
        byName: getStaticGamesWithColors(),
      },
);

const gameReducer: Reducer<GameState> = (state: GameState = initialState, action: AnyAction): GameState => {
  let newState;
  switch (action.type) {
    case GAMES.UPDATE:
      newState = {
        ...state,
        byName: {
          [action.payload.name]: action.payload,
        },
      };
      cacheManager.save(newState);
      return newState;
    case GAMES.SET_ALREADY_PLAYED_BY_URL:
      const game = Object.keys(state.byName)
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
      };
      cacheManager.save(newState);
      return newState;
    default:
      return state;
  }
};
export default gameReducer;
