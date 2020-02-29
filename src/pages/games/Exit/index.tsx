import { connect } from 'react-redux';
import RootState from '../../../redux/RootState';
import Team from '../../../interfaces/Team';
import Exit from './Exit';
import { updateTeam } from '../../../redux/team/actions';
import { push } from 'connected-react-router';
import { LinkTo } from '../../../services/routes';

interface Props {
  teams: Team[];
}
interface DispatchProps {
  onEndGame: (teams: Team[]) => void;
}
const mapStateToProps = (rootState: RootState): Props => {
  return {
    teams: rootState.team.data,
  };
};
const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    onEndGame: (teams: Team[]): void => {
      teams.forEach(team => dispatch(updateTeam(team)));
      dispatch(push(LinkTo.playerGamesOverview()));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Exit);
