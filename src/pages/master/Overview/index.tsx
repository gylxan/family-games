import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Overview from './Overview';

const mapDispatchToProps = {
  push,
};
export default connect(null, mapDispatchToProps)(Overview);
