import React from 'react';
import { Button } from '@material-ui/core';
import classNames from 'classnames';

import { Game } from '../../../interfaces/Game';
import { getRandomItem } from '../../../services/utils/array';
import { LinkTo, Routes } from '../../../services/routes';
import { getPlayedGames, hasAllGamesPlayed } from '../../../services/utils/game';
import { getGameOverviewAudios } from '../../../services/utils/firebaseStorage';
import { EXIT_GAME, HOLZMARKT_NAME } from '../../../services/constants/game';
import Tile from './Tile';
import styles from './Overview.module.css';

const GAMES_BEFORE_EXIT = 5;

export interface Props {
  isShownFirst: boolean;
  isExitGamePlayed: boolean;
  games: Game[];
  push: (url: string) => void;
}

export interface State {
  activeGame: Game | null;
  audios: string[];
  isStarted: boolean;
  isStopping: boolean;
  isExitGameShowStarted: boolean;
  showOverlay: boolean;
  showExitGame: boolean;
  showOverview: boolean;
}

const START_INTERVAL = 100;
const MAX_INTERVAL = 1100;

class Overview extends React.PureComponent<Props, State> {
  state = {
    audios: [],
    activeGame: null,
    isStarted: false,
    isStopping: false,
    isExitGameShowStarted: false,
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
    getGameOverviewAudios().then(audios => {
      this.setState({
        audios,
      });
    });
  }

  getAudio = (name: string): string => this.state.audios.find(audio => audio.toLowerCase().indexOf(name) >= 0);

  isLastGame = (): boolean => getPlayedGames(this.props.games).length === this.props.games.length - 1;

  startRandomGameChoose = (): void => {
    const { games } = this.props;
    if (this.isLastGame()) {
      this.setState({
        activeGame: games.find(game => game.alreadyPlayed === false),
        isStarted: false,
      });
      this.redirectToGameAfterTimeout();
      return;
    }
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
    if (getPlayedGames(this.props.games).length === GAMES_BEFORE_EXIT && !this.props.isExitGamePlayed) {
      this.stopInterval();
      this.setState({
        isExitGameShowStarted: true,
        isStarted: false,
        isStopping: false,
      });
      this.startExitGameShow();
      return;
    }

    this.interval = window.setInterval(() => {
      this.setState({
        activeGame: this.getRandomGame(),
      });
    }, 250);
  };

  startExitGameShow = (): void => {
    this.audio.loop = false;
    this.audio.src = this.getAudio('electricity');
    this.audio.play();
    this.audio.onended = (): void => this.startShutdown();
  };

  startShutdown = (): void => {
    this.audio.onended = (): void => this.startStartup();
    this.audio.src = this.getAudio('shutdown');
    this.setState({
      showOverlay: true,
    });
    this.audio.play();
  };

  startStartup = (): void => {
    this.audio.onended = null;
    this.timeout = window.setTimeout(() => {
      this.audio.src = this.getAudio('startup');
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
    this.audio.src = this.getAudio('evil');
    this.setState({
      showExitGame: true,
    });
    this.audio.play();
    this.audio.onended = (): void => {
      this.timeout = window.setTimeout(() => {
        window.clearTimeout(this.timeout);
        push(LinkTo.playerGame(EXIT_GAME.url));
      }, 2000);
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

  render(): JSX.Element {
    const { isStarted, isExitGameShowStarted, showExitGame } = this.state;
    const { isShownFirst } = this.props;
    const isLastGame = this.isLastGame();
    return (
      <div className={styles.Container}>
        {showExitGame && <Tile game={EXIT_GAME} isChosen isActive className={styles.ExitGame} size="Large" />}
        {this.state.showOverview && (
          <>
            <div className={styles.Games}>
              {this.props.games.map((game: Game, index) => {
                const isActiveGame = this.state.activeGame !== null && game.name === this.state.activeGame.name;
                return (
                  <Tile
                    key={game.name}
                    game={game}
                    className={classNames(
                      { animated: isShownFirst || isExitGameShowStarted },
                      { fadeIn: isShownFirst },
                      { flash: isExitGameShowStarted },
                    )}
                    style={{
                      animationIterationCount: isExitGameShowStarted ? 'infinite' : '',
                      animationDelay: isShownFirst ? `${(index + 1) * 0.5}s` : '',
                    }}
                    isActive={isActiveGame}
                    isChosen={isActiveGame && !isStarted}
                  />
                );
              })}
            </div>

            <div className={styles.ControlBar}>
              <Button
                className={classNames(
                  styles.StartButton,
                  { animated: isExitGameShowStarted },
                  { hinge: isExitGameShowStarted },
                )}
                variant={'contained'}
                color={'primary'}
                disabled={
                  this.state.isStopping || (!this.state.isStarted && !this.state.isStopping && !!this.state.activeGame)
                }
                onClick={!this.state.isStarted ? this.startRandomGameChoose : this.stopRandomGameChoose}
              >
                {this.state.isStarted ? 'Stop' : isLastGame ? 'Letztes Spiel starten' : 'Spiel auswählen!'}
              </Button>
            </div>
          </>
        )}
        {!this.state.isStarted && this.state.activeGame && <audio src={this.getAudio('tada')} autoPlay />}
        {this.state.showOverlay && <div className={classNames(styles.Overlay, 'animated', 'fadeIn')} />}
      </div>
    );
  }
}

export default Overview;
