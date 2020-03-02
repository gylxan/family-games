import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled, RemoveRedEye } from '@material-ui/icons';
import classNames from 'classnames';

import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';

import { getJukeboxAudios } from '../../../services/utils/firebaseStorage';
import { shuffle } from '../../../services/utils/array';

import styles from './JukeBox.module.css';

const MAX_ROUNDS = 10;

export interface State {
  hasData: boolean;
  isAudioPlaying: boolean;
  showSong: boolean;
}

class JukeBox extends React.PureComponent<State> {
  state = {
    hasData: false,
    isAudioPlaying: false,
    showSong: false,
  };
  tracks: string[];
  audio: HTMLAudioElement = new Audio();

  componentDidMount(): void {
    this.loadTracks();
  }

  loadTracks = (): void => {
    getJukeboxAudios().then(urls => {
      this.tracks = shuffle(urls);
      this.setState({
        hasData: true,
      });
    });
  };

  startPlaying = (): void => {
    this.setState({
      showSong: false,
    });
    this.audio.src = this.tracks.shift();
    this.toggleAudio();
  };

  endAudio = (): void => {
    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
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

  getCurrentSong = (): string => {
    const indexOfLastSlash = this.audio.src.lastIndexOf('%2F') + 3;
    const lengthToShow = this.audio.src.lastIndexOf('.') - indexOfLastSlash;
    return this.audio.src.substr(indexOfLastSlash, lengthToShow).replace(/%20/g, ' ');
  };

  handleShowSong = (): void => {
    this.setState({
      showSong: true,
    });
  };

  renderGamePlay(): JSX.Element {
    return (
      <>
        <Button
          autoFocus
          disableRipple
          className={classNames(styles.PlayButton, { [styles.PlayButtonPlaying]: this.state.isAudioPlaying })}
          onClick={this.toggleAudio}
        >
          {this.state.isAudioPlaying ? (
            <PauseCircleFilled style={{ color: 'white' }} />
          ) : (
            <PlayCircleFilled style={{ color: 'white' }} />
          )}
        </Button>
        {this.state.showSong ? (
          <span>{this.getCurrentSong()}</span>
        ) : (
          <Button color={'primary'} onClick={this.handleShowSong}>
            <RemoveRedEye style={{ color: 'white', fontSize: '4em' }} />
          </Button>
        )}
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
          <strong>Beschreibung:</strong> In jeder Runde wird ein Lied der letzten Jahrzehnte abgespielt. Die Teams
          spielen gleichzeitig und versuchen das Lied zu erraten. Zum Lösen wird der Buzzer verwendet. Bei einer
          richtigen Antwort ist die Runde beendet und das Team erhält einen Punkt. Bei einer falschen Antwort, erhält
          das gegnerische Team die Möglichkeit zu lösen. Können oder wollen beide Teams nicht auflösen, läuft das Lied
          weiter.
          <br />
          Es werden {MAX_ROUNDS} Runden gespielt.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    return this.state.hasData ? (
      <GameFlow
        rounds={MAX_ROUNDS}
        showScoring
        onStartPlaying={this.startPlaying}
        onEndTurn={this.endAudio}
        descriptionComponent={this.renderGameDescription()}
        playingComponent={this.renderGamePlay()}
        gameMode={GameMode.BATTLE}
      />
    ) : (
      <LinearProgress className={styles.ProgressBar} />
    );
  }
}

export default JukeBox;
