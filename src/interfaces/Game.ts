import React from 'react';

export interface Game {
  name: string;
  url: string;
  color?: string;
  alreadyPlayed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}
