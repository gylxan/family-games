import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { rootReducer } from '../reducer/rootReducer';

export const store = createStore(rootReducer, devToolsEnhancer({}));
