import React from 'react';

import { Chip } from '@material-ui/core';
import { Group } from '@material-ui/icons';
import Team from '../../interfaces/Team';
import styles from './TeamPointsCounter.module.css';
export interface Props {
  teams: Team[];
}

const TeamPointsCounter: React.FC<Props> = ({ teams }) => (
  <header className={styles.TeamPointsCounter}>
    {teams.map(team => (
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
    ))}
  </header>
);

export default TeamPointsCounter;
