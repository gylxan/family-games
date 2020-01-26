import JustOneGame from './JustOneGame';
import { connect } from 'react-redux';
import Team from '../../../../interfaces/Team';
import RootState from '../../../../redux/RootState';

interface Props {
  teams: Team[];
}
const mapStateToProps = (state: RootState): Props => ({ teams: state.team.data });
export default connect(mapStateToProps)(JustOneGame);