import { AnyAction } from 'redux';
import { GAMES } from '../actionTypes';

export const setAlreadyPlayed = (name: string): AnyAction => ({
  type: GAMES.SET_ALREADY_PLAYED,
  payload: { name },
});
