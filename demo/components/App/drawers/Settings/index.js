import { onDrawerDockedToggle, onDrawerDragToggle, onDrawerHoverToggle } from 'demo/actions/drawerSettings';
import { onOrientationToggle } from 'demo/actions/orientation';
import { onTabAdd, onTabRemove } from 'demo/actions/tabs';
import defaultState from 'demo/defaultState';
import { connect } from 'react-redux';
import Settings from './Settings';
var mapStateToProps = function (state) {
    if (state === void 0) { state = defaultState; }
    return ({
        drawerDocked: state.drawerSettings.docked,
        drawerDrag: state.drawerSettings.drag,
        drawerHover: state.drawerSettings.hover,
        orientation: state.orientation,
        tabs: state.tabs
    });
};
export default connect(mapStateToProps, {
    onDrawerDockedToggle: onDrawerDockedToggle,
    onDrawerDragToggle: onDrawerDragToggle,
    onDrawerHoverToggle: onDrawerHoverToggle,
    onOrientationToggle: onOrientationToggle,
    onTabAdd: onTabAdd,
    onTabRemove: onTabRemove
})(Settings);
