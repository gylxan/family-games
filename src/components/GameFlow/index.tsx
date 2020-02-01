import GameFlow from './GameFlow';
import RootState from '../../redux/RootState';
import Team from '../../interfaces/Team';
import { connect } from 'react-redux';
import { updateTeam } from '../../redux/team/actions';
import {push} from 'connected-react-router';
import { LinkTo } from '../../services/routes';
interface Props {
  teams: Team[];
}

interface DispatchProps {
  onEndGame: (teams: Team[]) => void;
}
const mapStateToProps = (state: RootState): Props => ({ teams: state.team.data });
const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    onEndGame: (teams: Team[]): void => {
      console.warn(teams);
      teams.forEach(team => dispatch(updateTeam(team)));
      dispatch(push(LinkTo.playerGamesOverview()));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameFlow);
