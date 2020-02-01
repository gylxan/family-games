import React from 'react';
import GameDescription from '../../../../components/GameDescription';
import { getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';
import logo from '../../../../assets/images/logo.png';
import fox from '../../../../assets/images/fox.jpg';

import styles from './Blur.module.css';
import { Button } from '@material-ui/core';

export enum GameState {
  Explaining,
  Started,
  Paused,
  Finished,
}
export interface Props {
  teams: Team[];
}

export interface State {
  gameState: GameState;
  currentImage: any;
  availableImages: any[];
  currentBlur: number;
}

const BLUR_STEPS = 5;
const BLUR_STEPS_MIN = 2;

const MAX_ROUNDS = 5;
const INTERVAL_SECONDS = 5;

const IMAGES = [logo, fox];

class Blur extends React.PureComponent<Props, State> {
  state = {
    gameState: GameState.Explaining,
    currentImage: null,
    availableImages: IMAGES,
    currentBlur: Blur.getInitialBlur(),
  };

  interval = null;

  static getInitialBlur = (): number => BLUR_STEPS * 10;

  startGame = (): void => {
    this.setState({
      gameState: GameState.Started,
    });
    this.startNextRound();
  };

  startNextRound = (): void => {
    this.setState({
      currentBlur: Blur.getInitialBlur(),
    });
    this.setRandomImage();
    this.startInterval();
  };

  setRandomImage = (): void => {
    const newImageIndex = getRandomIndex(this.state.availableImages);
    const newAvailableImages = [...this.state.availableImages];
    newAvailableImages.splice(newImageIndex, 1);
    this.setState({
      currentImage: this.state.availableImages[newImageIndex],
      availableImages: newAvailableImages,
    });
  };

  startInterval = (): void => {
    this.interval = window.setInterval(() => {
      if (this.state.currentBlur - this.getCurrentBlurStep(this.state.currentBlur) === 0) {
        this.stopInterval();
      }
      this.setState(prevProps => ({
        ...prevProps,
        currentBlur: prevProps.currentBlur - this.getCurrentBlurStep(prevProps.currentBlur),
      }));
    }, INTERVAL_SECONDS * 1000);
  };

  getCurrentBlurStep = (currentBlur: number): number => {
    if (currentBlur < 10) {
      return 1;
    } else if (currentBlur <= 20) {
      return BLUR_STEPS_MIN;
    }
    return BLUR_STEPS;
  };

  stopInterval = (): void => {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  };

  pauseGame = (): void => {
    this.setState({
      gameState: GameState.Paused,
    });
    this.stopInterval();
  };

  continueGame = (): void => {
    this.setState({
      gameState: GameState.Started,
    });
    this.startInterval();
  };

  quickForwardUnblur = (): void => {
    this.stopInterval();
    this.setState({
      currentBlur: 0,
    });
  };

  renderGame = (): JSX.Element => {
    return (
      <div className={styles.Game}>
        <img
          onClick={this.quickForwardUnblur}
          className={styles.BlurImage}
          alt="blur"
          src={this.state.currentImage}
          style={{ filter: `blur(${this.state.currentBlur}px)` }}
        />
        <div className="ButtonContainer">
          {this.state.currentBlur === 0 ? (
            <Button variant={'contained'} color={'primary'} onClick={this.startNextRound}>
              Nächstes
            </Button>
          ) : (
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={this.state.gameState !== GameState.Paused ? this.pauseGame : this.continueGame}
            >
              {this.state.gameState !== GameState.Paused ? 'Pause' : 'Weiter'}
            </Button>
          )}
        </div>
      </div>
    );
  };

  renderGameDescription = (): JSX.Element => {
    return (
      <GameDescription onStart={this.startGame}>
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
          <strong>Beschreibung:</strong> Es werden verschwommene Bilder von Objekten gezeigt. Diese werden innerhalb
          <strong> einer Minute</strong> immer klarer. Dabei gilt es die Objekte auf den Bildern so schnell wie möglich
          zu erraten. Das erste Team, welches den Begriff errät erhält einen Punkt.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    switch (this.state.gameState) {
      case GameState.Started:
      case GameState.Paused:
        return this.renderGame();
      case GameState.Explaining:
      default:
        return this.renderGameDescription();
    }
  }
}

export default Blur;
