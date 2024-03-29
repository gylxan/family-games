import { Game } from '../../interfaces/Game';
import RootState from '../RootState';

export const getGameByName = (state: RootState, name: string): Game => state.game.byName[name];

export const getGamesArray = (state: RootState): Game[] =>
  Object.keys(state.game.byName).map(name => state.game.byName[name]);