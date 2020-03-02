import React from 'react';
import SlotMachine from '../../../components/SlotMachine';
import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';

import styles from './Tetris.module.css';
import classNames from 'classnames';

export interface State {
  countdown: number | undefined;
}

const MAX_ROUNDS = 3;
const POINTS_PER_ROUND = 1;
const COUNTDOWN_IN_MINUTES = 5;

class Tetris extends React.PureComponent {
  state = {
    countdown: undefined,
  };

  renderGameDescription = (): React.ReactElement<GameDescriptionProps> => {
    return (
      <GameDescription>
        <p>
          <strong>Teilnehmer:</strong> alle
        </p>
        <p>
          <strong>Modus:</strong> Battle
        </p>
        <p>
          <strong>Rundenzahl:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> Jedes Team bekommt pro Runde 3 Puzzle. Diese müssen innerhalb von{' '}
          <strong>{COUNTDOWN_IN_MINUTES} Minuten</strong> fertiggestellt werden. Das Team, das zuerst alle Puzzle
          fertiggestellt hat, drückt den Buzzer und gewinnt die Runde. Sollte kein Team innerhalb der Zeit fertig
          werden, gewinnt das Team mit den meisten fertigen Puzzlen.
        </p>
      </GameDescription>
    );
  };

  renderGamePlay(): JSX.Element {
    return (
      <div
        className={classNames(styles.SlotMachineContainer, this.state.countdown && styles.SlotMachineContainerFinished)}
      >
        <SlotMachine
          className={styles.SlotMachine}
          onEnd={(): void =>
            this.setState({
              countdown: COUNTDOWN_IN_MINUTES * 60,
            })
          }
        />
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <GameFlow
        rounds={MAX_ROUNDS}
        teamsLoseOnTimeEnd={false}
        pointsPerRound={POINTS_PER_ROUND}
        countdown={this.state.countdown}
        showScoring={this.state.countdown !== undefined}
        descriptionComponent={this.renderGameDescription()}
        playingComponent={this.renderGamePlay()}
        gameMode={GameMode.BATTLE}
        onStartPlaying={(): void => {
          this.setState({ countdown: undefined });
        }}
      />
    );
  }
}
export default Tetris;
