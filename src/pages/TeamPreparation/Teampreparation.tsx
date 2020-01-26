import React from 'react';
import styles from './TeamPreparation.module.css';
import { Button, TextField } from '@material-ui/core';
import { COLORS } from '../../constants/team';
import Team from '../../interfaces/Team';
import classNames from 'classnames';

export interface Props {
  team: Team;
  updateTeam: (team: Team) => void;
}

const TeamPreparation: React.FC<Props> = ({ team, updateTeam }) => {
  return (
    <div className={styles.TeamPreparation}>
      <h1>Wählt euren Teamnamen und eine Farbe aus!</h1>
      <div className={styles.Row}>
        <div className={styles.TeamName}>
          <TextField
            label="Teamname"
            variant="outlined"
            onChange={(event): void => updateTeam({ ...team, name: event.currentTarget.value })}
          />
        </div>
        <div className={styles.Colors}>
          {COLORS.map(color => (
            <div
              key={color}
              className={classNames(styles.ColorTile, { [styles.Active]: color === team.color })}
              onClick={(): void => updateTeam({ ...team, color })}
              style={{ backgroundColor: `${color}` }}
            />
          ))}
        </div>
      </div>
      <Button variant={'contained'} color={'primary'}>
        Weiter
      </Button>
    </div>
  );
};

export default TeamPreparation;
