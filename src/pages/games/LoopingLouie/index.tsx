import React from 'react';
import GameDescription from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';

export const MAX_ROUNDS = 5;

interface DescriptionProps {
  onStart?: () => void;
}
const Description: React.FC<DescriptionProps> = ({ onStart }) => (
  <GameDescription onStart={onStart}>
    <p>
      <strong>Teilnehmer:</strong> je 2 aus einem Team
    </p>
    <p>
      <strong>Modus:</strong> Battle
    </p>
    <p>
      <strong>Rundenzahl:</strong> {MAX_ROUNDS}
    </p>
    <p>
      <strong>Beschreibung:</strong> Jedes Team bestimmt 2 Spieler. Diese verteilen sich dann abwechselnd um den Looping
      Louie. Der Louie fliegt im Kreis und versucht dabei die Hühner der Spieler (Chips) aus dem Stall zu schubsen. Die
      Spieler müssen den Louie abwehren und über ihren Stall hinweg fliegen lassen. Das Team, dessen Spieler zuletzt
      noch Hühner im Stall hat, gewinnt eine Runde.
    </p>
  </GameDescription>
);

const LoopingLouie: React.FC = () => (
  <>
    <h1>Looping Louie</h1>
    <GameFlow
      gameMode={GameMode.BATTLE}
      rounds={MAX_ROUNDS}
      showStartCountdown={true}
      descriptionComponent={<Description />}
    />
  </>
);

export default LoopingLouie;
