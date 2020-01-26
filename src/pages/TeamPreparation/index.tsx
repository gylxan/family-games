import { connect } from 'react-redux';
import { updateTeam } from '../../actions/team';
import TeamPreparation from './Teampreparation';
import { getTeamById } from '../../selectors/team';
import RootState from '../../interfaces/RootState';
import Team from '../../interfaces/Team';

interface Props {
  team: Team;
}
const mapStateToProps = (rootState: RootState): Props => {
  console.log(rootState.router);
  return {
    team: getTeamById(rootState, 1) as Team,
  };
};

const mapDispatchToProps = {
  updateTeam,
};
export default connect(mapStateToProps, mapDispatchToProps)(TeamPreparation);
