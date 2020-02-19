export enum Routes {
  Home = '/',
  TeamPreparation = '/teampreparation/:id',
  Player = '/player',
  Master = '/master',
  Games = '/games',
  AwardCeremony = '/awardceremony',
}

export const LinkTo = {
  playerGame: (game: string): string => `${Routes.Player}${Routes.Games}${game}`,
  playerGamesOverview: (): string => `${Routes.Player}${Routes.Games}`,
  masterGamesOverview: (): string => `${Routes.Master}${Routes.Games}`,
  masterGame: (game: string): string => `${Routes.Master}${Routes.Games}${game}`,
  teamPreparation: (id: number): string => Routes.TeamPreparation.replace(':id', '' + id),
};
