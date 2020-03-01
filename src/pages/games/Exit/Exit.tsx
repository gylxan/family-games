import React from 'react';
import GameDescription from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { Props as GameDescriptionProps } from '../../../components/GameDescription';
import { GameMode } from '../../../components/GameFlow/GameFlow';
import Countdown from '../../../components/Countdown';
import Team from '../../../interfaces/Team';
import styles from './Exit.module.css';
import { Button, TextField } from '@material-ui/core';
import { getExitAudio } from '../../../services/utils/firebaseStorage';

export interface Props {
  teams: Team[];
  onEndGame: (teams: Team[]) => void;
}

interface Score {
  [teamId: number]: string;
}

enum GamePhase {
  INTRODUCTION,
  GAMEFLOW,
}

const MAX_ROUNDS = 1;
const TIME_IN_MINUTES = 15;

export interface State {
  gamePhase: GamePhase;
  isTimeUp: boolean;
  score: Score;
}

class Exit extends React.PureComponent<Props, State> {
  state = {
    gamePhase: GamePhase.INTRODUCTION,
    isTimeUp: false,
    score: this.props.teams.reduce((scores: Score, team: Team) => ({ ...scores, [team.id]: `0` }), {}),
  };
  audio = new Audio();

  componentDidMount(): void {
    getExitAudio().then(track => {
      this.audio.src = track;
      this.audio.loop = true;
      this.audio.play();
    });
  }

  componentWillUnmount(): void {
    this.audio.pause();
    this.audio = null;
  }

  startGameFlow = (): void => {
    this.setState({
      gamePhase: GamePhase.GAMEFLOW,
    });
  };

  setScore = (): void => {
    const newTeams = this.props.teams.map(team => ({
      ...team,
      points: team.points + parseInt(this.state.score[team.id]),
    }));
    this.props.onEndGame(newTeams);
  };

  updateScore = (event: React.ChangeEvent<HTMLInputElement>, teamId: number): void => {
    const value = event.currentTarget.value;
    this.setState(prevState => ({
      score: {
        ...prevState.score,
        [teamId]: value,
      },
    }));
  };

  setIsTimeUp = (): void => {
    this.audio.pause();
    this.setState({
      isTimeUp: true,
    });
  };

  renderIntroduction(): JSX.Element {
    return (
      <div className={styles.Introduction}>
        <span className={styles.FakeCountdown}>{TIME_IN_MINUTES}:00</span>
        <p>
          Ihr seid mit eurer Familie in ein Haus im Sauerland gefahren. Nachdem ihr einen schönen gemeinsamen Tag
          verbracht habt, spielt ihr am Abend Familien-Spiele. Ihr startet ein Computerprogramm, das euch zunächst
          einige harmlose Spiele vorschlägt.
        </p>
        <p>
          Doch plötzlich öffnet sich das Spiel mit dem Namen &bdquo;EXIT&rdquo;. Ihr hört unheimliche Musik, das Licht
          beginnt zu flackern und ein Timer mit <strong>{TIME_IN_MINUTES} Minuten</strong> erscheint.
        </p>
        <Button autoFocus variant={'contained'} color={'primary'} onClick={this.startGameFlow}>
          Regeln
        </Button>
      </div>
    );
  }

  renderDescription(): React.ReactElement<GameDescriptionProps> {
    return (
      <GameDescription>
        <p>
          <strong>Teilnehmer:</strong> alle
        </p>
        <p>
          <strong>Modus:</strong> Battle
        </p>
        <p>
          <strong>Rundenzahl je Team:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong> Beschreibung:</strong> Jedes Team erhält 4 Umschläge. In den Umschlägen befinden sich Rätsel und 2
          Hinweise um diese Rätsel zu lösen. Gesucht wird entweder ein Lösungswort oder ein Zahlencode. Beide Teams
          versuchen innerhalb von <strong>{TIME_IN_MINUTES} Minuten</strong> so viele Rätsel zu lösen wie möglich. Jedes
          gelöste Rätsel bringt 2 Punkte, wurde ein Hinweis benutzt, wird 1 Punkt abgezogen.
        </p>
      </GameDescription>
    );
  }

  renderGamePlay(): JSX.Element {
    return (
      <>
        {this.state.isTimeUp ? (
          <>
            <div className={styles.Row}>
              {this.props.teams.map((team: Team) => (
                <div className={styles.TeamColumn} key={team.id}>
                  <small className={styles.TeamName}>{team.name}</small>
                  <TextField
                    type="number"
                    className={styles.TeamInput}
                    value={this.state.score[team.id]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.updateScore(e, team.id)}
                  />
                </div>
              ))}
            </div>
            <Button autoFocus variant={'contained'} color={'primary'} onClick={this.setScore}>
              Punkte vergeben
            </Button>
          </>
        ) : (
          <Countdown started={true} time={TIME_IN_MINUTES * 60000} onEnd={this.setIsTimeUp} />
        )}
      </>
    );
  }

  render(): JSX.Element {
    return (
      <>
        <h1>Exit</h1>
        {this.state.gamePhase === GamePhase.INTRODUCTION ? (
          this.renderIntroduction()
        ) : (
          <GameFlow
            rounds={MAX_ROUNDS}
            showScoring={false}
            descriptionComponent={this.renderDescription()}
            playingComponent={this.renderGamePlay()}
            gameMode={GameMode.BATTLE}
          />
        )}
      </>
    );
  }
}

export default Exit;
