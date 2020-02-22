import React from 'react';
import Spinner from './Spinner';

import { Button } from '@material-ui/core';
import styles from './SlotMachine.module.css';
import classNames from 'classnames';

interface Props {
  onEnd: () => void;
  showRandomButton?: boolean;
  className?: string;
}

interface State {
  finishedSpinners: number;
}

class SlotMachine extends React.PureComponent<Props, State> {
  spinnerRef1 = React.createRef<Spinner>();
  spinnerRef2 = React.createRef<Spinner>();
  spinnerRef3 = React.createRef<Spinner>();
  state = {
    finishedSpinners: 0,
    showRandomButton: false,
  };

  handleClick = (): void => {
    this.setState({
      finishedSpinners: 0,
    });
    this.spinnerRef1.current.reset();
    this.spinnerRef2.current.reset();
    this.spinnerRef3.current.reset();
  };

  handleSpinnerEnd = (): void => {
    const { onEnd } = this.props;
    if (this.state.finishedSpinners + 1 >= 3) {
      onEnd();
    } else {
      this.setState(prevState => ({ finishedSpinners: prevState.finishedSpinners + 1 }));
    }
  };

  render(): JSX.Element {
    const { className } = this.props;
    return (
      <div className={classNames(styles.Container, className)}>
        <div className={styles.SlotMachine}>
          <Spinner ref={this.spinnerRef1} timer={1000} onEnd={this.handleSpinnerEnd} />
          <Spinner ref={this.spinnerRef2} timer={1400} onEnd={this.handleSpinnerEnd} />
          <Spinner ref={this.spinnerRef3} timer={2200} onEnd={this.handleSpinnerEnd} />
          <div className={styles.GradientFade} />
        </div>
        {this.state.showRandomButton && (
          <div className={styles.ButtonContainer}>
            <Button color="primary" variant="contained" onClick={this.handleClick}>
              Drehen!
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default SlotMachine;
