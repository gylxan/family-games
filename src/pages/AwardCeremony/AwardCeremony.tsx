import React from 'react';
import classNames from 'classnames';
import Team from '../../interfaces/Team';

interface Props {
  teams: Team[];
}
interface State {
  showStartText: boolean;
}

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
    }, 50);
  };

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>): void {
    if (prevState.showStartText && !this.state.showStartText) {
      this.drawAwardCeremony();
    }
  }

  drawAwardCeremony = (): void => {
    const { teams } = this.props;
    teams.sort((teamA, teamB) => teamB.points - teamA.points);

    const ctx = this.canvas.current.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = '#9c9c9c';
    ctx.fillRect(100, 400, 150, 100);
    ctx.fillStyle = '#000000';
    ctx.fillStyle = '#d1d1d1';
    ctx.fillRect(250, 380, 150, 120);
    if (teams.length > 2) {
      ctx.fillStyle = '#9c9c9c';
      ctx.fillRect(400, 420, 150, 80);
    }
    ctx.fillStyle = '#535353';
    ctx.font = '36pt sans-serif';
    ctx.fillText('1', 310, 450);
    ctx.fillText('2', 162, 465);
    if (teams.length > 2) {
      ctx.fillText('3', 465, 480);
    }
    console.log(teams);
  };

  render(): JSX.Element {
    return this.state.showStartText ? (
      <h1 className={classNames('animated', 'fadeIn', 'slow')}>Kommen wir zur Siegerehrung!</h1>
    ) : (
      <canvas className={classNames('animated', 'fadeIn', 'slow')} ref={this.canvas} width={640} height={500} />
    );
  }
}

export default AwardCeremony;
