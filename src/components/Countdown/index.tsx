import React from 'react';

import styles from './Countdown.module.css';
import classNames from 'classnames';

const START_COUNTDOWN = 5000;
const COUNTDOWN_INTERVAL = 1000;
export interface State {
  startCountdown: number;
  countdown: number;
  isPaused: boolean;
}

export interface Props {
  started: boolean;
  time: number;
  startText?: string;
  onlySmallCountdown?: boolean;
  onEnd: () => void;
  countdownCallback?: (secondsRemaining: number) => void;
  className?: string;
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
      isPaused: false,
    };
  }

  componentDidMount(): void {
    if (this.props.started) {
      this.startStartCountdown();
    }
  }

  componentWillUnmount(): void {
    this.stopCountdown(false);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (!prevProps.started && this.props.started) {
      this.startStartCountdown();
    }
    if (prevProps.started && !this.props.started) {
      this.stopCountdown(true);
    }
  }

  getRemainingSeconds = (countdown: number): number => (countdown - COUNTDOWN_INTERVAL) / 1000;

  startStartCountdown = (): void => {
    const { onlySmallCountdown, countdownCallback } = this.props;
    this.countdown = window.setInterval(() => {
      if (this.state.startCountdown > 0) {
        if (onlySmallCountdown) {
          !!countdownCallback && countdownCallback(this.getRemainingSeconds(this.state.startCountdown));
        }
        this.setState(oldState => ({
          startCountdown: oldState.startCountdown - COUNTDOWN_INTERVAL,
        }));
      } else {
        this.stopCountdown(onlySmallCountdown);
        if (!onlySmallCountdown) {
          this.startTimer();
        }
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

  pauseCountdown = (): void => {
    this.stopCountdown(false);
    this.setState({
      isPaused: true,
    });
  };

  startTimer = (): void => {
    const { countdownCallback } = this.props;
    this.setState({
      isPaused: false,
    });
    this.countdown = window.setInterval(() => {
      if (this.state.countdown > 0) {
        !!countdownCallback && countdownCallback(this.getRemainingSeconds(this.state.countdown));
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
    const { started, time, startText, className } = this.props;
    const { startCountdown, countdown, isPaused } = this.state;
    if (!started) {
      return null;
    }
    return (
      <div
        className={classNames(className, styles.Countdown)}
        onClick={!isPaused ? this.pauseCountdown : this.startTimer}
      >
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
