import Team from '../../interfaces/Team';
import { TEAMS } from '../actionTypes';
import { AnyAction } from 'redux';

export const updateTeam = (team: Team): AnyAction => ({
  type: TEAMS.UPDATE,
  payload: team,
});

export const addPoints = (id: string, points: number): AnyAction => ({
  type: TEAMS.UPDATE,
  payload: { id, points },
});

export const resetTeams = (): AnyAction => ({
  type: TEAMS.RESET,
});
