export enum Routes {
  Home = '/',
  TeamPreparation = '/teampreparation/:id',
  Player = '/player',
  Master = '/master',
  Games = '/games',
  AwardCeremony = '/awardceremony',
}

export const LinkTo = {
  home: (): string => Routes.Home,
  playerGame: (game: string): string => `${Routes.Games}${game}`,
  playerGamesOverview: (): string => `${Routes.Games}`,
  masterGamesOverview: (): string => `${Routes.Master}`,
  masterGame: (game: string): string => `${Routes.Master}${game}`,
  teamPreparation: (id: number): string => Routes.TeamPreparation.replace(':id', '' + id),
};
