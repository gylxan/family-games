import React, { CSSProperties } from 'react';
import styles from './Overview.module.css';
import { Game } from '../../../interfaces/Game';
import { Button } from '@material-ui/core';
import { getRandomItem } from '../../../services/utils/array';
import classNames from 'classnames';
import { LinkTo, Routes } from '../../../services/routes';
import { getPlayedGames, hasAllGamesPlayed } from '../../../services/utils/game';
import { getGameOverviewAudios } from '../../../services/utils/firebaseStorage';
import { EXIT_NAME, HOLZMARKT_NAME, STATIC_GAMES } from '../../../services/constants/game';

// @ts-ignore
import electritySound from '../../../assets/electricity.wav';
// @ts-ignore
import shutdownSound from '../../../assets/shutdown.mp3';
// @ts-ignore
import startupSound from '../../../assets/startup.wav';
// @ts-ignore
import evilSound from '../../../assets/evil-sound.mp3';

const GAMES_BEFORE_EXIT = 5;

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
  exitGameShowStarted: boolean;
  showOverlay: boolean;
  showExitGame: boolean;
  showOverview: boolean;
}

const START_INTERVAL = 100;
const MAX_INTERVAL = 1100;

class Overview extends React.PureComponent<Props, State> {
  state = {
    audio: null,
    activeGame: null,
    isStarted: false,
    isStopping: false,
    exitGameShowStarted: false,
    showOverlay: false,
    showOverview: true,
    showExitGame: false,
  };
  interval: undefined | number = undefined;
  timeout: undefined | number = undefined;
  slowingInterval: undefined | number = undefined;
  audio = new Audio();

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

    if (getPlayedGames(this.props.games).length === GAMES_BEFORE_EXIT) {
      this.stopInterval();
      this.setState({
        exitGameShowStarted: true,
        isStarted: false,
        isStopping: false,
      });
      this.startExitGameShow();
    }
  };

  startExitGameShow = (): void => {
    this.audio.loop = false;
    this.audio.src = electritySound;
    this.audio.play();
    this.audio.onended = (): void => this.startShutdown();
  };

  startShutdown = (): void => {
    this.audio.onended = (): void => this.startStartup();
    this.audio.src = shutdownSound;
    this.setState({
      showOverlay: true,
    });
    this.audio.play();
  };

  startStartup = (): void => {
    this.audio.onended = null;
    this.timeout = window.setTimeout(() => {
      this.audio.src = startupSound;
      this.setState({
        showOverlay: false,
        showOverview: false,
      });
      this.audio.onended = (): void => this.showExitGame();
      this.audio.play();
      window.clearTimeout(this.timeout);
    }, 3000);
  };

  showExitGame = (): void => {
    const { push } = this.props;
    this.audio.src = evilSound;
    this.setState({
      showExitGame: true,
    });
    this.audio.play();
    this.audio.onended = (): void => {
      push(LinkTo.playerGame(STATIC_GAMES.find(game => game.name === EXIT_NAME).url));
    };
  };

  stopSlowingInterval = (): void => {
    if (this.slowingInterval) {
      window.clearTimeout(this.slowingInterval);
    }
  };

  getRandomGame = (): Game => {
    let notPlayedGames = this.props.games.filter(game => !game.alreadyPlayed);
    // Filter the holzmarkt game until we have played at least the half of all games
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

  getGameCssProperties = (game: Game, index: number, isActiveGame: boolean): CSSProperties => {
    const { isShownFirst } = this.props;
    const { exitGameShowStarted } = this.state;
    const css: CSSProperties = {};
    if (!game.alreadyPlayed) {
      css.backgroundColor = game.color;
    }

    if (isActiveGame) {
      css.boxShadow = `0 0 10px 10px rgba(255,255,255,0.5)`;
    }
    if (isShownFirst) {
      css.animationDelay = `${(index + 1) * 0.5}s`;
    }
    if (exitGameShowStarted) {
      css.animationIterationCount = 'infinite';
    }
    return css;
  };

  renderGameTile = (game: Game, index: number): JSX.Element => {
    const { isShownFirst } = this.props;
    const { exitGameShowStarted } = this.state;
    const isActiveGame = this.state.activeGame !== null && game.name === this.state.activeGame.name;
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
          {
            [styles.AlreadyPlayed]: game.alreadyPlayed,
          },
          { animated: isShownFirst || exitGameShowStarted },
          { fadeIn: isShownFirst },
          { flash: exitGameShowStarted },
        )}
        style={this.getGameCssProperties(game, index, isActiveGame)}
      >
        {game.name}
      </div>
    );
  };

  render(): JSX.Element {
    const { exitGameShowStarted, showExitGame } = this.state;
    return (
      <div className={styles.Container}>
        {showExitGame && (
          <div className={classNames(styles.Tile, styles.Active, styles.Chosen, styles.ExitGame)}>EXIT</div>
        )}
        {this.state.showOverview && (
          <>
            <div className={styles.Games}>
              {this.props.games.map((game: Game, index: number) => this.renderGameTile(game, index))}
            </div>

            <div className={styles.ControlBar}>
              <Button
                className={classNames(
                  styles.StartButton,
                  { animated: exitGameShowStarted },
                  { hinge: exitGameShowStarted },
                )}
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
          </>
        )}
        {!this.state.isStarted && this.state.activeGame && this.state.audio && (
          <audio src={this.state.audio} autoPlay />
        )}
        {this.state.showOverlay && <div className={classNames(styles.Overlay, 'animated', 'fadeIn')} />}
      </div>
    );
  }
}

export default Overview;
