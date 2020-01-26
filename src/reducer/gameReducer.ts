import { Game } from '../interfaces/Game';

import { AnyAction, Reducer } from 'redux';
import { GAMES } from '../actions/actionTypes';
import { getStaticGamesWithColors } from '../helpers/game';

export interface GameState {
  byName: { [name: string]: Game };
}

const initialState: GameState = Object.freeze({
  byName: getStaticGamesWithColors(),
});

const gameReducer: Reducer<GameState> = (state: GameState = initialState, action: AnyAction): GameState => {
  switch (action.type) {
    case GAMES.UPDATE:
      return {
        ...state,
        [action.payload.name]: action.payload,
      };
    default:
      return state;
  }
};
export default gameReducer;
