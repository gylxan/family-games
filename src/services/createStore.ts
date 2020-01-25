import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer } from '../reducer/createRootReducer';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history))),
);
