import { connect } from 'react-redux';
import Overview from './Overview';
import { RootState } from '../../../reducer/rootReducer';
import { getGamesArray } from '../../../selectors/game';
import { Game } from '../../../interfaces/Game';

interface Props {
  games: Game[];
}
const mapStateToProps = (rootState: RootState): Props => {
  return {
    games: getGamesArray(rootState),
  };
};
export default connect(mapStateToProps)(Overview);
