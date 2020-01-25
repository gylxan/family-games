import React, { CSSProperties } from 'react';
import styles from './Overview.module.css';
import { Game } from '../../../interfaces/Game';
import { Button } from '@material-ui/core';
import { getRandomItem } from '../../../services/array';
import classNames from 'classnames';

export interface Props {
  games: Game[];
}
export interface State {
  activeGame: string | null;
  isStarted: boolean;
  isStopping: boolean;
}
const START_INTERVAL = 100;
const MAX_INTERVAL = 1100;
class Overview extends React.PureComponent<Props, State> {
  state = {
    activeGame: null,
    isStarted: false,
    isStopping: false,
  };
  interval: undefined | number = undefined;
  slowingInterval: undefined | number = undefined;

  startRandomGameChoose = (): void => {
    this.setState({
      isStarted: true,
    });
    this.stopInterval();
    this.startInterval();
  };

  stopRandomGameChoose = (): void => {
    this.setState({
      isStopping: true,
    });
    this.stopInterval();
    this.startSlowingInterval(START_INTERVAL);
  };

  stopInterval = (): void => {
    if (!!this.interval) {
      window.clearInterval(this.interval);
    }
  };

  startInterval = (): void => {
    this.interval = window.setInterval(() => {
      this.setState({
        activeGame: getRandomItem(this.props.games).name,
      });
    }, 250);
  };

  stopSlowingInterval = (): void => {
    if (this.slowingInterval) {
      window.clearTimeout(this.slowingInterval);
    }
  };

  startSlowingInterval = (time: number): void => {
    this.stopSlowingInterval();
    this.slowingInterval = window.setTimeout(() => {
      if (time < MAX_INTERVAL) {
        this.setState({
          activeGame: getRandomItem(this.props.games).name,
        });
        this.startSlowingInterval(time + START_INTERVAL);
      } else {
        this.stopSlowingInterval();
        this.setState({
          isStarted: false,
          isStopping: false,
        });
      }
    }, time);
  };

  render(): JSX.Element {
    return (
      <div className={styles.Container}>
        <div className={styles.Games}>
          {this.props.games.map((game: Game) => {
            const css: CSSProperties = { backgroundColor: game.color };
            const isActiveGame = game.name === this.state.activeGame;
            if (isActiveGame) {
              css.boxShadow = `0 0 10px 10px rgba(255,255,255,0.5)`;
            }
            return (
              <div
                key={game.name}
                className={classNames(
                  styles.Tile,
                  {
                    [styles.Active]: isActiveGame,
                  },
                  {
                    [styles.Chosen]: isActiveGame && !this.state.isStarted,
                  },
                )}
                style={css}
              >
                {game.name}
              </div>
            );
          })}
        </div>

        <Button
          className={styles.StartButton}
          variant={'contained'}
          color={'primary'}
          disabled={this.state.isStopping}
          onClick={!this.state.isStarted ? this.startRandomGameChoose : this.stopRandomGameChoose}
        >
          {this.state.isStarted ? 'Stop' : 'Spiel auswählen!'}
        </Button>
      </div>
    );
  }
}

export default Overview;
