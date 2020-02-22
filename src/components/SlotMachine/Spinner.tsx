import React from 'react';

import styles from './Spinner.module.css';

interface Props {
  timer: number;
}

interface State {
  timeRemaining: number;
  position: number;
  lastPosition: 0 | null;
}

const ICON_HEIGHT = 188;

class Spinner extends React.Component<Props, State> {
  state = {
    position: 0,
    lastPosition: null,
    timeRemaining: 0,
  };
  multiplier = Math.floor(Math.random() * (4 - 1) + 1);
  timer = null;
  start = Spinner.getStartPosition();
  speed = ICON_HEIGHT * this.multiplier;

  static getStartPosition(): number {
    return Math.floor(Math.random() * 9) * ICON_HEIGHT * -1;
  }

  componentDidMount(): void {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  reset = (): void => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = Spinner.getStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  };

  moveBackground = (): void => {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100,
    });
  };

  tick = (): void => {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
    } else {
      this.moveBackground();
    }
  };

  render(): JSX.Element {
    const { position } = this.state;

    return <div style={{ backgroundPosition: '0px ' + position + 'px' }} className={styles.Spinner} />;
  }
}

export default Spinner;
