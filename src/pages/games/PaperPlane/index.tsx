import React, { useState } from 'react';
import { PanTool } from '@material-ui/icons';

import GameDescription from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';
import Countdown from '../../../components/Countdown';
import styles from './PaperPlane.module.css';

export const MAX_ROUNDS = 3;
export const TIME_IN_SECS = 300;

interface DescriptionProps {
  onStart?: () => void;
}
const Description: React.FC<DescriptionProps> = ({ onStart }) => (
  <GameDescription onStart={onStart}>
    <p>
      <strong>Teilnehmer:</strong> Alle
    </p>
    <p>
      <strong>Modus:</strong> Battle
    </p>
    <p>
      <strong>Rundenzahl:</strong> {MAX_ROUNDS}
    </p>
    <p>
      <strong>Beschreibung:</strong> Alle Spieler basteln aus einem Din A4-Zettel ein Papierflugzeug. Dafür habt ihr{' '}
      {TIME_IN_SECS / 60} Minuten Zeit.
      <br />
      Danach stellen sich draußen alle an einer Linie und werfen nacheinander ihre Flugzeuge so weit wie möglich. Das
      Team, dessen Spieler das Papierflugzeug am Weitesten geworfen hat, gewinnt die Runde.
    </p>
  </GameDescription>
);

interface GamePlayProps {
  isTimeUp: boolean;
  setIsTimeUp: (isTimeUp: boolean) => void;
}
const GamePlay: React.FC<GamePlayProps> = ({ isTimeUp, setIsTimeUp }) => {
  return (
    <>
      {isTimeUp ? (
        <PanTool className={styles.Stop} style={{ color: 'white' }} />
      ) : (
        <Countdown started={true} time={TIME_IN_SECS * 1000} onEnd={(): void => setIsTimeUp(true)} />
      )}
    </>
  );
};

const PaperPlane: React.FC = () => {
  const [isFirstTimeUp, setIsFirstTimeUp] = useState(false);
  return (
    <>
      <h1>Speed Origami</h1>
      <GameFlow
        gameMode={GameMode.BATTLE}
        rounds={MAX_ROUNDS}
        showScoring={isFirstTimeUp}
        showStartCountdown={true}
        descriptionComponent={<Description />}
        playingComponent={<GamePlay isTimeUp={isFirstTimeUp} setIsTimeUp={setIsFirstTimeUp} />}
      />
    </>
  );
};

export default PaperPlane;
