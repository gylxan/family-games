import React from 'react';
import styles from './Scoring.module.css';
import Countdown from '../Countdown';
import { Check, Clear } from '@material-ui/icons';

import { Button } from '@material-ui/core';
import Team from '../../interfaces/Team';
import { getOtherTeam } from '../../services/utils/team';

export interface Props {
  onScored: (teamId: null | number) => void;
  teams: Team[];
  activeTeamId: number;
}

const Scoring: React.FC<Props> = ({ onScored, teams, activeTeamId }) => (
  <>
    <Countdown
      className={styles.Countdown}
      started={true}
      time={60000}
      onEnd={(): void => onScored(getOtherTeam(teams, activeTeamId).id)}
    />
    <div className={styles.FooterRating}>
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
    </div>
  </>
);
export default Scoring;
