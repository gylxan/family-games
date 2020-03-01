import React from 'react';

import { Chip } from '@material-ui/core';
import { Group } from '@material-ui/icons';
import Team from '../../interfaces/Team';
import styles from './TeamPointsCounter.module.css';
import { Game } from '../../interfaces/Game';
export interface Props {
  teams: Team[];
  currentGame?: Game;
}

const TeamPointsCounter: React.FC<Props> = ({ teams, currentGame }) => (
  <header className={styles.TeamPointsCounter}>
    {teams.map((team, index) => (
      <>
        <Chip
          key={team.id}
          className={styles.TeamPoints}
          style={{ backgroundColor: team.color, color: 'white' }}
          icon={<Group style={{ color: 'white' }} />}
          label={
            <strong>
              {team.name}: {team.points}
            </strong>
          }
        />
        {currentGame && index === teams.length / 2 - 1 && <h1>{currentGame.name}</h1>}
      </>
    ))}
  </header>
);

export default TeamPointsCounter;
