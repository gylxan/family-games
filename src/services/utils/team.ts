import Team from '../../interfaces/Team';

export const getOtherTeam = (teams: Team[], activeTeamId: number): Team =>
  teams.find((team: Team) => team.id !== activeTeamId);
