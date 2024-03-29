import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import gameReducer from './games/reducer';
import { History } from 'history';
import teamReducer from './team/reducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = (history: History) =>
  combineReducers({
    game: gameReducer,
    team: teamReducer,
    router: connectRouter(history),
  });
