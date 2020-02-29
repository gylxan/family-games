export enum Routes {
  Home = '/',
  TeamPreparation = '/team-vorbereitung/:id',
  Player = '/player',
  Master = '/game-master',
  Games = '/spiele',
  AwardCeremony = '/siegerehrung',
}

export const LinkTo = {
  home: (): string => Routes.Home,
  playerGame: (game: string): string => `${Routes.Games}${game}`,
  playerGamesOverview: (): string => `${Routes.Games}`,
  masterGamesOverview: (): string => `${Routes.Master}`,
  masterGame: (game: string): string => `${Routes.Master}${game}`,
  teamPreparation: (id: number): string => Routes.TeamPreparation.replace(':id', '' + id),
};
