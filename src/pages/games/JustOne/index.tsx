import React from 'react';
import { Button } from '@material-ui/core';
import GameDescription from '../../../components/GameDescription';
import InputList from '../../../components/InputList';
import { getRandomIndex } from '../../../services/utils/array';
import GameFlow from '../../../components/GameFlow/';
import { Props as GameDescriptionProps } from '../../../components/GameDescription';
import { GameMode } from '../../../components/GameFlow/GameFlow';
import styles from './JustOneGame.module.css';

export interface State {
  playPhase: PlayingPhase;
  currentWord: string;
  hints: string[];
}

const MAX_ROUNDS = 3;
const WORDS = [
  'Bier',
  'Schokolade',
  'Schnee',
  'Krawatte',
  'Wind',
  'Asterix',
  'Roboter',
  'Komödie',
  'Sprache',
  'Friseur',
  'Mühle',
  'Dschungel',
  'Nonne',
  'Böller',
  'Aladdin',
  'Gürtel',
  'Bar',
];

const COUNTDOWN_IN_SECONDS = 60;

enum PlayingPhase {
  EXPLAINING,
  GUESSING,
}

class JustOneGame extends React.PureComponent<State> {
  state = {
    playPhase: PlayingPhase.EXPLAINING,
    currentWord: '',
    hints: [],
  };

  availableWords: string[] = [...WORDS];

  startPlaying = (): void => {
    this.setState({
      playPhase: PlayingPhase.EXPLAINING,
      hints: [],
      currentWord: this.availableWords.splice(getRandomIndex(this.availableWords), 1)[0],
    });
  };

  startGuessing = (): void => {
    this.setState({
      playPhase: PlayingPhase.GUESSING,
    });
  };

  setHints = (hints: string[]): void => {
    this.setState({ hints });
  };

  renderDescription(): React.ReactElement<GameDescriptionProps> {
    return (
      <GameDescription>
        <p>
          <strong>Teilnehmer:</strong> alle (2 x Ratende je Team)
        </p>
        <p>
          <strong>Modus:</strong> Abwechselnd
        </p>
        <p>
          <strong>Rundenzahl je Team:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> Dem Team wird ein Begriff gezeigt, den sie den Ratenden mit einem Wort
          beschreiben. Anschließend haben die Ratenden <strong>{COUNTDOWN_IN_SECONDS / 60} Minute</strong> Zeit, den
          Begriff zu erraten. Dafür haben sie nur einen Versuch.
          <br />
          <strong>Achtung:</strong> Alle mehrfachen (identischen) Hinweise werden entfernt.
        </p>
      </GameDescription>
    );
  }

  renderGameFlowExplaining(): JSX.Element {
    return (
      <>
        <span>
          Erklärt den Begriff: <strong className={styles.Action}>{this.state.currentWord}</strong>
        </span>
        <InputList edit={true} inputs={this.state.hints} updateInputs={this.setHints} />
        <div className={styles.Footer}>
          <Button variant={'contained'} color={'primary'} onClick={this.startGuessing}>
            Fertig
          </Button>
        </div>
      </>
    );
  }

  renderGameFlowGuessing(): JSX.Element {
    return (
      <>
        <p>
          Ratet den Begriff zu diesen Wörtern. <br />
          Ihr habt einen Versuch.
        </p>
        <div className={styles.Hints}>
          {this.state.hints.map((hint: string, index: number) => (
            <span key={index}>{hint}</span>
          ))}
        </div>
      </>
    );
  }

  renderGamePlay(): JSX.Element {
    switch (this.state.playPhase) {
      case PlayingPhase.EXPLAINING:
        return this.renderGameFlowExplaining();
      case PlayingPhase.GUESSING:
        return this.renderGameFlowGuessing();
      default:
        return <></>;
    }
  }

  render(): JSX.Element {
    return (
      <GameFlow
        rounds={MAX_ROUNDS}
        countdown={COUNTDOWN_IN_SECONDS}
        showScoring={this.state.playPhase === PlayingPhase.GUESSING}
        showCountdown={this.state.playPhase === PlayingPhase.GUESSING}
        onStartPlaying={this.startPlaying}
        descriptionComponent={this.renderDescription()}
        playingComponent={this.renderGamePlay()}
        gameMode={GameMode.ROUNDS}
        showCountdownBetweenTeams
      />
    );
  }
}

export default JustOneGame;
