import { connect } from 'react-redux';
import Overview from './Overview';
import { getGamesArray } from '../../../redux/games/selectors';
import { Game } from '../../../interfaces/Game';
import { push } from 'connected-react-router';
import RootState from '../../../redux/RootState';

interface Props {
  games: Game[];
  isShownFirst: boolean;
  exitGamePlayed: boolean;
}

const mapStateToProps = (rootState: RootState): Props => {
  return {
    games: getGamesArray(rootState),
    isShownFirst: rootState.game.isShownFirst,
    exitGamePlayed: rootState.game.exitGamePlayed,
  };
};

const mapDispatchToProps = {
  push,
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
