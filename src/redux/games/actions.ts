import { AnyAction } from 'redux';
import { GAMES } from '../actionTypes';

export const setAlreadyPlayedByUrl = (url: string): AnyAction => ({
  type: GAMES.SET_ALREADY_PLAYED_BY_URL,
  payload: { url },
});

export const setCurrentGameByUrl = (url: string): AnyAction => ({
  type: GAMES.SET_CURRENT_BY_URL,
  payload: { url },
});
