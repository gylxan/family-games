import { connect } from 'react-redux';
import Overview from './Overview';
import { getGamesArray } from '../../../redux/games/selectors';
import { Game } from '../../../interfaces/Game';
import { push } from 'connected-react-router';
import RootState from '../../../redux/RootState';

interface Props {
  games: Game[];
}
const mapStateToProps = (rootState: RootState): Props => {
  return {
    games: getGamesArray(rootState),
  };
};

const mapDispatchToProps = {
  push,
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
