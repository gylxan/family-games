import React from 'react';
import styles from './Scoring.module.css';
import Countdown from '../Countdown';
import { Check, Clear } from '@material-ui/icons';

import { Button } from '@material-ui/core';

export interface Props {
  onScored: (isSuccess: boolean) => void;
}

const Scoring: React.FC<Props> = ({ onScored }) => (
  <>
    <Countdown
      className={styles.Countdown}
      started={true}
      time={60000}
      onEnd={(): void => onScored(false)}
    />
    <div className={styles.FooterRating}>
      <Button className="MuiButton-containedRight" variant={'contained'} onClick={(): void => onScored(true)}>
        <Check style={{ color: 'white' }} />
        Richtig
      </Button>
      <Button className="MuiButton-containedWrong" variant={'contained'} onClick={(): void => onScored(false)}>
        <Clear style={{ color: 'white' }} />
        Falsch
      </Button>
    </div>
  </>
);
export default Scoring;
