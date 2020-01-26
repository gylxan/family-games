import RootState from '../RootState';
import Team from '../../interfaces/Team';

export const getTeamById = (state: RootState, id: number): Team | undefined =>
  state.team.data.find(team => team.id === id);
