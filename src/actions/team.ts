import Team from '../interfaces/Team';
import { TEAMS } from './actionTypes';
import { AnyAction } from 'redux';

export const updateTeam = (team: Team): AnyAction => ({
  type: TEAMS.UPDATE,
  payload: team,
});
