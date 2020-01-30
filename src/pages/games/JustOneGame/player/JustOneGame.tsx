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

export interface Props {
  teams: Team[];
}

export interface State {
  isStarted: boolean;
  isFinished: boolean;
  isExplaining: boolean;
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

class JustOneGame extends React.PureComponent<Props, State> {
  state = {
    isStarted: false,
    isFinished: false,
    isExplaining: false,
    currentWord: '',
    hints: [],
    score: [],
  };

  availableWords: string[] = [...WORDS];

  startGame = () => {
    this.setState({
      isStarted: true,
      isExplaining: true,
    });
  };

  startTurn = () => {
    this.setState({
      isExplaining: true,
      hints: [],
      currentWord: this.availableWords.splice(getRandomIndex(this.availableWords), 1)[0],
    });
  };

  startGuessing = () => {
    this.setState({
      isExplaining: false,
    });
  };

  setHints = (hints: string[]) => {
    this.setState({ hints });
  };

  endGame = (score: number[]) => {
    this.setState({
      isFinished: true,
      score: score
    });
  };

  render(): JSX.Element {
    return (
      <>
        <h1 className={classNames({ [styles.HeadlineStartedGame]: this.state.isStarted })}>&raquo;Just One&laquo;</h1>
        {!this.state.isStarted ? (
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
              <strong>Beschreibung:</strong> Die Teams bestimmen 2 Ratende. Den anderen Spielern wird ein Begriff
              gezeigt, den Sie den Ratenden erklären müssen. Dazu können sie Hinweise in Form{' '}
              <strong>eines Wortes</strong> auf einen Zettel schreiben und den Game Mastern übergeben. Anschließend
              haben die Ratenden 1 Minute Zeit, den Begriff zu erraten. Dafür haben sie nur einen Versuch.
              <br />
              Achtung: Alle mehrfachen (identischen) Hinweise werden entfernt.
            </p>
          </GameDescription>
        ) : this.state.isFinished ? (
          <>
            <GameResult teams={this.props.teams} score={this.state.score} />
            <div className={styles.Footer}>
              <Button variant={'contained'} color={'primary'} onClick={this.endGame}>
                Ok
              </Button>
            </div>
          </>
        ) : (
          <GameFlow
            teams={this.props.teams}
            rounds={MAX_ROUNDS}
            isRating={!this.state.isExplaining}
            onStartTurn={this.startTurn}
            onEndGame={this.endGame}
          >
            {this.state.currentWord && (
              this.state.isExplaining ? (
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
              ) : (
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
              )
            )}
          </GameFlow>
        )}
      </>
    );
  }
}

export default JustOneGame;
