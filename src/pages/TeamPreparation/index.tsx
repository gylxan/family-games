import { connect } from 'react-redux';
import { updateTeam } from '../../actions/team';
import TeamPreparation from './Teampreparation';
import { getTeamById } from '../../selectors/team';
import RootState from '../../interfaces/RootState';
import Team from '../../interfaces/Team';
import { Props as TeamPreparationProps } from './Teampreparation';
import { push } from 'connected-react-router';

interface Props {
  team: Team;
}
const mapStateToProps = (rootState: RootState, ownProps: TeamPreparationProps): Props => {
  const params = ownProps.match.params as { id: string };
  return {
    team: getTeamById(rootState, parseInt(params.id)) as Team,
  };
};

const mapDispatchToProps = {
  updateTeam,
  push,
};
export default connect(mapStateToProps, mapDispatchToProps)(TeamPreparation);
