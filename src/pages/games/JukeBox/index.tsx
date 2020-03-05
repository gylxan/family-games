import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled, RemoveRedEye } from '@material-ui/icons';
import classNames from 'classnames';

import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';

import { getJukeboxStorageElements } from '../../../services/utils/firebaseStorage';
import { shuffle } from '../../../services/utils/array';

import styles from './JukeBox.module.css';

const MAX_ROUNDS = 10;

export interface State {
  hasData: boolean;
  isAudioPlaying: boolean;
  showSong: boolean;
  currentTrack: Track | null;
}

interface Track {
  url: string;
  name: string;
}

class JukeBox extends React.PureComponent<State> {
  state = {
    hasData: false,
    isAudioPlaying: false,
    showSong: false,
    currentTrack: null,
  };
  tracks: Track[];
  audio: HTMLAudioElement = new Audio();

  componentDidMount(): void {
    this.loadTracks();
  }

  getTrackName = (element: any): string => element.name.substr(0, element.name.lastIndexOf('.'));

  // TODO Maybe some things can be moved to the firebaseStorage?
  loadTracks = (): void => {
    getJukeboxStorageElements().then(elements => {
      const downloadUrls = elements.map(element => element.getDownloadURL());
      Promise.all(downloadUrls).then(urls => {
        const urlsAndTracks = urls.map((url: string, index: number) => ({
          url,
          name: this.getTrackName(elements[index]),
        }));
        this.tracks = shuffle(urlsAndTracks);

        this.setState({
          hasData: true,
        });
      });
    });
  };

  startPlaying = (): void => {
    this.setState({
      showSong: false,
    });
    const audio = this.tracks.shift();
    if (!!audio) {
      this.setState({
        currentTrack: audio,
      });
      this.audio.src = audio.url;
      this.toggleAudio();
    }
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
          <span>{this.state.currentTrack && this.state.currentTrack.name}</span>
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
          <strong>Rundenzahl:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> In jeder Runde wird ein Lied abgespielt. Die Teams versuchen gleichzeitig das
          Lied zu erraten. Zum Lösen wird der Buzzer verwendet. Bei einer falschen Antwort kann das gegnerische Team
          lösen.
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
