import React from 'react';
import GameDescription from '../../../../components/GameDescription';
import { GameState } from '../../../../interfaces/Game';
import Team from '../../../../interfaces/Team';

export interface Props {
  teams: Team[];
}

export interface State {
  gameState: GameState;
  score: number[];
}
const MAX_ROUNDS = 2;

class Pantomime extends React.PureComponent<Props, State> {
  state = {
    gameState: GameState.DESCRIPTION,
    score: [],
  };

  startGame = (): void => {
    this.setState({
      gameState: GameState.PLAYING,
    });
  };

  showResult = (score: number[]): void => {
    this.setState({
      gameState: GameState.RESULT,
      score: score,
    });
  };

  startTurn = (): void => {
    console.log('startTurn');
  };

  endGame = (): void => {
    console.log('endGame');
  };

  renderGamePlay(): JSX.Element {
    return <>Hello world</>;
  }

  renderDescription(): JSX.Element {
    return (
      <GameDescription onStart={this.startGame}>
        <p>
          <strong>Teilnehmer:</strong> alle (1 x Körperklaus je Runde)
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
    );
  }

  render(): JSX.Element {
    return (
      <>
        
      </>
    );
  }
}

export default Pantomime;
