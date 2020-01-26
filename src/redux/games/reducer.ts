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
        [action.payload.name]: action.payload,
      };
      cacheManager.save(newState);
      return newState;
    default:
      return state;
  }
};
export default gameReducer;
