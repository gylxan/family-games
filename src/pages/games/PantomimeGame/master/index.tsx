import React from 'react';

export interface Props {}

export interface State {
}

class Pantomime extends React.PureComponent<Props, State> {
  

  render(): JSX.Element {
    return (
      <>
        <h1>Mimikry</h1>
        Hello World
      </>
    );
  }
}

export default Pantomime;
