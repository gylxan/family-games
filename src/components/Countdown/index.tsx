import React from 'react';

import styles from './Countdown.module.css';
import classNames from 'classnames';

const START_COUNTDOWN = 5000;
const COUNTDOWN_INTERVAL = 1000;
export interface State {
  startCountdown: number;
  countdown: number;
}

export interface Props {
  started: boolean;
  time: number;
  onEnd: () => void;
  startText?: string;
  onlySmallCountdown?: boolean;
}

class Countdown extends React.Component<Props, State> {
  countdown = null;
  static defaultProps = {
    startText: 'Los!',
    onlySmallCountdown: false,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      startCountdown: START_COUNTDOWN,
      countdown: props.time,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (!prevProps.started && this.props.started) {
      this.startStartCountdown();
    }
    if (prevProps.started && !this.props.started) {
      this.stopCountdown(true);
    }
  }

  startStartCountdown = (): void => {
    const { onlySmallCountdown } = this.props;
    this.countdown = window.setInterval(() => {
      if (this.state.startCountdown > 0) {
        this.setState(oldState => ({
          startCountdown: oldState.startCountdown - COUNTDOWN_INTERVAL,
        }));
      } else {
        this.stopCountdown(onlySmallCountdown);
        this.startTimer();
      }
    }, COUNTDOWN_INTERVAL);
  };

  stopCountdown = (callOnEnd: boolean): void => {
    if (this.countdown) {
      window.clearInterval(this.countdown);
    }
    if (callOnEnd) {
      const { onEnd } = this.props;
      onEnd();
    }
  };

  startTimer = (): void => {
    this.countdown = window.setInterval(() => {
      if (this.state.countdown > 0) {
        this.setState(oldState => ({
          countdown: oldState.countdown - COUNTDOWN_INTERVAL,
        }));
      } else {
        this.stopCountdown(true);
      }
    }, COUNTDOWN_INTERVAL);
  };

  getFormattedTime = (): string => {
    const { countdown } = this.state;
    const timeInSeconds = countdown / 1000;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return '' + (minutes > 0 ? `${minutes}:` : '') + `${(seconds <= 9 && minutes > 0 ? '0' : '') + seconds}`;
  };

  render(): React.ReactNode {
    const { started, time, startText } = this.props;
    const { startCountdown, countdown } = this.state;
    if (!started) {
      return null;
    }
    return (
      <div className={styles.Countdown}>
        {startCountdown > 0 && (
          <div>
            {Array.from(Array(START_COUNTDOWN / 1000), (e, i) => i + 1).map(number => (
              <span
                key={'startcountdown-' + number}
                className={classNames(styles.StartCountdown, { [styles.Show]: startCountdown === number * 1000 })}
              >
                {number}
              </span>
            ))}
          </div>
        )}
        {startCountdown === 0 &&
          (countdown === time ? (
            <span className={classNames(styles.StartCountdown, styles.LongerShow)}>{startText}</span>
          ) : (
            <span className="Timer">{this.getFormattedTime()}</span>
          ))}
      </div>
    );
  }
}

export default Countdown;
