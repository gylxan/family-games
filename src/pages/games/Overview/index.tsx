import { connect } from 'react-redux';
import Overview from './Overview';
import { getGamesArray } from '../../../redux/games/selectors';
import { Game } from '../../../interfaces/Game';
import { push, goBack } from 'connected-react-router';
import RootState from '../../../redux/RootState';

interface Props {
  games: Game[];
  isShownFirst: boolean;
}

const mapStateToProps = (rootState: RootState): Props => {
  return {
    games: getGamesArray(rootState),
    isShownFirst: rootState.game.isShownFirst,
  };
};

const mapDispatchToProps = {
  push,
  goBack,
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
