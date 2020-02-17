import React from 'react';
import classNames from 'classnames';
import Team from '../../interfaces/Team';
import { EmojiEventsSharp } from '@material-ui/icons';

import styles from './AwardCeremony.module.css';

interface Props {
  teams: Team[];
}
interface State {
  showStartText: boolean;
}

const MAX_AWARDS = 3;

class AwardCeremony extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showStartText: true,
    };
    this.startTimeout();
  }

  canvas = React.createRef<HTMLCanvasElement>();
  timeout = null;

  startTimeout = (): void => {
    this.timeout = window.setTimeout(() => {
      this.setState({
        showStartText: false,
      });
      window.clearTimeout(this.timeout);
    }, 20);
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
          return (
            <div key={key} className={styles.Award}>
              {teamsByPoints[teamsByPointsKeys[awardsToShow - (key + 1)]].map(team => team.name)}
              <EmojiEventsSharp className={styles.Trophy} fontSize={'inherit'} />
              <div className={styles.AwardGround} style={{ height: `${key + 2}em` }}>
                {awardsToShow - key}
                <br />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render(): JSX.Element {
    return this.state.showStartText ? (
      <h1 className={classNames('animated', 'fadeIn', 'slow')}>Kommen wir zur Siegerehrung!</h1>
    ) : (
      this.renderAwards()
    );
  }
}

export default AwardCeremony;
