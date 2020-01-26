import React from 'react';
import styles from './GameDescription.module.css';
import { Button } from '@material-ui/core';

export interface Props {
  children: React.ReactNode;
  onStart: () => void;
}

const GameDescription: React.FC<Props> = ({ children, onStart }) => (
  <div className={styles.GameDescription}>
    <div className={styles.Description}>{children}</div>
    <Button variant={'contained'} color={'primary'} onClick={onStart}>
      Alles klar!
    </Button>
  </div>
);
export default GameDescription;
