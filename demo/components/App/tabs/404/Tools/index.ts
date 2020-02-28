import defaultState from 'demo/defaultState';
import {connect} from 'react-redux';
import Tools from './Tools';

const mapStateToProps = (state = defaultState) => ({});

export default connect(
  mapStateToProps
)(Tools);
