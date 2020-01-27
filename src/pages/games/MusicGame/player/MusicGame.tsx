import React from 'react';
import GameDescription from '../../../../components/GameDescription';

export interface Props {}

export interface State {
  isStarted: boolean;
}

class MusicGame extends React.PureComponent<Props, State> {
  state = {
    isStarted: false,
  };

  startGame = (): void => {
    this.setState({ isStarted: true });
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Musik-Quiz</h1>
        {!this.state.isStarted ? (
          <GameDescription onStart={this.startGame}>
            <p>
              <strong>Teilnehmer:</strong> alle
            </p>
            <p>
              <strong>Modus:</strong> Battle
            </p>
            <p>
              <strong>Beschreibung:</strong> Den Teams werden abwechselnd die ersten 10 Sekunden eines Hits der 70er /
              80er / 90er vorgespielt. Das Team hat 30 Sekunden um eine Antwort zu geben.
              <br />
              Es werden 8 Runden gespielt.
            </p>
          </GameDescription>
        ) : (
          <p>Spitzt eure Ohren</p>
        )}
      </>
    );
  }
}

export default MusicGame;
