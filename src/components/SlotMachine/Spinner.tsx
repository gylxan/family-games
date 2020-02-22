import React from 'react';

import styles from './Spinner.module.css';
import { getTetrisImage } from '../../services/utils/firebaseStorage';

interface Props {
  timer: number;
  onEnd: () => void;
}

interface State {
  timeRemaining: number;
  position: number;
  lastPosition: 0 | null;
  image: string;
}

const ICON_HEIGHT = 260;

class Spinner extends React.Component<Props, State> {
  state = {
    position: 0,
    lastPosition: null,
    timeRemaining: 0,
    image: '',
  };
  multiplier = Math.floor(Math.random() * (4 - 1) + 1);
  timer = null;
  start = Spinner.getStartPosition();
  speed = ICON_HEIGHT * this.multiplier;

  static getStartPosition(): number {
    return Math.floor(Math.random() * 6) * ICON_HEIGHT * -1;
  }

  componentDidMount(): void {
    clearInterval(this.timer);

    getTetrisImage().then(image => {
      this.setState({
        position: this.start,
        timeRemaining: this.props.timer,
        image,
      });

      this.timer = setInterval(() => {
        this.tick();
      }, 100);
    });
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
    const { onEnd } = this.props;
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      onEnd();
    } else {
      this.moveBackground();
    }
  };

  render(): JSX.Element {
    const { position } = this.state;

    return (
      <div
        style={{ background: `#000 url(${this.state.image}) repeat-y`, backgroundPosition: '0px ' + position + 'px' }}
        className={styles.Spinner}
      />
    );
  }
}

export default Spinner;
