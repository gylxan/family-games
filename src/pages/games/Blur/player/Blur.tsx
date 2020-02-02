import React from 'react';
import GameDescription, { Props as GameDescriptionProps } from '../../../../components/GameDescription';
import { getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';
import logo from '../../../../assets/images/logo.png';
import fox from '../../../../assets/images/fox.jpg';

import styles from './Blur.module.css';
import { Button } from '@material-ui/core';
import GameFlow from '../../../../components/GameFlow';

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
  currentImage: any;
  availableImages: any[];
  currentBlur: number;
}

const BLUR_STEPS_MIN = 2;

const MAX_ROUNDS = 5;

const COUNTDOWN_IN_SECONDS = 60;

const IMAGES = [logo, fox];

class Blur extends React.PureComponent<Props, State> {
  state = {
    currentImage: null,
    availableImages: IMAGES,
    currentBlur: COUNTDOWN_IN_SECONDS,
  };

  startNextTurn = (): void => {
    this.setState({
      currentBlur: COUNTDOWN_IN_SECONDS,
    });
    this.setRandomImage();
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

  handleCountdown = (): void => {
    this.setState(prevProps => ({
      ...prevProps,
      currentBlur: prevProps.currentBlur - 1,
    }));
  };

  quickForwardUnblur = (): void => {
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
      </div>
    );
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
          <strong>Beschreibung:</strong> Es werden verschwommene Bilder von Objekten gezeigt. Diese werden innerhalb
          <strong> einer Minute</strong> immer klarer. Dabei gilt es die Objekte auf den Bildern so schnell wie möglich
          zu erraten. Das erste Team, welches den Begriff errät erhält einen Punkt.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    return (
      <GameFlow
        rounds={5}
        countdown={60}
        showScoring
        descriptionComponent={this.renderGameDescription()}
        playingComponent={this.renderGame()}
        onStartPlaying={this.startNextTurn}
        onCountdown={this.handleCountdown}
      />
    );
  }
}

export default Blur;
