import React, { CSSProperties } from 'react';
import styles from './Overview.module.css';
import { Game } from '../../../interfaces/Game';
import { Button } from '@material-ui/core';
import { getRandomItem } from '../../../services/array';

export interface Props {
  games: Game[];
}
export interface State {
  activeGame: string | null;
}

class Overview extends React.PureComponent<Props, State> {
  state = {
    activeGame: null,
  };
  interval: undefined | number = undefined;
  timeout: undefined | number = undefined;

  endTimeout = (): void => {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  };
  startRandomGameChoose = (): void => {
    this.endTimeout();
    this.timeout = window.setTimeout(() => {
      this.startInterval();
    }, 0);
  };

  stopRandomGameChoose = (): void => {
    this.endTimeout();
    this.endInterval();
  };

  endInterval = (): void => {
    if (!!this.interval) {
      window.clearInterval(this.interval);
    }
  };

  startInterval = (): void => {
    this.interval = window.setInterval(() => {
      this.setState({
        activeGame: getRandomItem(this.props.games).name,
      });
    }, 500);
  };

  render(): JSX.Element {
    return (
      <div className={styles.Container}>
        <div className={styles.Games}>
          {this.props.games.map((game: Game) => {
            const css: CSSProperties = { backgroundColor: game.color };
            if (game.name === this.state.activeGame) {
              css.boxShadow = `0 0 10px 10px rgba(255,255,255,0.5)`;
            }
            return (
              <div key={game.name} className={styles.Tile} style={css}>
                {game.name}
              </div>
            );
          })}
        </div>

        <Button
          className={styles.StartButton}
          variant={'contained'}
          color={'primary'}
          onClick={!this.timeout ? this.startRandomGameChoose : this.stopRandomGameChoose}
        >
          {!!this.timeout ? 'Stop' : 'Spiel auswählen!'}
        </Button>
      </div>
    );
  }
}

export default Overview;
