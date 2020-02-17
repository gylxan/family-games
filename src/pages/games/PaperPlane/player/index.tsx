import React from 'react';
import GameDescription from '../../../../components/GameDescription';
import GameFlow from '../../../../components/GameFlow';
import { GameMode } from '../../../../components/GameFlow/GameFlow';

export const MAX_ROUNDS = 3;

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
      <strong>Beschreibung:</strong> Alle Spieler basteln aus einem Din A4-Zettel ein Papierflugzeug. <br />
      Danach stellen sich draußen alle an einer Linie und werfen nacheinander ihre Flugzeuge so weit wie möglich. Das
      Team, dessen Spieler das Papierflugzeug am Weitesten geworfen hat, gewinnt die Runde.
    </p>
  </GameDescription>
);

const PaperPlane: React.FC = () => (
  <>
    <h1>Papierflugzeug</h1>
    <GameFlow
      gameMode={GameMode.BATTLE}
      rounds={MAX_ROUNDS}
      showStartCountdown={true}
      descriptionComponent={<Description />}
    />
  </>
);

export default PaperPlane;
