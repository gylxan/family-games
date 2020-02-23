import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import classNames from 'classnames';

import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';
import { GameMode } from '../../../components/GameFlow/GameFlow';

import { getStorageElementURLs } from '../../../services/utils/firebaseStorage';
import { getRandomIndex } from '../../../services/utils/array';

import styles from './JukeBox.module.css';

const MAX_ROUNDS = 5;

export interface State {
  hasData: boolean;
  isAudioPlaying: boolean;
}

class JukeBox extends React.PureComponent<State> {
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
    getStorageElementURLs('audio/juke-box').then(audioURLs => {
      this.tracks = audioURLs;
      this.setState({
        hasData: true,
      });
    });
  };

  startPlaying = (): void => {
    this.audio.src = this.tracks.splice(getRandomIndex(this.tracks), 1)[0];
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
          <strong>Beschreibung:</strong> In jeder Runde wird max. eine Minute eines Hits der 70er, 80er oder 90er
          vorgespielt. Wer das Lied erkennt drückt auf den Buzzer. Daraufhin wird das Lied pausiert und das Team, das
          als erstes gebuzzt hat, darf eine Antwort geben. Für eine richtige Antwort erhält das Team einen Punkt und die
          Runde ist beendet. Bei einer falschen Antwort, erhält das gegnerische Team die Möglichkeit zu lösen. Können
          oder wollen beide Teams nicht auflösen, läuft das Lied weiter.
          <br />
          Es werden {MAX_ROUNDS} Runden gespielt.
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
            onEndTurn={this.endAudio}
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

export default JukeBox;
