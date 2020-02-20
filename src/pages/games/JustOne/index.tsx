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

const MAX_ROUNDS = 1;
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
          <strong>Modus:</strong> Abwechelnd
        </p>
        <p>
          <strong>Rundenzahl je Team:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> Die Teams bestimmen 2 Ratende. Den anderen Spielern wird ein Begriff gezeigt,
          den Sie den Ratenden erklären müssen. Dazu können sie Hinweise in Form <strong>eines Wortes</strong> auf einen
          Zettel schreiben und den Game Mastern übergeben. Anschließend haben die Ratenden 1 Minute Zeit, den Begriff zu
          erraten. Dafür haben sie nur einen Versuch.
          <br />
          Achtung: Alle mehrfachen (identischen) Hinweise werden entfernt.
        </p>
      </GameDescription>
    );
  }

  renderGameFlowExplaining(): JSX.Element {
    return (
      <>
        <p>
          Erklärt den Begriff: <strong className={styles.Action}>{this.state.currentWord}</strong>
        </p>
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
        <ul className={styles.Hints}>
          {this.state.hints.map((hint: string, index: number) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
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
      <>
        <h1>Nur Eins</h1>
        <GameFlow
          rounds={MAX_ROUNDS}
          countdown={60}
          showScoring={this.state.playPhase === PlayingPhase.GUESSING}
          showCountdown={this.state.playPhase === PlayingPhase.GUESSING}
          onStartPlaying={this.startPlaying}
          descriptionComponent={this.renderDescription()}
          playingComponent={this.renderGamePlay()}
          gameMode={GameMode.ROUNDS}
        />
      </>
    );
  }
}

export default JustOneGame;
