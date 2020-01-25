import React from 'react';

export interface Props {}

export interface State {}

class MusicGame extends React.PureComponent<Props, State> {
  render(): JSX.Element {
    return (
      <>
        <h1>Musik-Quiz</h1>
        <p></p>
      </>
    );
  }
}

export default MusicGame;
