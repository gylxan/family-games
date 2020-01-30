import React from 'react';

import Team from '../../interfaces/Team';
import styles from './GameResult.module.css';

export interface Props {
  teams: Team[];
  score: number[]
}

const GameResult: React.FC<Props> = ({ teams, score }) => (
  <>
    Endstand
    <ul className={styles.Score}>
      {teams.map((team, index) => {
        return (
          <li key={index}>
            <strong>{team.name}</strong>
            <br />
            {score[index]}
          </li>
        );
      })}
    </ul>
  </>
);

export default GameResult;
