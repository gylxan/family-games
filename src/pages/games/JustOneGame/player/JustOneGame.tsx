import React from 'react';
import styles from './JustOneGame.module.css';
import GameDescription from '../../../../components/GameDescription';
import InputList from '../../../../components/InputList';
import GameResult from '../../../../components/GameResult';
import { getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import GameFlow from '../../../../components/GameFlow';
import { GameState } from '../../../../interfaces/Game';

export interface Props {
  teams: Team[];
}

export interface State {
  gameState: GameState;
  playPhase: Phase;
  currentWord: string;
  hints: string[];
  score: number[];
}

const MAX_ROUNDS = 2;
const WORDS = [
  'Bier',
  'Schokolade',
  'Schnee',
  'Krawatte',
  'Wind',
  'Asterix',
  'Roboter',
  'Komödie',
  'Sprache',
  'Friseur',
  'Mühle',
  'Dschungel',
  'Nonne',
  'Böller',
  'Aladdin',
  'Gürtel',
  'Bar',
];

enum Phase {
  EXPLAINING,
  GUESSING,
}

class JustOneGame extends React.PureComponent<Props, State> {
  state = {
    gameState: GameState.DESCRIPTION,
    playPhase: Phase.EXPLAINING,
    currentWord: '',
    hints: [],
    score: [],
  };

  availableWords: string[] = [...WORDS];

  startGame = (): void => {
    this.setState({
      gameState: GameState.PLAYING,
    });
  };

  startTurn = (): void => {
    this.setState({
      playPhase: Phase.EXPLAINING,
      hints: [],
      currentWord: this.availableWords.splice(getRandomIndex(this.availableWords), 1)[0],
    });
  };

  startGuessing = (): void => {
    this.setState({
      playPhase: Phase.GUESSING,
    });
  };

  setHints = (hints: string[]): void => {
    this.setState({ hints });
  };

  showResult = (score: number[]): void => {
    this.setState({
      gameState: GameState.RESULT,
      score: score,
    });
  };

  endGame = (): void => {
    console.log('end');
  };

  renderDescription(): JSX.Element {
    return (
      <GameDescription onStart={this.startGame}>
        <p>
          <strong>Teilnehmer:</strong> alle (2 x Ratende je Team)
        </p>
        <p>
          <strong>Modus:</strong> Abwechelnd
        </p>
        <p>
          <strong>Rundenzahl je Team:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> Die Teams bestimmen 2 Ratende. Den anderen Spielern wird ein Begriff gezeigt,
          den Sie den Ratenden erklären müssen. Dazu können sie Hinweise in Form <strong>eines Wortes</strong> auf einen
          Zettel schreiben und den Game Mastern übergeben. Anschließend haben die Ratenden 1 Minute Zeit, den Begriff zu
          erraten. Dafür haben sie nur einen Versuch.
          <br />
          Achtung: Alle mehrfachen (identischen) Hinweise werden entfernt.
        </p>
      </GameDescription>
    );
  }

  renderGameFlowExplaining(): JSX.Element {
    return (
      <>
        <p>
          Erklärt den Begriff: <strong className={styles.Action}>{this.state.currentWord}</strong>
        </p>
        <InputList edit={true} inputs={this.state.hints} updateInputs={this.setHints} />
        <div className={styles.Footer}>
          <Button variant={'contained'} color={'primary'} onClick={this.startGuessing}>
            Fertig
          </Button>
        </div>
      </>
    );
  }

  renderGameFlowGuessing(): JSX.Element {
    return (
      <>
        <p>
          Ratet den Begriff zu diesen Wörtern. <br />
          Ihr habt einen Versuch.
        </p>
        <ul className={styles.Hints}>
          {this.state.hints.map((hint: string, index: number) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </>
    );
  }

  renderGamePlay(): JSX.Element {
    return (
      <GameFlow
        teams={this.props.teams}
        rounds={MAX_ROUNDS}
        isRating={this.state.playPhase === Phase.GUESSING}
        onStartTurn={this.startTurn}
        onEndGame={this.showResult}
      >
        {this.state.currentWord &&
          ((): JSX.Element => {
            switch (this.state.playPhase) {
              case Phase.EXPLAINING:
                return this.renderGameFlowExplaining();
              case Phase.GUESSING:
                return this.renderGameFlowGuessing();
              default:
                return <></>;
            }
          })()}
      </GameFlow>
    );
  }

  renderResult(): JSX.Element {
    return (
      <>
        <GameResult teams={this.props.teams} score={this.state.score} />
        <div className={styles.Footer}>
          <Button variant={'contained'} color={'primary'} onClick={this.endGame}>
            Ok
          </Button>
        </div>
      </>
    );
  }

  render(): JSX.Element {
    return (
      <>
        <h1 className={classNames({ [styles.HeadlineStartedGame]: this.state.gameState !== GameState.DESCRIPTION })}>
          &raquo;Just One&laquo;
        </h1>
        {((): JSX.Element => {
          switch (this.state.gameState) {
            case GameState.DESCRIPTION:
              return this.renderDescription();
            case GameState.PLAYING:
              return this.renderGamePlay();
            case GameState.RESULT:
              return this.renderResult();
            default:
              return <></>;
          }
        })()}
      </>
    );
  }
}

export default JustOneGame;
