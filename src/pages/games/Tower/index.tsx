import React from 'react';
import { PanTool } from '@material-ui/icons';

import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';
import styles from './Tower.module.css';
import Countdown from '../../../components/Countdown';

export interface State {
  isTimeUp: boolean;
}

const MAX_ROUNDS = 1;
const POINTS_PER_ROUND = 5;
const TIME_IN_SECS = 420;

class Tower extends React.PureComponent<{}, State> {
  state = {
    isTimeUp: false,
  };

  end = (): void => {
    this.setState({
      isTimeUp: true,
    });
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
          <strong>Beschreibung:</strong> Ihr wollt hoch hinaus! Jedes Team hat 54 Holzblöcke und{' '}
          <strong>{TIME_IN_SECS / 60} Minuten</strong> Zeit einen Turm zu bauen. Das Team mit dem höchsten Turm gewinnt{' '}
          <strong>5 Punkte</strong>. Der Turm muss lang genug stehen, um gemessen werden zu können.
        </p>
      </GameDescription>
    );
  };

  renderGamePlay(): JSX.Element {
    return (
      <>
        {this.state.isTimeUp ? (
          <PanTool className={styles.Stop} style={{ color: 'white' }} />
        ) : (
          <Countdown started={true} time={TIME_IN_SECS * 1000} onEnd={this.end} />
        )}
      </>
    );
  }

  render(): JSX.Element {
    return (
      <GameFlow
        rounds={MAX_ROUNDS}
        pointsPerRound={POINTS_PER_ROUND}
        showScoring={this.state.isTimeUp}
        descriptionComponent={this.renderGameDescription()}
        playingComponent={this.renderGamePlay()}
        gameMode={GameMode.BATTLE}
      />
    );
  }
}

export default Tower;
