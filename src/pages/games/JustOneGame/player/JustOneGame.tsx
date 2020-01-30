import React from 'react';
import styles from './JustOneGame.module.css';
import GameDescription from '../../../../components/GameDescription';
import InputList from '../../../../components/InputList';
import GameResult from '../../../../components/GameResult';
import { getRandomItem, getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';
import { Button } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
import classNames from 'classnames';

export interface Props {
  teams: Team[];
}

export interface State {
  isStarted: boolean;
  isFinished: boolean;
  isExplaining: boolean;
  activeTeam: undefined | Team;
  playedTurns: number;
  currentWord: string;
  score: number[];
  hints: string[];
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
  'Aladding',
  'Gürtel',
  'Bar',
];

class JustOneGame extends React.PureComponent<Props, State> {
  state = {
    isStarted: false,
    isFinished: false,
    isExplaining: false,
    activeTeam: undefined,
    playedTurns: 0,
    currentWord: '',
    score: [],
    hints: [],
  };

  availableWords: string[] = [...WORDS];

  startGame = () => {
    this.setState({
      isStarted: true,
      activeTeam: getRandomItem(this.props.teams),
      score: this.props.teams.map(() => 0),
    });
  };

  startTurn = () => {
    this.setState({
      isExplaining: true,
      currentWord: this.availableWords.splice(getRandomIndex(this.availableWords), 1)[0],
    });
  };

  startGuessing = () => {
    this.setState({
      isExplaining: false,
    });
  };

  endTurn = (isSuccess: boolean) => {
    let nextPlayedTurns = this.state.playedTurns + 1;

    const scoreIndex = this.props.teams.findIndex((team: Team) => {
      return isSuccess === (team.name === ((this.state.activeTeam as unknown) as Team).name);
    });
    const updatedScore = [...this.state.score];
    updatedScore[scoreIndex]++;

    const nextActiveTeam = this.props.teams.find((team: Team) => {
      return team.name !== ((this.state.activeTeam as unknown) as Team).name;
    });

    this.setState({
      isFinished: nextPlayedTurns / this.props.teams.length === MAX_ROUNDS,
      currentWord: '',
      activeTeam: nextActiveTeam,
      playedTurns: nextPlayedTurns,
      score: updatedScore,
      hints: []
    });
  };

  setHints = (hints: string[]) => {
    this.setState({ hints });
  };

  endGame = () => {
    console.log('endGame');
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
        ) : (
          <>
            <div>
              {!this.state.isFinished && (
                <p className={styles.RoundIndicator}>
                  Runde {Math.ceil((this.state.playedTurns + 1) / this.props.teams.length)}
                </p>
              )}
              {this.state.currentWord ? (
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
                    <div className={classNames(styles.Footer, styles.FooterScore)}>
                      <Button
                        className="MuiButton-containedRight"
                        variant={'contained'}
                        onClick={() => this.endTurn(true)}
                      >
                        <Check style={{ color: 'white' }} />
                        Richtig
                      </Button>
                      <Button
                        className="MuiButton-containedWrong"
                        variant={'contained'}
                        onClick={() => this.endTurn(false)}
                      >
                        <Clear style={{ color: 'white' }} />
                        Falsch
                      </Button>
                    </div>
                  </>
                )
              ) : this.state.isFinished ? (
                <>
                  <GameResult teams={this.props.teams} score={this.state.score}/>
                  <div className={styles.Footer}>
                    <Button variant={'contained'} color={'primary'} onClick={this.endGame}>
                      Ok
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Macht euch bereit:{' '}
                    <strong className={styles.Action}>
                      {this.state.activeTeam && ((this.state.activeTeam as unknown) as Team).name}
                    </strong>
                  </p>
                  <div className={styles.Footer}>
                    <Button variant={'contained'} color={'primary'} onClick={this.startTurn}>
                      Start
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default JustOneGame;
