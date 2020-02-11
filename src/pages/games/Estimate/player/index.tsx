import Estimate from './Estimate';
import RootState from '../../../../redux/RootState';
import Team from '../../../../interfaces/Team';
import { connect } from 'react-redux';
interface Props {
  teams: Team[];
}

const mapStateToProps = (rootState: RootState): Props => {
  return {
    teams: rootState.team.data,
  };
};
export default connect(mapStateToProps)(Estimate);
