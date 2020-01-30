import React from 'react';
import GameDescription from '../../../../components/GameDescription';

export interface Props {}

export interface State {
  isStarted: boolean;
}
const MAX_ROUNDS = 2;

class Pantomime extends React.PureComponent<Props, State> {
  state = {
    isStarted: false,
  };

  startGame = (): void => {
    this.setState({ isStarted: true });
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Mimikry</h1>
        {!this.state.isStarted ? (
          <GameDescription onStart={this.startGame}>
            <p>
              <strong>Teilnehmer:</strong> alle
            </p>
            <p>
              <strong>Modus:</strong> abwechselnd
            </p>
            <p>
              <strong>Beschreibung:</strong> 
              <br />
              Es werden je Team {MAX_ROUNDS} Runden gespielt
            </p>
          </GameDescription>
        ) : (
          <p>Es geht los</p>
        )}
      </>
    );
  }
}

export default Pantomime;