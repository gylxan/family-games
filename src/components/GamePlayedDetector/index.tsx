import { connect } from 'react-redux';
import GamePlayedDetector from './GamePlayedDetector';
import { setAlreadyPlayedByUrl } from '../../redux/games/actions';

const mapDispatchToProps = {
  disableGameByUrl: setAlreadyPlayedByUrl,
};

export default connect(null, mapDispatchToProps)(GamePlayedDetector);
