import React from 'react';
import styles from './GameFlow.module.css';
import { getRandomItem } from '../../services/utils/array';
import Team from '../../interfaces/Team';
import Scoring from '../Scoring';

import { Button } from '@material-ui/core';
import { GameState } from '../../interfaces/Game';
import { getOtherTeam } from '../../services/utils/team';
import { Props as GameDescriptionProps } from '../GameDescription';
import GameResult from '../GameResult';
import Countdown from '../Countdown';

export interface Props {
  teams: Team[];
  rounds: number;
  showScoring?: boolean;
  showCountdown?: boolean;
  gameMode?: GameMode;
  countdown?: number;
  showStartCountdown?: boolean;
  descriptionComponent: React.ReactElement<GameDescriptionProps>;
  playingComponent: React.ReactNode;
  onEndGame: (teams: Team[]) => void;
  onStartPlaying: () => void;
  onPausePlaying?: () => void;
  onContinuePlaying?: () => void;
  onCountdown?: () => void;
}

export enum GameMode {
  BATTLE,
  ROUNDS,
}

enum TurnPhase {
  PREPARING,
  PLAYING,
}

export interface State {
  activeTeam: undefined | Team;
  currentTurn: number;
  turnPhase: TurnPhase;
  gameState: GameState;
  score: Map<number, number>;
}

class GameFlow extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    gameMode: GameMode.BATTLE,
    showScoring: true,
    showCountdown: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTeam: props.gameMode === GameMode.ROUNDS ? getRandomItem(props.teams) : undefined,
      currentTurn: 1,
      turnPhase: TurnPhase.PREPARING,
      score: new Map(props.teams.map(team => [team.id, 0])),
      gameState: GameFlow.getNextGameState(null),
    };
  }

  static getNextGameState = (lastGameState: null | GameState): GameState => {
    switch (lastGameState) {
      case GameState.DESCRIPTION:
        return GameState.PLAYING;
      case GameState.PLAYING:
        return GameState.RESULT;
      case null:
      default:
        return GameState.DESCRIPTION;
    }
  };

  setNextGameState = (): void => {
    this.setState(lastState => ({
      ...lastState,
      gameState: GameFlow.getNextGameState(lastState.gameState),
    }));
  };

  startPlaying = (): void => {
    this.setState({
      turnPhase: TurnPhase.PLAYING,
    });
    this.props.onStartPlaying();
  };

  getCurrentRoundNumber = (): number => {
    return this.props.gameMode === GameMode.BATTLE
      ? this.state.currentTurn
      : this.state.currentTurn / this.props.teams.length;
  };

  getNextActiveTeam = (): Team => {
    return getOtherTeam(this.props.teams, this.state.activeTeam.id);
  };

  setTeamPoints = (teamId: number): void => {
    const score = this.state.score;
    score.set(teamId, score.get(teamId) + 1);
    this.setState({
      score,
    });
  };

  endTurn = (teamId: null | number): void => {
    if (!!teamId) {
      this.setTeamPoints(teamId);
    }

    if (this.getCurrentRoundNumber() < this.props.rounds) {
      this.setState({
        activeTeam: this.props.gameMode === GameMode.ROUNDS ? this.getNextActiveTeam() : null,
        currentTurn: this.state.currentTurn + 1,
        turnPhase: TurnPhase.PREPARING,
      });
    } else {
      this.setState({
        gameState: GameState.RESULT,
      });
    }
  };

  renderPreparing(): JSX.Element {
    return (
      <>
        <p>
          Macht euch bereit
          {this.props.gameMode === GameMode.ROUNDS && (
            <>
              {': '}
              <strong className={styles.Action}>
                {this.state.activeTeam && ((this.state.activeTeam as unknown) as Team).name}
              </strong>
            </>
          )}
        </p>
        <div className={styles.Footer}>
          <Button variant={'contained'} color={'primary'} onClick={this.startPlaying}>
            Start
          </Button>
        </div>
      </>
    );
  }

  renderPlayTurn = (): JSX.Element => {
    const { playingComponent, teams, showScoring, countdown, onCountdown, showCountdown } = this.props;
    const { activeTeam } = this.state;

    return (
      <>
        {playingComponent}
        {!!countdown && showCountdown && (
          <Countdown
            started={true}
            className={styles.Countdown}
            time={countdown * 1000}
            countdownCallback={onCountdown}
            onEnd={(): void => this.endTurn(!!activeTeam ? this.getNextActiveTeam().id : undefined)}
          />
        )}
        {showScoring && (
          <Scoring onScored={this.endTurn} teams={teams} activeTeamId={!!activeTeam ? activeTeam.id : undefined} />
        )}
      </>
    );
  };

  renderTurn = (): JSX.Element => {
    const currentTurn = Math.ceil(this.getCurrentRoundNumber());
    return (
      <>
        <p className={styles.RoundIndicator}>Runde {currentTurn}</p>
        {this.state.turnPhase === TurnPhase.PREPARING ? this.renderPreparing() : this.renderPlayTurn()}
      </>
    );
  };

  renderResult = (): JSX.Element => {
    const { onEndGame } = this.props;
    const newTeams = this.props.teams.map(team => ({
      ...team,
      points: team.points + this.state.score.get(team.id),
    }));

    return <GameResult teams={this.props.teams} score={this.state.score} endGame={(): void => onEndGame(newTeams)} />;
  };

  renderDescription = (): JSX.Element => {
    const { descriptionComponent } = this.props;
    return React.cloneElement(descriptionComponent, {
      ...descriptionComponent.props,
      onStart: () => this.setNextGameState(),
    });
  };

  render(): JSX.Element {
    let componentToRender: React.ReactNode = null;
    switch (this.state.gameState) {
      case GameState.DESCRIPTION:
        componentToRender = this.renderDescription();
        break;
      case GameState.PLAYING:
        componentToRender = this.renderTurn();
        break;
      case GameState.RESULT:
      default:
        componentToRender = this.renderResult();
    }

    return <div className={styles.GameFlow}>{componentToRender}</div>;
  }
}

export default GameFlow;
