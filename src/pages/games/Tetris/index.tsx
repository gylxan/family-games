import React from 'react';
import SlotMachine from '../../../components/SlotMachine';
import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';

import styles from './Tetris.module.css';
import classNames from 'classnames';

export interface Props {}

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
          <strong>Beschreibung:</strong> Jedes Team bekommt pro Runde 3 Platten mit Formen. Diese Formen müssen mit
          Teilen ausgefüllt werden. Ihr {COUNTDOWN_IN_MINUTES} Minuten Zeit. Neben den Teilen sind Symbole, welche
          zufällig ermittelt werden und angeben, welche Teile ihr verwenden dürft. Ihr legt fest, welches Symbol ihr für
          welche Platte verwendet. Alle ermittelten Symbole müssen verwendet werden. Wenn ihr alle Platten fertig habt
          müsst ihr buzzern. Solltet ihr in der Zeit nicht fertig werden, gewinnt das Team mit den meisten fertigen
          Formen.
        </p>
      </GameDescription>
    );
  };

  renderGamePlay(): JSX.Element {
    return (
      <SlotMachine
        className={classNames(styles.SlotMachine, this.state.countdown && styles.SlotMachineFinished)}
        onEnd={(): void =>
          this.setState({
            countdown: COUNTDOWN_IN_MINUTES,
          })
        }
      />
    );
  }

  render(): JSX.Element {
    return (
      <>
        <h1 className={styles.Title}>Tetris</h1>
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
      </>
    );
  }
}
export default Tetris;
