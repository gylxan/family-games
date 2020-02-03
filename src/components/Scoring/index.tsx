import React from 'react';
import styles from './Scoring.module.css';
import { Check, Clear } from '@material-ui/icons';

import { Button } from '@material-ui/core';
import Team from '../../interfaces/Team';
import { getOtherTeam } from '../../services/utils/team';

export interface Props {
  onScored: (teamId: null | number) => void;
  teams: Team[];
  activeTeamId?: number;
}

const Scoring: React.FC<Props> = ({ onScored, teams, activeTeamId }) => (
  <div className={styles.FooterRating}>
    {!!activeTeamId ? (
      <>
        <Button className="MuiButton-containedRight" variant={'contained'} onClick={(): void => onScored(activeTeamId)}>
          <Check style={{ color: 'white' }} />
          Richtig
        </Button>
        <Button
          className="MuiButton-containedWrong"
          variant={'contained'}
          onClick={(): void => onScored(getOtherTeam(teams, activeTeamId).id)}
        >
          <Clear style={{ color: 'white' }} />
          Falsch
        </Button>
      </>
    ) : (
      <>
        {teams.map(team => (
          <Button
            key={team.id}
            variant={'contained'}
            color="primary"
            className={styles.TeamButton}
            onClick={(): void => onScored(team.id)}
          >
            <Check style={{ color: 'white' }} />
            {team.name}
          </Button>
        ))}
      </>
    )}
  </div>
);
export default Scoring;