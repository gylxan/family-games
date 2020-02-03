import GameFlow from './GameFlow';
import RootState from '../../redux/RootState';
import Team from '../../interfaces/Team';
import { connect } from 'react-redux';
import { updateTeam } from '../../redux/team/actions';
import { push } from 'connected-react-router';
import { LinkTo, Routes } from '../../services/routes';
import { hasAllGamesPlayed } from '../../redux/games/selectors';
import { store } from '../../redux/createStore';

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
      teams.forEach(team => dispatch(updateTeam(team)));
      if (!hasAllGamesPlayed(store.getState())) {
        dispatch(push(LinkTo.playerGamesOverview()));
      } else {
        dispatch(push(Routes.AwardCeremony));
      }
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameFlow);
