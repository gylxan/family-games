import { connect } from 'react-redux';
import AwardCeremony from './AwardCeremony';
import Team from '../../interfaces/Team';
import RootState from '../../redux/RootState';
interface Props {
  teams: Team[];
}

const mapStateToProps = (state: RootState): Props => {
  return {
    teams: state.team.data,
  };
};
export default connect(mapStateToProps)(AwardCeremony);
