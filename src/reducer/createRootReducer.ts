import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import gameReducer from './gameReducer';
import { History } from 'history';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = (history: History) =>
  combineReducers({
    game: gameReducer,
    router: connectRouter(history),
  });
