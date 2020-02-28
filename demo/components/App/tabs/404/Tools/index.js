import defaultState from 'demo/defaultState';
import { connect } from 'react-redux';
import Tools from './Tools';
var mapStateToProps = function (state) {
    if (state === void 0) { state = defaultState; }
    return ({});
};
export default connect(mapStateToProps)(Tools);
