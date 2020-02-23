import React from 'react';
import { getJukeboxStorageElements } from '../../../services/utils/firebaseStorage';

import styles from './JukeBox.module.css';

export interface State {
  audioFileNames: string[];
}

class Index extends React.PureComponent<State> {
  state = {
    audios: [],
  };
  componentDidMount(): void {
    getJukeboxStorageElements().then(elements =>
      this.setState({
        audios: elements.map(element => {
          return element.name.substr(0, element.name.indexOf('.'));
        }),
      }),
    );
  }

  render(): JSX.Element {
    return (
      <ul className={styles.List}>
        {this.state.audios.map(audio => (
          <li key={audio} className={styles.ListItem}>
            {audio}
          </li>
        ))}
      </ul>
    );
  }
}

export default Index;
