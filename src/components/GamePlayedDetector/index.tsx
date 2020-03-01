import { connect } from 'react-redux';
import GamePlayedDetector from './GamePlayedDetector';
import { setAlreadyPlayedByUrl, setCurrentGameByUrl } from '../../redux/games/actions';

const mapDispatchToProps = {
  disableGameByUrl: setAlreadyPlayedByUrl,
  setCurrentGameByUrl: setCurrentGameByUrl,
};

export default connect(null, mapDispatchToProps)(GamePlayedDetector);
