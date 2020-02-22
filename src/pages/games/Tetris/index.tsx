import React from 'react';

import styles from './Tetris.module.css';
import SlotMachine from '../../../components/SlotMachine';

export interface Props {}

const Tetris: React.FC<Props> = () => {
  return (
    <div className={styles.Container}>
      <SlotMachine />
    </div>
  );
};

export default Tetris;
