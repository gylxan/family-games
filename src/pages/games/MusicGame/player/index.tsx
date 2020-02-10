import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import classNames from 'classnames';

import GameDescription, { Props as GameDescriptionProps } from '../../../../components/GameDescription';
import GameFlow from '../../../../components/GameFlow';
import { GameMode } from '../../../../components/GameFlow/GameFlow';

import { getStorageElementURLs } from '../../../../services/utils/firebaseStorage';
import { getRandomIndex } from '../../../../services/utils/array';

import styles from './MusicGame.module.css';

const MAX_ROUNDS = 2;

export interface State {
  hasData: boolean;
  isAudioPlaying: boolean;
}

class MusicGame extends React.PureComponent<State> {
  state = {
    hasData: false,
    isAudioPlaying: false,
  };
  tracks: string[];
  audio: HTMLAudioElement = new Audio();

  componentDidMount(): void {
    this.loadTracks();
  }

  loadTracks = (): void => {
    getStorageElementURLs('audio').then(audioURLs => {
      this.tracks = audioURLs;
      this.setState({
        hasData: true,
      });
    });
  };

  startPlaying = (): void => {
    this.audio.src = this.tracks.splice(getRandomIndex(this.tracks), 1)[0];
    this.setState({
      isAudioPlaying: false,
    });
  };

  toggleAudio = (): void => {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.setState({
      isAudioPlaying: !this.audio.paused,
    });
  };

  renderGamePlay(): JSX.Element {
    return (
      <>
        <Button
          autoFocus
          className={classNames(styles.PlayButton, { [styles.PlayButtonPlaying]: this.state.isAudioPlaying })}
          onClick={this.toggleAudio}
        >
          {this.state.isAudioPlaying ? (
            <PauseCircleFilled style={{ color: 'white' }} />
          ) : (
            <PlayCircleFilled style={{ color: 'white' }} />
          )}
        </Button>
      </>
    );
  }

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
          <strong>Beschreibung:</strong> Den Teams werden abwechselnd die ersten 10 Sekunden eines Hits der 70er / 80er
          / 90er vorgespielt. Das Team hat 30 Sekunden um eine Antwort zu geben.
          <br />
          Es werden 8 Runden gespielt.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Juke-Box</h1>
        {this.state.hasData ? (
          <GameFlow
            rounds={MAX_ROUNDS}
            showScoring
            onStartPlaying={this.startPlaying}
            descriptionComponent={this.renderGameDescription()}
            playingComponent={this.renderGamePlay()}
            gameMode={GameMode.BATTLE}
          />
        ) : (
          <LinearProgress className={styles.ProgressBar} />
        )}
      </>
    );
  }
}

export default MusicGame;
