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
}

class Countdown extends React.Component<Props, State> {
  countdown = null;
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
  }

  startStartCountdown = (): void => {
    this.countdown = window.setInterval(() => {
      if (this.state.startCountdown > 0) {
        this.setState(oldState => ({
          startCountdown: oldState.startCountdown - COUNTDOWN_INTERVAL,
        }));
      } else {
        window.clearInterval(this.countdown);
        this.startTimer();
      }
    }, COUNTDOWN_INTERVAL);
  };

  startTimer = (): void => {
    const { onEnd } = this.props;
    this.countdown = window.setInterval(() => {
      if (this.state.countdown > 0) {
        this.setState(oldState => ({
          countdown: oldState.countdown - COUNTDOWN_INTERVAL,
        }));
      } else {
        window.clearInterval(this.countdown);
        onEnd();
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
    const { started, time } = this.props;
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
            <span className={classNames(styles.StartCountdown, styles.LongerShow)}>Los!</span>
          ) : (
            <span className="Timer">{this.getFormattedTime()}</span>
          ))}
      </div>
    );
  }
}

export default Countdown;
