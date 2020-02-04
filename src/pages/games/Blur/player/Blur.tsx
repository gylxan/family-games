import React from 'react';
import GameDescription, { Props as GameDescriptionProps } from '../../../../components/GameDescription';
import { getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';
import fox from '../../../../assets/images/fox.jpg';
import kicker from '../../../../assets/images/kicker.jpg';
import fliegenpilz from '../../../../assets/images/fliegenpilz.jpg';
import traktor from '../../../../assets/images/traktor.jpg';
import kuh from '../../../../assets/images/kuh.jpg';

import styles from './Blur.module.css';
import GameFlow from '../../../../components/GameFlow';

export interface Props {
  teams: Team[];
}

export interface State {
  currentImage: any;
  availableImages: any[];
  currentBlur: number;
}

const MAX_ROUNDS = 5;

const COUNTDOWN_IN_SECONDS = 60;

const IMAGES = [fox, kicker, fliegenpilz, traktor, kuh];

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

  handleCountdown = (secondsRemaining: number): void => {
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
          <strong> einer Minute</strong> immer klarer. Die Objekte auf den Bildern müssen so schnell wie möglich erraten
          werden. Das erste Team, welches den Begriff errät erhält einen Punkt.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    return (
      <GameFlow
        rounds={MAX_ROUNDS}
        countdown={60}
        showScoring
        showRoundIndicator={false}
        descriptionComponent={this.renderGameDescription()}
        playingComponent={this.renderGame()}
        onStartPlaying={this.startNextTurn}
        onCountdown={this.handleCountdown}
      />
    );
  }
}

export default Blur;
