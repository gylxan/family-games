import React from 'react';
import classNames from 'classnames';
import Team from '../../interfaces/Team';

interface Props {
  teams: Team[];
}
interface State {
  showStartText: boolean;
}
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const MAX_AWARDS = 3;
const PLATEAU_WIDTH = 150;

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

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>): void {
    if (prevState.showStartText && !this.state.showStartText) {
      this.drawAwardCeremony();
    }
  }
  getTeamsByPoints = (): { [points: number]: Team[] } => {
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

  drawAwardCeremony = (): void => {
    const { teams } = this.props;
    const teamsByPoints = this.getTeamsByPoints();
    const awardsToShow = this.getAwardsToShow();

    const ctx = this.canvas.current.getContext('2d');
    for (let i = 0; i < awardsToShow; i++) {
      console.log(ctx);
      ctx.beginPath();
      ctx.fillStyle = '#9c9c9c';
      ctx.fillRect(i * PLATEAU_WIDTH, 400 - i * 20, PLATEAU_WIDTH, 100 + i * 20);
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = '#535353';
      ctx.font = '36pt Arial';
      ctx.fillText(`${awardsToShow - i}`, i * PLATEAU_WIDTH - PLATEAU_WIDTH / 2, 400 + i * 50);
      ctx.closePath();
    }
  };

  render(): JSX.Element {
    return this.state.showStartText ? (
      <h1 className={classNames('animated', 'fadeIn', 'slow')}>Kommen wir zur Siegerehrung!</h1>
    ) : (
      <canvas
        className={classNames('animated', 'fadeIn', 'slow')}
        ref={this.canvas}
        width={this.getAwardsToShow() * PLATEAU_WIDTH}
        height={CANVAS_HEIGHT}
      />
    );
  }
}

export default AwardCeremony;
