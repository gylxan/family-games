import { connect } from 'react-redux';
import { updateTeam } from '../../redux/team/actions';
import TeamPreparation from './Teampreparation';
import { getTeamById } from '../../redux/team/selectors';
import RootState from '../../redux/RootState';
import Team from '../../interfaces/Team';
import { Props as TeamPreparationProps } from './Teampreparation';
import { push, goBack } from 'connected-react-router';

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
  goBack,
};
export default connect(mapStateToProps, mapDispatchToProps)(TeamPreparation);
