import React from 'react';
import { Button } from '@material-ui/core';
import { getRandomIndex } from '../../../services/utils/array';

const WORDS = [
  'Lichterkette',
  'Treppenhaus',
  'Drehbuch',
  'Schaukelpferd',
  'Geschenkpapier',
  'Lampenfassung',
  'U-Boot',
  'Glühwein',
  'Taschendieb',
  'Sonnenbrand',
  'Schneeketten',
  'Reisepass',
  'Grill',
];

export interface State {
  currentWord: string;
}

class Pantomime extends React.PureComponent<State> {
  availableWords: string[] = [...WORDS];

  getRandomWord = (): string => {
    return this.availableWords.splice(getRandomIndex(this.availableWords), 1)[0];
  };

  state = {
    currentWord: this.getRandomWord(),
  };

  next = (): void => {
    this.setState({
      currentWord: this.getRandomWord(),
    });
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Körperklaus</h1>
        <p>
          Dein Begriff: <strong>{this.state.currentWord}</strong>
        </p>
        <Button autoFocus variant={'contained'} color={'primary'} onClick={this.next}>
          Nächstes
        </Button>
      </>
    );
  }
}

export default Pantomime;
