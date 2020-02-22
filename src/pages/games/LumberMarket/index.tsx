import { connect } from 'react-redux';
import RootState from '../../../redux/RootState';
import Team from '../../../interfaces/Team';
import LumberMarket from './LumberMarket';

interface Props {
  teams: Team[];
}

const mapStateToProps = (rootState: RootState): Props => {
  return {
    teams: rootState.team.data,
  };
};
export default connect(mapStateToProps)(LumberMarket);
