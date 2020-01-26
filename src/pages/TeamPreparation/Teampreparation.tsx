import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { COLORS } from '../../services/constants/team';
import Team from '../../interfaces/Team';
import classNames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LinkTo } from '../../services/routes';

import styles from './TeamPreparation.module.css';

export interface Props extends RouteComponentProps {
  team: Team;
  updateTeam: (team: Team) => void;
  push: (url: string) => void;
  goBack: () => void;
}

const TeamPreparation: React.FC<Props> = ({ team, updateTeam, push, goBack }) => {
  const handleContinue = (): void => {
    if (team.id === 2) {
      push(LinkTo.playerGamesOverview());
    } else {
      push(LinkTo.teamPreparation(2));
    }
  };
  return (
    <>
      <h1>Team {team.id}, wählt euren Namen und eine Farbe aus!</h1>
      <div className={styles.TeamPreparation}>
        <div className={styles.Row}>
          <div className={styles.TeamName}>
            <TextField
              autoFocus
              label="Teamname"
              variant="filled"
              value={team.name}
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
      </div>
      <div className={styles.ControlBar}>
        <Button variant={'contained'} color={'secondary'} onClick={goBack}>
          Zurück
        </Button>
        <Button variant={'contained'} color={'primary'} disabled={!(team.name && team.color)} onClick={handleContinue}>
          Weiter
        </Button>
      </div>
    </>
  );
};

export default withRouter(TeamPreparation);
