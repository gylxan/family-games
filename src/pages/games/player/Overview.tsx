import React, { CSSProperties } from 'react';
import styles from './Overview.module.css';
import { Game } from '../../../interfaces/Game';
import { Button } from '@material-ui/core';
import { getRandomItem } from '../../../services/utils/array';
import classNames from 'classnames';
import { LinkTo } from '../../../services/routes';
// @ts-ignore
import tada from '../../../assets/audio/tada.mp3';

export interface Props {
  games: Game[];
  push: (url: string) => void;
  goBack: () => void;
}
export interface State {
  activeGame: Game | null;
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
        activeGame: getRandomItem(this.props.games.filter(game => !game.alreadyPlayed)),
      });
    }, 250);
  };

  stopSlowingInterval = (): void => {
    if (this.slowingInterval) {
      window.clearTimeout(this.slowingInterval);
    }
  };

  redirectToGameAfterTimeout = (): void => {
    const { push } = this.props;
    const timeout = window.setTimeout(() => {
      window.clearTimeout(timeout);
      push(LinkTo.playerGame(this.state.activeGame.url));
    }, 3000);
  };

  startSlowingInterval = (time: number): void => {
    this.stopSlowingInterval();
    this.slowingInterval = window.setTimeout(() => {
      if (time < MAX_INTERVAL) {
        this.startSlowingInterval(time + START_INTERVAL);
        this.setState({
          activeGame: getRandomItem(this.props.games.filter(game => !game.alreadyPlayed)),
        });
      } else {
        this.stopSlowingInterval();
        this.setState({
          isStarted: false,
          isStopping: false,
        });
        this.redirectToGameAfterTimeout();
      }
    }, time);
  };

  render(): JSX.Element {
    return (
      <div className={styles.Container}>
        <div className={styles.Games}>
          {this.props.games.map((game: Game) => {
            const css: CSSProperties = {
              backgroundColor: !game.alreadyPlayed ? game.color : 'rgba(0,0,0,0.3)',
              color: game.alreadyPlayed && 'grey',
            };
            const isActiveGame = this.state.activeGame !== null && game.name === this.state.activeGame.name;
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

        <div className={styles.ControlBar}>
          <Button variant={'contained'} color={'secondary'} onClick={this.props.goBack}>
            Zurück
          </Button>
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
        {!this.state.isStarted && this.state.activeGame && <audio src={tada} autoPlay />}
      </div>
    );
  }
}

export default Overview;
