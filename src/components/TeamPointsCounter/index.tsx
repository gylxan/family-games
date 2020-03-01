import TeamPointsCounter from './TeamPointsCounter';
import { connect } from 'react-redux';
import Team from '../../interfaces/Team';
import RootState from '../../redux/RootState';
import { Game } from '../../interfaces/Game';

interface Props {
  teams: Team[];
  currentGame?: Game;
}
const mapStateToProps = (state: RootState): Props => ({ teams: state.team.data, currentGame: state.game.currentGame });
export default connect(mapStateToProps)(TeamPointsCounter);
