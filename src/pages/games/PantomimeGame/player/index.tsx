import React from 'react';
import GameDescription, { Props as GameDescriptionProps } from '../../../../components/GameDescription';
import GameFlow from '../../../../components/GameFlow';

import { GameMode } from '../../../../components/GameFlow/GameFlow';

const MAX_ROUNDS = 2;

class Pantomime extends React.PureComponent {

  renderGameDescription = (): React.ReactElement<GameDescriptionProps> => {
    return (
      <GameDescription>
        <p>
          <strong>Teilnehmer:</strong> alle (1 Körperklaus je Runde)
        </p>
        <p>
          <strong>Modus:</strong> Abwechselnd
        </p>
        <p>
          <strong>Rundenzahl:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> Der Körperklaus erhält einen geheimen Begriff. Diesen Begriff stellt er seinen
          Teammitgliedern innerhalb einer Minute unter vollem Körpereinsatz dar. Es dürfen keine Hilfsmittel verwendet
          werden.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Körperklaus</h1>
        <GameFlow
          rounds={MAX_ROUNDS}
          countdown={60}
          showScoring
          descriptionComponent={this.renderGameDescription()}
          playingComponent={<></>}
          gameMode={GameMode.ROUNDS}
        />
      </>
    );
  }
}

export default Pantomime;
