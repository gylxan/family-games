import React, { CSSProperties } from 'react';
import styles from './Overview.module.css';
import { Game } from '../../../interfaces/Game';
import { Button } from '@material-ui/core';
import { getRandomItem } from '../../../services/utils/array';
import classNames from 'classnames';
import { LinkTo, Routes } from '../../../services/routes';
import { hasAllGamesPlayed } from '../../../services/utils/game';
import { getGameOverviewAudios } from '../../../services/utils/firebaseStorage';
import { HOLZMARKT_NAME } from '../../../services/constants/game';

export interface Props {
  isShownFirst: boolean;
  games: Game[];
  push: (url: string) => void;
}

export interface State {
  activeGame: Game | null;
  audio: string | null;
  isStarted: boolean;
  isStopping: boolean;
}

const START_INTERVAL = 100;
const MAX_INTERVAL = 1100;

class Overview extends React.PureComponent<Props, State> {
  state = {
    audio: null,
    activeGame: null,
    isStarted: false,
    isStopping: false,
  };
  interval: undefined | number = undefined;
  slowingInterval: undefined | number = undefined;

  componentDidMount(): void {
    const { games, push } = this.props;
    if (hasAllGamesPlayed(games)) {
      push(Routes.AwardCeremony);
      return;
    }
    getGameOverviewAudios().then(
      audios =>
        audios.length &&
        this.setState({
          audio: audios[0],
        }),
    );
  }

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
        activeGame: this.getRandomGame(),
      });
    }, 250);
  };

  stopSlowingInterval = (): void => {
    if (this.slowingInterval) {
      window.clearTimeout(this.slowingInterval);
    }
  };

  getRandomGame = (): Game => {
    let notPlayedGames = this.props.games.filter(game => !game.alreadyPlayed);
    // Filter the holzmarkt game until we have played at least the halve of all games∏
    if (notPlayedGames.length > this.props.games.length / 2) {
      notPlayedGames = notPlayedGames.filter(game => game.name !== HOLZMARKT_NAME);
    }
    return getRandomItem(notPlayedGames);
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
          activeGame: this.getRandomGame(),
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
    const { isShownFirst } = this.props;
    return (
      <div className={styles.Container}>
        <div className={styles.Games}>
          {this.props.games.map((game: Game, index: number) => {
            const css: CSSProperties = {
              backgroundColor: !game.alreadyPlayed ? game.color : 'rgba(0,0,0,0.3)',
              color: game.alreadyPlayed && 'grey',
            };
            const isActiveGame = this.state.activeGame !== null && game.name === this.state.activeGame.name;
            if (isActiveGame) {
              css.boxShadow = `0 0 10px 10px rgba(255,255,255,0.5)`;
            }
            if (isShownFirst) {
              css.animationDelay = `${(index + 1) * 0.5}s`;
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
                  { animated: isShownFirst },
                  { fadeIn: isShownFirst },
                )}
                style={css}
              >
                {game.name}
              </div>
            );
          })}
        </div>

        <div className={styles.ControlBar}>
          <Button
            className={styles.StartButton}
            variant={'contained'}
            color={'primary'}
            disabled={
              this.state.isStopping || (!this.state.isStarted && !this.state.isStopping && !!this.state.activeGame)
            }
            onClick={!this.state.isStarted ? this.startRandomGameChoose : this.stopRandomGameChoose}
          >
            {this.state.isStarted ? 'Stop' : 'Spiel auswählen!'}
          </Button>
        </div>
        {!this.state.isStarted && this.state.activeGame && this.state.audio && (
          <audio src={this.state.audio} autoPlay />
        )}
      </div>
    );
  }
}

export default Overview;
