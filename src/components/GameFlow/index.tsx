import React from 'react';
import styles from './GameFlow.module.css';
import { getRandomItem } from '../../services/utils/array';
import Team from '../../interfaces/Team';
import Countdown from '../Countdown';

import { Button } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
import classNames from 'classnames';

export interface Props {
  teams: Team[];
  rounds: number;
  children: React.ReactNode;
  isRating: boolean;
  onEndGame: (result: number[]) => void;
  onStartTurn: () => void;
}

export interface State {
  isFinished: boolean;
  activeTeam: undefined | Team;
  playedTurns: number;
  isTurnStarted: boolean;
  score: number[];
}

class GameFlow extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTeam: getRandomItem(this.props.teams),
      isFinished: false,
      playedTurns: 0,
      isTurnStarted: false,
      score: this.props.teams.map(() => 0),
    };
  }

  startTurn = (): void => {
    this.setState({
      isTurnStarted: true,
    });
    this.props.onStartTurn();
  };

  endTurn = (isSuccess: boolean): void => {
    const nextPlayedTurns = this.state.playedTurns + 1;

    const scoreIndex = this.props.teams.findIndex((team: Team) => {
      return isSuccess === (team.name === ((this.state.activeTeam as unknown) as Team).name);
    });
    const updatedScore = [...this.state.score];
    updatedScore[scoreIndex]++;

    if (nextPlayedTurns / this.props.teams.length < this.props.rounds) {
      const nextActiveTeam = this.props.teams.find((team: Team) => {
        return team.name !== ((this.state.activeTeam as unknown) as Team).name;
      });

      this.setState({
        activeTeam: nextActiveTeam,
        playedTurns: nextPlayedTurns,
        score: updatedScore,
        isTurnStarted: false,
      });
    } else {
      this.props.onEndGame(updatedScore);
    }
  };

  render(): JSX.Element {
    return (
      <>
        <p className={styles.RoundIndicator}>
          Runde {Math.ceil((this.state.playedTurns + 1) / this.props.teams.length)}
        </p>
        {this.state.isTurnStarted ? (
          <>
            {this.props.children}
            {this.props.isRating && (
              <>
                <Countdown
                  className={styles.Countdown}
                  started={true}
                  time={60000}
                  onlySmallCountdown={true}
                  onEnd={(): void => this.endTurn(false)}
                />
                <div className={classNames(styles.Footer, styles.FooterRating)}>
                  <Button className="MuiButton-containedRight" variant={'contained'} onClick={() => this.endTurn(true)}>
                    <Check style={{ color: 'white' }} />
                    Richtig
                  </Button>
                  <Button
                    className="MuiButton-containedWrong"
                    variant={'contained'}
                    onClick={(): void => this.endTurn(false)}
                  >
                    <Clear style={{ color: 'white' }} />
                    Falsch
                  </Button>
                </div>
              </>
            )}
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
      </>
    );
  }
}

export default GameFlow;
