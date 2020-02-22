import React from 'react';
import Spinner from './Spinner';

import { Button } from '@material-ui/core';
import styles from './SlotMachine.module.css';

class SlotMachine extends React.PureComponent {
  spinnerRef1 = React.createRef<Spinner>();
  spinnerRef2 = React.createRef<Spinner>();
  spinnerRef3 = React.createRef<Spinner>();

  handleClick = (): void => {
    this.spinnerRef1.current.reset();
    this.spinnerRef2.current.reset();
    this.spinnerRef3.current.reset();
  };

  render(): JSX.Element {
    return (
      <div className={styles.Container}>
        <div className={styles.SlotMachine}>
          <Spinner ref={this.spinnerRef1} timer={1000} />
          <Spinner ref={this.spinnerRef2} timer={1400} />
          <Spinner ref={this.spinnerRef3} timer={2200} />
          <div className={styles.GradientFade} />
        </div>
        <div className={styles.ButtonContainer}>
          <Button color="primary" variant="contained" onClick={this.handleClick}>
            Drehen!
          </Button>
        </div>
      </div>
    );
  }
}

export default SlotMachine;
