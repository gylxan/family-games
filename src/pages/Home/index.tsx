import { connect } from 'react-redux';
import Home from './Home';
import { resetTeams } from '../../redux/team/actions';
import { resetGames } from '../../redux/games/actions';

const mapDispatchToProps = {
  resetGames,
  resetTeams,
};
export default connect(null, mapDispatchToProps)(Home);
