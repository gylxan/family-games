import React from 'react';

import Team from '../../interfaces/Team';
import styles from './GameResult.module.css';

import { Button } from '@material-ui/core';

export interface Props {
  teams: Team[];
  score: Map<number, number>;
  endGame: () => void;
}

const GameResult: React.FC<Props> = ({ teams, score, endGame }) => (
  <>
    Endstand
    <ul className={styles.Score}>
      {teams.map(team => {
        return (
          <li key={team.id}>
            <strong>{team.name}</strong>
            <br />
            {score.get(team.id)}
          </li>
        );
      })}
    </ul>
    <div className={styles.Footer}>
      <Button variant={'contained'} color={'primary'} onClick={endGame}>
        Ok
      </Button>
    </div>
  </>
);

export default GameResult;
