import React from 'react';
import styles from './MusicGame.module.css';
import { Button } from '@material-ui/core';

export interface Props {}

export interface State {}

class MusicGame extends React.PureComponent<Props, State> {
  render(): JSX.Element {
    return (
      <>
        <h1>Musik-Quiz</h1>
        <div className={styles.description}>
          <p><b>Teilnehmer:</b> alle</p>
          <p><b>Modus:</b> abwechselnd</p>
          <p>
            <b>Beschreibung:</b> Den Teams werden abwechselnd die ersten 10 Sekunden eines Hits der 70er/80er/90er vorgespielt.
            Das Team hat 30 Sekunden um eine Antwort zu geben.<br></br>
            Es werden 8 Runden gespielt.
          </p>
        </div>
        <Button variant={'contained'} color={'primary'}>Okay</Button>
      </>
    );
  }
}

export default MusicGame;
