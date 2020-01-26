import React from 'react';
import styles from './JustOneGame.module.css';
import GameDescription from '../../../../components/GameDescription';
import { getRandomItem, getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';
import { Button } from '@material-ui/core';

export interface Props {
  teams: Team[];
}

export interface State {
  isStarted: boolean;
  isFinished: boolean;
  isExplaining: boolean;
  activeTeam: undefined | Team;
  currentRound: number;
  currentWord: string;
  score: number[];
}

const MAX_ROUNDS = 4;

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
    currentRound: 0,
    currentWord: '',
    score: []
  };

  availableWords: string[] = [...WORDS];
  turnsInRound: number = 0;

  startGame = () => {
    this.setState({
      isStarted: true,
      activeTeam: getRandomItem(this.props.teams),
      score: this.props.teams.map(() => 0)
    });
  };

  startTurn = () => {
    this.turnsInRound++;
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
    let nextCurrentRound = this.state.currentRound;
  
    const scoreIndex = this.props.teams.findIndex((team: Team) => {
      return isSuccess === (team.name === ((this.state.activeTeam as unknown) as Team).name);
    });
    const updatedScore = [...this.state.score];
    updatedScore[scoreIndex]++;

    const nextActiveTeam = this.props.teams.find((team: Team) => {
      return team.name !== ((this.state.activeTeam as unknown) as Team).name;
    });

    if (this.turnsInRound === this.props.teams.length && nextCurrentRound < MAX_ROUNDS) {
      this.turnsInRound = 0;
      nextCurrentRound++;
    }

    this.setState({
      isFinished: nextCurrentRound === MAX_ROUNDS,
      currentWord: '',
      activeTeam: nextActiveTeam,
      currentRound: Math.min(nextCurrentRound, MAX_ROUNDS - 1),
      score: updatedScore
    });
  };

  render(): JSX.Element {
    return (
      <>
        <h1>&raquo;Just One&laquo;</h1>
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
              <strong>eines Worts</strong> auf einen Zettel schreiben und den Game Mastern übergeben. Anschließend haben
              die Ratenden 1 Minute Zeit, den Begriff zu erraten.
              <br />
              Achtung: Alle mehrfachen Hinweise werden entfernt.
            </p>
          </GameDescription>
        ) : (
          <>
            <div className={styles.JustOneGame}>
              <p>Runde {this.state.currentRound + 1}</p>
              {this.state.currentWord ? (
                this.state.isExplaining ? (
                  <>
                    <p>
                      Erklärt den Begriff: <strong>{this.state.currentWord}</strong>
                    </p>
                    <Button variant={'contained'} color={'primary'} onClick={this.startGuessing}>
                      Fertig
                    </Button>
                  </>
                ) : (
                  <>
                    <p>Raten den Begriff zu diesen Wörtern</p>
                    <Button variant={'contained'} color={'primary'} onClick={() => this.endTurn(true)}>
                      Richtig
                    </Button>
                    <Button variant={'contained'} color={'secondary'} onClick={() => this.endTurn(false)}>
                      Falsch
                    </Button>
                  </>
                )
              ) : (
                this.state.isFinished ? (
                  <>
                    Endstand: 
                    <ul>
                      {this.props.teams.map((team, index) => {
                      return (<li key={index}>{team.name}:{this.state.score[index]}</li>);
                    })}
                    </ul>
                  </>
                ) : (
                <>
                  <p>
                    Macht euch bereit:{' '}
                    <strong>{this.state.activeTeam && ((this.state.activeTeam as unknown) as Team).name}</strong>
                  </p>
                  <Button variant={'contained'} color={'primary'} onClick={this.startTurn}>
                    Start
                  </Button>
                </>
                )
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default JustOneGame;
