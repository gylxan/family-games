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
import classNames from 'classnames';
import { PanTool } from '@material-ui/icons';

export interface Props {
  teams: Team[];
  rounds: number;
  pointsPerRound?: number;
  showScoring?: boolean;
  showCountdown?: boolean;
  showRoundIndicator?: boolean;
  gameMode?: GameMode;
  countdown?: number;
  showStartCountdown?: boolean;
  teamsLoseOnTimeEnd?: boolean;
  showCountdownBetweenTeams?: boolean;
  descriptionComponent: React.ReactElement<GameDescriptionProps>;
  playingComponent: React.ReactNode;
  onEndGame: (teams: Team[]) => void;
  onStartPlaying?: () => void;
  onEndTurn?: () => void;
  onCountdown?: (secondsRemaining: number) => void;
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
  showStop: boolean;
}

class GameFlow extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    gameMode: GameMode.BATTLE,
    showScoring: true,
    showCountdown: true,
    showRoundIndicator: true,
    teamsLoseOnTimeEnd: true,
    pointsPerRound: 1,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTeam: props.gameMode === GameMode.ROUNDS ? getRandomItem(props.teams) : undefined,
      currentTurn: 1,
      turnPhase: TurnPhase.PREPARING,
      score: new Map(props.teams.map(team => [team.id, 0])),
      gameState: GameFlow.getNextGameState(null),
      showStop: false,
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

    if (this.props.onStartPlaying) {
      this.props.onStartPlaying();
    }
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
    score.set(teamId, score.get(teamId) + this.props.pointsPerRound);
    this.setState({
      score,
    });
  };

  endTurn = (teamId: null | number): void => {
    if (!!teamId) {
      this.setTeamPoints(teamId);
    }
    this.setState({
      showStop: false,
    });

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

    if (this.props.onEndTurn) {
      this.props.onEndTurn();
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
          <Button autoFocus variant={'contained'} color={'primary'} onClick={this.startPlaying}>
            Start
          </Button>
        </div>
      </>
    );
  }

  renderPlayTurn = (): JSX.Element => {
    const {
      playingComponent,
      teams,
      showScoring,
      countdown,
      onCountdown,
      showCountdown,
      teamsLoseOnTimeEnd,
      showCountdownBetweenTeams,
    } = this.props;
    const { activeTeam } = this.state;

    return (
      <>
        {playingComponent}
        {!!countdown &&
          showCountdown &&
          (!this.state.showStop ? (
            <Countdown
              started={true}
              className={classNames(styles.Countdown, {
                [styles.CountdownBetweenTeams]: !activeTeam || showCountdownBetweenTeams,
              })}
              time={countdown * 1000}
              countdownCallback={onCountdown}
              onEnd={(): void => {
                if (teamsLoseOnTimeEnd) {
                  this.endTurn(!!activeTeam ? this.getNextActiveTeam().id : undefined);
                } else {
                  this.setState({
                    showStop: true,
                  });
                }
              }}
            />
          ) : (
            <PanTool className={styles.Stop} style={{ color: 'white' }} />
          ))}
        {showScoring && (
          <Scoring
            onScored={this.endTurn}
            teams={teams}
            activeTeamId={!!activeTeam ? activeTeam.id : undefined}
            showSkipOption={!(countdown && showCountdown) && !activeTeam}
          />
        )}
      </>
    );
  };

  renderTurn = (): JSX.Element => {
    const { showRoundIndicator } = this.props;
    const isPreparingTurnPhase = this.state.turnPhase === TurnPhase.PREPARING;

    const currentTurn = Math.ceil(this.getCurrentRoundNumber());
    return (
      <>
        {(showRoundIndicator || (!showRoundIndicator && isPreparingTurnPhase)) && (
          <p className={styles.RoundIndicator}>Runde {currentTurn}</p>
        )}
        {isPreparingTurnPhase ? this.renderPreparing() : this.renderPlayTurn()}
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
