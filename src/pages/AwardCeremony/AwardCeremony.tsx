import React from 'react';
import classNames from 'classnames';
import Team from '../../interfaces/Team';
import { EmojiEventsSharp } from '@material-ui/icons';

import styles from './AwardCeremony.module.css';
import Confetti, { ConfettiConfig } from 'react-dom-confetti';

interface Props {
  teams: Team[];
}
interface State {
  showStartText: boolean;
  showConfetti: boolean;
}

const MAX_AWARDS = 3;

const CONFETTI_CONFIG: ConfettiConfig = {
  angle: 90,
  spread: 154,
  startVelocity: 40,
  elementCount: 300,
  dragFriction: 0.07,
  duration: 6000,
  stagger: 30,
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

class AwardCeremony extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showStartText: true,
      showConfetti: false,
    };
    this.startTimeout();
  }

  timeout = null;

  startTimeout = (): void => {
    this.timeout = window.setTimeout(() => {
      this.setState({
        showStartText: false,
      });
      window.clearTimeout(this.timeout);
      this.startConfettiTimeout();
    }, 3000);
  };

  startConfettiTimeout = (): void => {
    this.timeout = window.setTimeout(() => {
      this.setState({
        showConfetti: true,
      });
      window.clearTimeout(this.timeout);
    }, (this.getAwardsToShow() + 1) * 1000);
  };

  getTeamsByPoints = (): { [points: string]: Team[] } => {
    return this.props.teams.reduce(
      (prev, team) => ({
        ...prev,
        [team.points]: [...(prev[team.points] || []), team],
      }),
      {},
    );
  };

  getAwardsToShow = (): number => {
    return Math.min(Object.keys(this.getTeamsByPoints()).length, MAX_AWARDS);
  };

  renderAwards = (): JSX.Element => {
    const teamsByPoints = this.getTeamsByPoints();
    const awardsToShow = this.getAwardsToShow();
    const teamsByPointsKeys = Object.keys(teamsByPoints).reverse();
    return (
      <div className={styles.Awards}>
        {Array.from({ length: awardsToShow }).map((value, key) => {
          const place = awardsToShow - key;
          return (
            <div key={key} className={classNames(styles.Award, 'animated', 'fadeIn', 'slow')}>
              <div
                className={classNames(styles.TrophyAndPoints, 'animated', 'fadeIn', 'slow')}
                style={{ animationDelay: `${key + 1}s` }}
              >
                <EmojiEventsSharp
                  className={classNames(styles.Trophy, styles[`TrophyPlace${place}`])}
                  fontSize={'inherit'}
                />
                {teamsByPointsKeys[awardsToShow - (key + 1)]} Punkte
              </div>
              <div className={styles.AwardGround} style={{ height: `${key + 2}em` }}>
                {place}
                <br />
              </div>
              <div
                className={classNames(styles.Name, 'animated', 'fadeIn', 'slow')}
                style={{ animationDelay: `${key + 1}s` }}
              >
                {teamsByPoints[teamsByPointsKeys[awardsToShow - (key + 1)]].map(team => team.name)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render(): JSX.Element {
    return this.state.showStartText ? (
      <h1 className={classNames(styles.StartText, 'animated', 'fadeIn', 'slow')}>Kommen wir zur Siegerehrung!</h1>
    ) : (
      <>
        {this.renderAwards()}
        <Confetti active={this.state.showConfetti} config={CONFETTI_CONFIG} />
      </>
    );
  }
}

export default AwardCeremony;
