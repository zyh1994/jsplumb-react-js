import defaultState from 'demo/defaultState';
import {connect} from 'react-redux';
import E404 from './404';

const mapStateToProps = (state = defaultState) => ({});

export default connect(
  mapStateToProps
)(E404);
